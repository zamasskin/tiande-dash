import moment from "moment";

import { qb as knex } from "../../settings/api";
import { DynamicsFilterState } from "../../features/dynamics/filterSlice";
import {
  indicatorsQuery,
  currencyRateJoin,
  joinLocationProps,
  joinUser,
} from "../indicators";
import { prepareFilter } from "./filter";

export function dynamicsSaleQuery(filter: DynamicsFilterState) {
  let { periodStart, periodEnd } = filter;
  const dateStart = moment(periodStart).format("YYYY-MM-DD 00:00:00");
  const dateEnd = moment(periodEnd).format("YYYY-MM-DD 23:59:59");
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = joinUser(query);
  query = prepareFilter(query, filter);
  query = query.select(
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) as salesSum"
    ),
    knex.raw(`date_format(o.DATE_INSERT, '${filter.periodType}') AS 'date'`),
    //salesSumNew
    knex.raw(
      `round(sum(IF(u.DATE_REGISTER >= '${dateStart}' AND u.DATE_REGISTER <= '${dateEnd}', if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE),0)),2) as salesSumNew`
    )
  );
  query = query.groupBy(
    knex.raw(`date_format(o.DATE_INSERT, '${filter.periodType}')`)
  );
  return query;
}

export async function dynamicsSale(filter: DynamicsFilterState) {
  const dynamicsSaleList = await dynamicsSaleQuery(filter);
  return dynamicsSaleList;
}
