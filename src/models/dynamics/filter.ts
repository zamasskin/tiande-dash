import { Knex } from "knex";

import { DynamicsFilterState as FilterState } from "../../features/dynamics/filterSlice";
import {
  prepareCountry,
  prepareCurrency,
  prepareEs,
  prepareIsApp,
  prepareLoyalty,
  preparePayOrder,
  preparePeriod,
  preparePickup,
  prepareRegistrationMethod,
  prepareUserNew,
} from "../indicators/filter";

export function prepareFilter(query: Knex.QueryBuilder, filter: FilterState) {
  query = preparePeriod(query, filter.periodStart, filter.periodEnd);
  query = prepareCountry(query, filter.country);
  query = prepareCurrency(query, filter.currency);
  query = prepareIsApp(query, filter.isApp);
  query = prepareLoyalty(query, filter.loyalty);
  query = preparePickup(query, filter.pickup);
  query = preparePayOrder(query, filter.payOrder);
  query = prepareRegistrationMethod(query, filter.registrationMethod);
  query = prepareUserNew(
    query,
    filter.periodUserNewStart,
    filter.periodUserNewEnd
  );
  query = prepareEs(query, filter.isEs);
  return query;
}
