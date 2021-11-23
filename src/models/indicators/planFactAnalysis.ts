import _ from "lodash";

import { qb as knex } from "../../settings";
import { indicatorsQuery, currencyRateJoin, joinLocationProps } from ".";
import { FilterState } from "../../features/indicators/filterSlice";
import { prepareFilterPlanFactIndicators } from "./filter";
import { startTime } from "../../features/functions/date";
import { numberFormatRub } from "../number";

export function factQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = prepareFilterPlanFactIndicators(query, filter);
  query = joinLocationProps(query);
  query = query.select(
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) as 'fact'"
    )
  );
  return query.first();
}

export function planQuery(filter: FilterState) {
  const periodStart = startTime(filter.periodStart);
  let query = knex("plan_order")
    .select("UF_VALUE as plan")
    .where("UF_PERIOD", new Date(periodStart));
  if (filter.country > 0) {
    query = query.where("UF_COUNTRY", filter.country);
  }
  return query.first();
}

export async function planFactAnalysis(filter: FilterState) {
  const getValue = async <T>(query: Promise<T>, def: T) => (await query) || def;
  const [{ fact }, { plan }] = await Promise.all([
    getValue(planQuery(filter), { fact: 0 }),
    getValue(factQuery(filter), { plan: 0 }),
  ]);

  return {
    fact: numberFormatRub(fact),
    plan: numberFormatRub(fact),
    abc: numberFormatRub(plan - fact),
    otn: numberFormatRub(100 - _.round(((plan - fact) / plan) * 100, 2)),
  };
}
