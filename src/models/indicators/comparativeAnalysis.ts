import { indicatorsQuery } from "./index";
import { FilterState } from "../../features/indicators/filterSlice";
import { qb as knex } from "../../settings/api";
import { numberFormatRub } from "../number";
import { currencyRateJoin, joinLocationProps } from "./index";
import { prepareFilter } from "./filter";
import {
  getFilterMonthAgo,
  getFilterYearAgo,
} from "../../features/functions/date";

export function comparativeAnalysisQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = prepareFilter(query, filter);
  query = joinLocationProps(query);
  query = query.select(
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) AS 'sales_sum'"
    ),
    knex.raw(
      "round(round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) / count(o.ID),2) AS 'average_check'"
    )
  );
  return query;
}

export async function comparativeAnalysis(filter: FilterState) {
  const filterMonthAgo = getFilterMonthAgo(filter),
    filterYearAgo = getFilterYearAgo(filter);

  const [p1, p2, p3] = await Promise.all([
    comparativeAnalysisQuery(filter).first(),
    comparativeAnalysisQuery(filterMonthAgo).first(),
    comparativeAnalysisQuery(filterYearAgo).first(),
  ]);

  const salesFirstMonth = p1.sales_sum - p2.sales_sum;
  const salesFirstYear = p1.sales_sum - p3.sales_sum;
  const averageCheckFirstMonth = p1.average_check - p2.average_check;
  const averageCheckFirstYear = p1.average_check - p3.average_check;

  const callPercent = (sum1: number, sum2: number) =>
    (Number((sum1 / sum2) * 100) || 0).toFixed(2) + "%";

  return [
    {
      price: numberFormatRub(salesFirstMonth),
      percent: callPercent(salesFirstMonth, p2.sales_sum),
    },
    {
      price: numberFormatRub(salesFirstYear),
      percent: callPercent(salesFirstYear, p3.sales_sum),
    },
    {
      price: numberFormatRub(averageCheckFirstMonth),
      percent: callPercent(averageCheckFirstMonth, p2.average_check),
    },
    {
      price: numberFormatRub(averageCheckFirstYear),
      percent: callPercent(averageCheckFirstYear, p3.average_check),
    },
  ];
}
