import { qb as knex } from "../../settings";
import { indicatorsQuery, currencyRateJoin, joinLocationProps } from ".";
import { prepareLtvFilter } from "./filter";
import { FilterState } from "../../features/indicators/filterSlice";
import { numberFormat } from "../number";
import { SalesPerformanceQuery } from "./salesPerformance";

export function registerQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareLtvFilter(query, filter);

  query = query.select(knex.raw("COUNT(distinct o.USER_ID) as registerCount"));
  return query;
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
