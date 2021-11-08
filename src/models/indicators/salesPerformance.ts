import { indicatorsQuery, currencyRateJoin } from ".";
import { FilterState } from "../../features/indicators/filterSlice";
import { prepareFilter } from "./filter";

export function SalesPerformanceQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = prepareFilter(query, filter);
  return query.select();
}

export async function SalesPerformance(filter: FilterState) {}
