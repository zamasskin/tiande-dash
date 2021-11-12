import _ from "lodash";

import { qb as knex } from "../../settings/api";

import { FilterState } from "../../features/indicators/filterSlice";
import { indicatorsQuery, currencyRateJoin, joinLocationProps } from ".";
import { prepareFilter } from "./filter";
import { numberFormatRub } from "../number";

export function deliveryQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = prepareFilter(query, filter);

  query = query.select(
    "o.DELIVERY_ID as name",
    knex.raw(
      "round(sum(if(o.CURRENCY='RUB', o.price, o.price / k.RATE_CNT * k.RATE)),2) as salesSum"
    ),
    knex.raw(`
      CASE
        WHEN  op6.VALUE = '47c18d8baab2495536beb3d8357897d5' AND op9.VALUE = '1' THEN 'pwz доставка'
        WHEN  op6.VALUE = '47c18d8baab2495536beb3d8357897d5' AND op9.VALUE = '0' THEN 'доставка'
        WHEN  op6.VALUE = 'e25698fc082e285f8d8030bc648e20c2' AND op9.VALUE = '0' THEN 'самовывоз'
        WHEN  op6.VALUE = 'e25698fc082e285f8d8030bc648e20c2' AND op9.VALUE = '1' THEN 'pwz самовывоз'
        ELSE 'Не Установлено'
      END type
    `)
  );
  query = query.select("*", knex.raw("SUM(salesSum) AS sum"));
  return query;
}

export function prepareDeliveryList(deliveryIndicators: any[]) {
  const $sum = _.sumBy(deliveryIndicators, "sum");
  deliveryIndicators.map((indicators) => ({
    ...indicators,
    salesSum: numberFormatRub(indicators.salesSum),
    sum: (indicators.sum / $sum) * 100,
  }));
}

export async function deliveryList(filter: FilterState) {
  const deliveryIndicators = await deliveryQuery(filter).groupBy(
    "name",
    "type"
  );
  return prepareDeliveryList(deliveryIndicators);
}

export async function deliveryGroupList(filter: FilterState) {
  const deliveryIndicators = await deliveryQuery(filter).groupBy("type");
  return prepareDeliveryList(deliveryIndicators);
}
