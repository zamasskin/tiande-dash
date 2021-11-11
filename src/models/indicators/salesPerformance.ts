import { Knex } from "knex";
import util from "util";

import { qb as knex } from "../../settings/api";
import { indicatorsQuery, currencyRateJoin, joinUser } from ".";
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
  getFilterMonthAgo,
  getFilterYearAgo,
  indicators,
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

export function SalesPerformanceQuery(filter: FilterState) {
  const { periodStart, periodEnd } = filter;
  const dateStart = moment(periodStart).format("YYYY-MM-DD HH:mm:ss");
  const dateEnd = moment(periodEnd).format("YYYY-MM-DD HH:mm:ss");
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
      `COUNT(DISTINCT IF(u.DATE_REGISTER >= '${dateStart}' AND u.DATE_REGISTER <= '${dateEnd}', u.ID, 0)) - SUM(DISTINCT IF(u.DATE_REGISTER >= '${dateStart}' AND u.DATE_REGISTER <= '${dateEnd}', 0, 1)) as numberOfClientsNew`
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
      numberOfOrders: `${result.count} шт`,
      numberOfClientsNew: result.numberOfClientsNew,
      shareOfNewbies: numberFormat(
        result.numberOfClientsNew / result.saleUsersCount
      ),
      shareOfNewbiesBySale: numberFormatRub(
        result.salesSumNew / result.salesSum
      ),
      shareOfPickup: `${numberFormat(
        (result.countPickup / result.count) * 100
      )} %`,
      balls: numberFormatBall(result.balls),
      loyalty: numberFormatDe(result.loyalty),
      numberOfClients: numberFormat(result.saleUsersCount),
      averageCheckBalls: numberFormat(result.balls / result.count),
      numberOfOrdersLoyalty: result.numberOfOrdersLoyalty,
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
