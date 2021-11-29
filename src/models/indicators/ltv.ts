import moment from "moment";
import _ from "lodash";
import util from "util";

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
  let [{ saleUsersCount }, indicators] = await Promise.all([
    SalesPerformanceQuery(filter).first(),
    salesByMonthQuery(filter),
  ]);
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
    saleUsersCount: util.format("%s чел", indicator.saleUsersCount),
    proportion: numberFormat(saleUsersCount / indicator.saleUsersCount, 2),
    ...getMonthAndYear(indicator.date),
  }));
  return _.chain(indicators)
    .groupBy("year")
    .map((value, key) => ({ year: key, values: value }))
    .value();
}

export function purchasesInPeriodQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareFilter(query, filter);
  query = query.groupBy([
    knex.raw(`date_format(o.DATE_INSERT, '%Y-%m')`),
    "o.USER_ID",
  ]);

  query = query.select(
    //date
    knex.raw(`date_format(o.DATE_INSERT, '%Y-%m') as date`),
    //userId
    knex.raw("o.USER_ID as userId"),
    // cnt
    knex.raw("1 as cnt")
  );

  // Нижнее вложение
  query = knex(query.as("t1"));
  query = query.groupBy("userId");
  query = query.select("*", knex.raw("sum(cnt) as sumCnt"));

  // Верхнее вложение
  query = knex(query.as("t2"));
  query = query.groupBy("sumCnt");
  query = query.select("sumCnt as cnt", knex.raw("COUNT(userId) as count"));

  return query;
}

export async function purchasesInPeriod(filter: FilterState) {
  const [{ saleUsersCount }, items] = await Promise.all([
    SalesPerformanceQuery(filter).first(),
    purchasesInPeriodQuery(filter),
  ]);
  return items.map((item) => ({
    cnt: util.format("%s раз", item.cnt),
    count: util.format("%s чел", item.count),
    proportion: numberFormat(saleUsersCount / item.count, 2),
  }));
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
