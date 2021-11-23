import { Knex } from "knex";
import moment from "moment";

import { FilterState } from "../../features/indicators/filterSlice";
import { qb as knex } from "../../settings";

export * from "./comparativeAnalysis";
export * from "./salesPerformance";

export function indicatorsQuery() {
  return knex({ o: "b_sale_order" })
    .where("o.CANCELED", "N")
    .whereNotNull("o.DELIVERY_ID")
    .where("o.DELIVERY_ID", "<>", "");
}

export function checkRequiredJoin(
  query,
  searchKey: string,
  searchValue: string
) {
  const joins = query._statements.filter(
    (obj) => "joinType" in obj && "table" in obj
  );
  return !!joins.find(
    (obj) =>
      Object.keys(obj.table).join("") === searchKey &&
      Object.values(obj.table).join("") === searchValue
  );
}

//query._statements
export function currencyRateJoin(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "k", "b_catalog_currency_rate")
    ? qb
    : qb.leftJoin({ k: "b_catalog_currency_rate" }, (qb) =>
        qb
          .on("k.DATE_RATE", knex.raw("date_format(o.DATE_INSERT, '%Y-%m-%d')"))
          .andOn("k.CURRENCY", "o.CURRENCY")
      );
}

export function joinLocationProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op", "b_sale_order_props_value")
    ? qb
    : qb.join({ op: "b_sale_order_props_value" }, (qb) =>
        qb.on("op.ORDER_ID", "o.ID").andOn("op.ORDER_PROPS_ID", knex.raw(2))
      );
}

export function joinStorageProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op7", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op7: "b_sale_order_props_value" }, (qb) =>
        qb.on(" op7.ORDER_ID", "o.ID").andOn("op7.ORDER_PROPS_ID", knex.raw(43))
      );
}

export function joinLoyaltyProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op3", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op3: "b_sale_order_props_value" }, (qb) =>
        qb.on("op3.ORDER_ID", "o.ID").andOn("op3.ORDER_PROPS_ID", knex.raw(126))
      );
}

export function joinLocation(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "l", "b_sale_location")
    ? joinLocationProps(qb)
    : joinLocationProps(qb).join({ l: "b_sale_location" }, "l.ID", "op.VALUE");
}

export function joinBitCountry(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "c", "bit_country")
    ? joinLocation(qb)
    : joinLocation(qb).join(
        { c: "bit_country" },
        "c.UF_BITRIX_COUNTRY",
        "l.COUNTRY_ID"
      );
}

export function joinIsAppProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op4", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op4: "b_sale_order_props_value" }, (qb) =>
        qb.on("op4.ORDER_ID", "o.ID").andOn("op4.ORDER_PROPS_ID", knex.raw(92))
      );
}

export function joinPickupProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op6", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op6: "b_sale_order_props_value" }, (qb) =>
        qb.on("op6.ORDER_ID", "o.ID").andOn("op6.ORDER_PROPS_ID", knex.raw(69))
      );
}

export function joinPvzProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op9", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op9: "b_sale_order_props_value" }, (qb) =>
        qb.on("op9.ORDER_ID", "o.ID").andOn("op9.ORDER_PROPS_ID", knex.raw(91))
      );
}

export function joinIsBoutiqueProps(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "op8", "b_sale_order_props_value")
    ? qb
    : qb.leftJoin({ op8: "b_sale_order_props_value" }, (qb) =>
        qb.on("op8.ORDER_ID", "o.ID").andOn("op8.ORDER_PROPS_ID", knex.raw(127))
      );
}

export function joinUser(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "u", "b_user")
    ? qb
    : qb.leftJoin({ u: "b_user" }, "u.ID", "o.USER_ID");
}

export function joinUserProperties(qb: Knex.QueryBuilder) {
  return checkRequiredJoin(qb, "ut", "b_uts_user")
    ? joinUser(qb)
    : joinUser(qb).leftJoin({ ut: "b_uts_user" }, "ut.VALUE_ID", "u.ID");
}
