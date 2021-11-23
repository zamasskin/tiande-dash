import { Knex } from "knex";
import util from "util";

import { qb as knex } from "../../settings";
import {
  indicatorsQuery,
  currencyRateJoin,
  joinUser,
  joinLocationProps,
} from ".";
import { FilterState } from "../../features/indicators/filterSlice";
import { prepareFilter } from "./filter";
import {
  numberFormat,
  numberFormatBall,
  numberFormatDe,
  numberFormatRub,
} from "../number";
import { SalesPerformanceDefault } from "./initData";
import {
  endTime,
  getFilterMonthAgo,
  getFilterYearAgo,
  indicators,
  startTime,
} from "../../features/functions/date";
import moment from "moment";
import { dateFormat } from "../../constants";

export function loyaltyTransferQuery() {
  return knex("b_sale_order_props_value")
    .select("ID")
    .where("ORDER_PROPS_ID", 126)
    .where("VALUE", "Y");
}

export function loyaltyPriceQuery() {
  return knex("b_sale_order_props_value")
    .select("VALUE")
    .where("ORDER_PROPS_ID", 125);
}

export function pickupQuery() {
  return knex("b_sale_order_props_value")
    .select("ID")
    .where("ORDER_PROPS_ID", 69)
    .where("VALUE", "e25698fc082e285f8d8030bc648e20c2");
}

export function ballsQuery() {
  return knex("b_sale_order_props_value")
    .select("VALUE")
    .where("ORDER_PROPS_ID", 39);
}

export function userNewQuery(start: number, end: number) {
  start = startTime(start);
  end = endTime(end);
  return knex("b_user")
    .select("ID")
    .where("DATE_REGISTER", ">=", new Date(start))
    .where("DATE_REGISTER", "<=", new Date(end));
}

export function SalesPerformanceQuery(filter: FilterState) {
  let { periodStart, periodEnd } = filter;
  const dateStart = moment(periodStart).format("YYYY-MM-DD 00:00:00");
  const dateEnd = moment(periodEnd).format("YYYY-MM-DD 23:59:59");
  const userQuery = userNewQuery(filter.periodStart, filter.periodEnd).where(
    "ID",
    knex.raw("o.USER_ID")
  );
  const selectPropsQuery = (query: () => Knex.QueryBuilder) =>
    query().where("ORDER_ID", knex.raw("o.ID"));

  const selectCount = (query: () => Knex.QueryBuilder, alias: string) =>
    knex.raw(
      util.format("COUNT((%s)) as %s", selectPropsQuery(query).toQuery(), alias)
    );

  const selectSum = (query: () => Knex.QueryBuilder, alias: string) =>
    knex.raw(
      util.format("SUM((%s)) as %s", selectPropsQuery(query).toQuery(), alias)
    );

  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareFilter(query, filter);
  query = joinUser(query);
  query = query.select(
    //salesSum
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) as salesSum"
    ),
    //salesSumNew
    knex.raw(
      `round(sum(IF(u.DATE_REGISTER >= '${dateStart}' AND u.DATE_REGISTER <= '${dateEnd}', if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE),0)),2) as salesSumNew`
    ),
    //count
    knex.raw("count(o.ID) as 'count'"),
    //saleUsersCount
    selectCount(loyaltyTransferQuery, "numberOfOrdersLoyalty"),
    //saleUsersCount
    knex.raw("COUNT(distinct o.USER_ID) as saleUsersCount"),
    //numberOfClientsNew
    knex.raw(
      util.format(
        "COUNT(DISTINCT (%s)) as %s",
        userQuery.toQuery(),
        "numberOfClientsNew"
      )
    ),
    //countPickup
    selectCount(pickupQuery, "countPickup"),
    //balls
    selectSum(ballsQuery, "balls"),
    //loyalty
    selectSum(loyaltyPriceQuery, "loyalty")
  );
  return query;
}

export async function SalesPerformanceResult(filter: FilterState) {
  const days = indicators.diff(filter.periodStart, filter.periodEnd);
  const result = await SalesPerformanceQuery(filter).first();
  const { periodStart, periodEnd } = filter;
  const period =
    moment(periodStart).format(dateFormat) +
    " - " +
    moment(periodEnd).format(dateFormat);

  //countUserNew
  if (result) {
    return {
      days,
      period,
      salesSum: numberFormatRub(result.salesSum),
      sumDays: numberFormatRub(result.salesSum / days),
      salesSumNew: numberFormatRub(result.salesSumNew),
      averageCheck: numberFormatRub(result.salesSum / result.count),
      numberOfOrders: util.format("%s  шт", numberFormat(result.count, 0)),
      numberOfClientsNew: numberFormat(result.numberOfClientsNew, 0),
      shareOfNewbies: util.format(
        "%s  %",
        numberFormat(
          (result.numberOfClientsNew / result.saleUsersCount) * 100,
          2
        )
      ),
      shareOfNewbiesBySale: util.format(
        "%s  %",
        numberFormat((result.salesSumNew / result.salesSum) * 100, 2)
      ),
      shareOfPickup: `${numberFormat(
        (result.countPickup / result.count) * 100,
        2
      )} %`,
      balls: numberFormatBall(result.balls),
      loyalty: numberFormatDe(result.loyalty),
      numberOfClients: numberFormat(result.saleUsersCount, 0),
      averageCheckBalls: numberFormatBall(result.balls / result.count),
      numberOfOrdersLoyalty: util.format(
        "%s  шт",
        numberFormat(result.numberOfOrdersLoyalty, 0)
      ),
    };
  }

  return SalesPerformanceDefault;
}

export function SalesPerformance(filter: FilterState) {
  const filterMonthAgo = getFilterMonthAgo(filter),
    filterYearAgo = getFilterYearAgo(filter);
  return Promise.all([
    SalesPerformanceResult(filter),
    SalesPerformanceResult(filterMonthAgo),
    SalesPerformanceResult(filterYearAgo),
  ]);
}
