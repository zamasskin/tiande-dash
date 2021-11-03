import { Knex } from "knex";
import moment from "moment";
import { FilterState } from "../../features/indicators/filterSlice";
import { qb as knex } from "../../settings/api";
import { prepareFilter } from "./filter";

export function comparativeAnalysisQuery(filter: FilterState) {
  let query = indicatorsQuery();
  query = currencyRateJoin(query);
  query = prepareFilter(query, filter);
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

export function addMonth(time: number, month: number = 1) {
  return moment(time).add(month, "month").toDate().getTime();
}

export function addYear(time: number, year: number = 1) {
  return moment(time).add(year, "year").toDate().getTime();
}

export function numberFormat(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  const reqExp = new RegExp("\\B(?=(?:\\d{3})+(?!\\d))", "g");
  let [left, right = ""] = price.toFixed(decimals).toString().split(".");
  if (decimals > 0 && hideZero) {
    right = right.replace(/[0]+$/, "");
  }
  left = left.replace(reqExp, thousandsSep);
  return (right.length > 0 ? left + decPoint + right : left).toString();
}

export function numberFormatRub(
  price: number,
  decimals = 2,
  decPoint = ".",
  thousandsSep = " ",
  hideZero = false
) {
  return (
    numberFormat(price, decimals, decPoint, thousandsSep, hideZero) + " руб"
  );
}

export async function comparativeAnalysis(filter: FilterState) {
  const filterMonthAgo = { ...filter },
    filterYearAgo = { ...filter };
  filterMonthAgo.periodStart = addMonth(filterMonthAgo.periodStart, -1);
  filterMonthAgo.periodEnd = addMonth(filterMonthAgo.periodEnd, -1);
  filterYearAgo.periodStart = addYear(filterYearAgo.periodStart, -1);
  filterYearAgo.periodEnd = addYear(filterYearAgo.periodEnd, -1);

  const [p1, p2, p3] = await Promise.all([
    comparativeAnalysisQuery(filter).first(),
    comparativeAnalysisQuery(filterMonthAgo).first(),
    comparativeAnalysisQuery(filterYearAgo).first(),
  ]);

  const salesFirstMonth = p1.sales_sum - p2.sales_sum;
  const salesFirstYear = p1.sales_sum - p3.sales_sum;
  const averageCheckFirstMonth = p1.average_check - p2.average_check;
  const averageCheckFirstYear = p1.average_check - p3.average_check;

  return [
    { price: numberFormatRub(salesFirstMonth), percent: "5%" },
    { price: numberFormatRub(salesFirstYear), percent: "6%" },
    { price: numberFormatRub(averageCheckFirstMonth), percent: "7%" },
    { price: numberFormatRub(averageCheckFirstYear), percent: "8%" },
  ];
}

export function indicatorsQuery() {
  return knex({ o: "b_sale_order" })
    .where("o.CANCELED", "N")
    .whereNotNull("o.DELIVERY_ID")
    .where("o.DELIVERY_ID", "<>", "");
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
  return joinLocationProps(qb).join(
    { l: "b_sale_location" },
    "l.ID",
    "op.VALUE"
  );
}

export function joinBitCountry(qb: Knex.QueryBuilder) {
  return joinLocation(qb).join(
    { c: "bit_country" },
    "c.UF_BITRIX_COUNTRY",
    "l.COUNTRY_ID"
  );
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
  return joinUser(qb).leftJoin({ ut: "b_uts_user" }, "ut.VALUE_ID", "u.ID");
}
