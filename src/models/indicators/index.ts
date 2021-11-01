import { Knex } from "knex";
import { qb as knex } from "../../settings/api";

export function indicatorsQuery() {
  return knex({ o: "b_sale_order" })
    .where("o.CANCELED", "N")
    .whereNotNull("DELIVERY_ID")
    .where("DELIVERY_ID", "<>", "");
}

export function currencyRateJoin(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ k: "b_catalog_currency_rate" }, (qb) =>
    qb
      .on("k.DATE_RATE", knex.raw("date_format(o.DATE_INSERT, '%Y-%m-%d')"))
      .andOn("k.CURRENCY", "o.CURRENCY")
  );
}

export function joinLocationProps(qb: Knex.QueryBuilder) {
  return qb.join({ op: "b_sale_order_props_value" }, (qb) =>
    qb.on("op.ORDER_ID", "o.ID").andOn("op.ORDER_PROPS_ID", knex.raw(2))
  );
}

export function joinStorageProps(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ op7: "b_sale_order_props_value" }, (qb) =>
    qb.on(" op7.ORDER_ID", "o.ID").andOn("op7.ORDER_PROPS_ID", knex.raw(43))
  );
}

export function joinLoyaltyProps(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ op3: "b_sale_order_props_value" }, (qb) =>
    qb.on("op3.ORDER_ID", "o.ID").andOn("op3.ORDER_PROPS_ID", knex.raw(126))
  );
}

export function joinLocation(qb: Knex.QueryBuilder) {
  joinLocationProps(qb);
  return qb.join({ l: "b_sale_location" }, "l.ID", "op.VALUE");
}

export function joinBitCountry(qb: Knex.QueryBuilder) {
  joinLocation(qb);
  return qb.join({ c: "bit_country" }, "c.UF_BITRIX_COUNTRY", "l.COUNTRY_ID");
}

export function joinIsAppProps(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ op4: "b_sale_order_props_value" }, (qb) =>
    qb.on("op4.ORDER_ID", "o.ID").andOn("op4.ORDER_PROPS_ID", knex.raw(92))
  );
}

export function joinPickupProps(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ op6: "b_sale_order_props_value" }, (qb) =>
    qb.on("op6.ORDER_ID", "o.ID").andOn("op6.ORDER_PROPS_ID", knex.raw(69))
  );
}

export function joinIsBoutiqueProps(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ op8: "b_sale_order_props_value" }, (qb) =>
    qb.on("op8.ORDER_ID", "o.ID").andOn("op8.ORDER_PROPS_ID", knex.raw(127))
  );
}

export function joinUser(qb: Knex.QueryBuilder) {
  return qb.leftJoin({ u: "b_user" }, "u.ID", "o.USER_ID");
}

export function joinUserProperties(qb: Knex.QueryBuilder) {
  joinUser(qb);
  return qb.leftJoin({ ut: "b_uts_user" }, "ut.VALUE_ID", "u.ID");
}
