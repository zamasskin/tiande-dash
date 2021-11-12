import _ from "lodash";
import { unserialize } from "php-serialize";

import { qb as knex } from "../../settings/api";

import { FilterState } from "../../features/indicators/filterSlice";
import {
  indicatorsQuery,
  currencyRateJoin,
  joinLocationProps,
  joinPickupProps,
  joinPvzProps,
} from ".";
import { prepareFilter } from "./filter";
import { numberFormatRub } from "../number";

export function deliveryQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = joinLocationProps(query);
  query = joinPickupProps(query);
  query = joinPvzProps(query);
  query = prepareFilter(query, filter);
  query.groupBy("o.DELIVERY_ID", "op6.VALUE", "op9.VALUE");
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
  query = knex(query.as("t"));
  query = query.select("*", knex.raw("SUM(salesSum) AS sum"));
  return query;
}

export async function staticDeliveryList() {
  const deliveryList = await knex("b_sale_delivery").select(
    "ID as id",
    "NAME as name"
  );
  return _.mapValues(_.keyBy(deliveryList, "id"), "name");
}

export async function dynamicDeliveryList() {
  let deliveryList = await knex("b_sale_delivery_handler").select(
    "HID as hid",
    "NAME as name",
    "PROFILES as profiles"
  );
  deliveryList = deliveryList.map((delivery) => {
    const profiles = unserialize(delivery.profiles);
    const profileName = _.first(Object.keys(profiles));
    return {
      id: [delivery.hid, profileName].join(":"),
      ...delivery,
    };
  });
  return _.mapValues(_.keyBy(deliveryList, "id"), "name");
}

export async function prepareDeliveryList(deliveryIndicators: any[]) {
  const [staticList, dynamicList] = await Promise.all([
    staticDeliveryList(),
    dynamicDeliveryList(),
  ]);
  deliveryIndicators = deliveryIndicators.map((indicators) => ({
    ...indicators,
    sum: Number(indicators.sum) || 0,
  }));
  const $sum = _.sumBy(deliveryIndicators, "sum");
  return deliveryIndicators.map((indicators) => ({
    ...indicators,
    name:
      staticList[indicators.name] ||
      dynamicList[indicators.name] ||
      indicators.name,
    salesSum: numberFormatRub(indicators.salesSum),
    sum: (indicators.sum / $sum) * 100,
  }));
}

export async function deliveryList(filter: FilterState) {
  const query = deliveryQuery(filter).groupBy("name", "type");
  const deliveryIndicators = await query;
  return prepareDeliveryList(deliveryIndicators);
}

export async function deliveryGroupList(filter: FilterState) {
  const deliveryIndicators = await deliveryQuery(filter).groupBy("type");
  return prepareDeliveryList(deliveryIndicators);
}
