import moment from "moment";
import _ from "lodash";

import { qb as knex } from "../../settings";
import { indicatorsQuery, currencyRateJoin, joinLocationProps } from ".";
import { prepareLtvFilter, prepareFilter } from "./filter";
import { FilterState } from "../../features/indicators/filterSlice";
import { numberFormat, numberFormatRub } from "../number";
import { SalesPerformanceQuery } from "./salesPerformance";

export function registerQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareLtvFilter(query, filter);

  query = query.select(knex.raw("COUNT(distinct o.USER_ID) as registerCount"));
  return query;
}

export function salesByMonthQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareFilter(query, filter);
  query = query.groupBy(knex.raw(`date_format(o.DATE_INSERT, '%Y-%m')`));
  query = query.select(
    //date
    knex.raw(`date_format(o.DATE_INSERT, '%Y-%m') as date`),
    //salesSum
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) as salesSum"
    ),
    //saleUsersCount
    knex.raw("COUNT(distinct o.USER_ID) as saleUsersCount")
  );

  return query;
}

export async function salesByMonth(filter: FilterState) {
  let indicators = await salesByMonthQuery(filter);
  const getMonthAndYear = (date: string) => {
    const $date = moment(date, "YYYY-MM").locale("ru");
    return {
      month: $date.format("MMMM"),
      year: $date.toDate().getFullYear(),
    };
  };
  indicators = indicators.map((indicator) => ({
    ...indicator,
    salesSum: numberFormatRub(indicator.salesSum),
    ...getMonthAndYear(indicator.date),
  }));
  return _.chain(indicators)
    .groupBy("year")
    .map((value, key) => ({ year: key, values: value }))
    .value();
}

export async function ltvIndicators(filter: FilterState) {
  const [saleResult, { registerCount } = { registerCount: 0 }] =
    await Promise.all([
      SalesPerformanceQuery(filter).first(),
      registerQuery(filter).first(),
    ]);

  const register = saleResult.salesSum / registerCount;
  const clients = saleResult.salesSum / saleResult.saleUsersCount;
  const proportion = (saleResult.saleUsersCount / registerCount) * 100;

  return {
    register: numberFormat(register, 0),
    clients: numberFormat(clients, 0),
    proportion: numberFormat(proportion, 0),
  };
}
