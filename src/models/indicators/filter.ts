import { Knex } from "knex";
import { qb as knex } from "../../settings/api";
import moment from "moment";
import { from, map, of } from "rxjs";
import {
  joinBitCountry,
  joinIsAppProps,
  joinIsBoutiqueProps,
  joinLoyaltyProps,
  joinPickupProps,
  joinStorageProps,
  joinUser,
  joinUserProperties,
} from "./index";
import { FilterState } from "../../features/indicators/filterSlice";

export type yn = 0 | 1 | 2;

export function prepareFilter(knex: Knex.QueryBuilder, filter: FilterState) {
  return of(knex).pipe(
    map((knex) => preparePeriod(knex, filter.periodStart, filter.periodEnd)),
    map((knex) => prepareCountry(knex, filter.country)),
    map((knex) => prepareCurrency(knex, filter.currency)),
    map((knex) => prepareIsApp(knex, filter.isApp)),
    map((knex) => prepareLoyalty(knex, filter.loyalty)),
    map((knex) => preparePickup(knex, filter.pickup)),
    map((knex) => preparePayOrder(knex, filter.payOrder)),
    map((knex) => prepareRegistrationMethod(knex, filter.registrationMethod)),
    map((knex) =>
      prepareUserNew(knex, filter.periodUserNewStart, filter.periodUserNewEnd)
    ),
    map((knex) => prepareEs(knex, filter.isEs)),
    map((knex) => prepareBoutique(knex, filter.isBoutique))
  );
}

export function preparePeriod(
  qb: Knex.QueryBuilder,
  start: number,
  end: number
) {
  if (start > 0 && end > 0) {
    return qb
      .where("o.DATE_INSERT", ">=", new Date(start))
      .where("o.DATE_INSERT", "<=", new Date(end));
  }
  return qb;
}

export function prepareCountry(qb: Knex.QueryBuilder, countryId: number) {
  if (countryId > 0) {
    return joinBitCountry(qb).where("c.ID", countryId);
  }
  return qb;
}

export function prepareStorage(qb: Knex.QueryBuilder, storageId: string) {
  if (storageId) {
    return joinStorageProps(qb).where("op7.VALUE", storageId);
  }
  return qb;
}

export function prepareCurrency(qb: Knex.QueryBuilder, currency: string) {
  if (currency) {
    return qb.where("o.CURRENCY", currency);
  }
  return qb;
}

export function prepareIsApp(qb: Knex.QueryBuilder, app: yn) {
  if (app > 0) {
    return joinIsAppProps(qb).where("op4.VALUE", app === 1 ? "Y" : "N");
  }
  return qb;
}

export function prepareLoyalty(qb: Knex.QueryBuilder, loyalty: yn) {
  if (loyalty > 0) {
    return joinLoyaltyProps(qb).where("op3.VALUE", loyalty === 1 ? "Y" : "N");
  }
  return qb;
}

export function preparePickup(qb: Knex.QueryBuilder, pickup: string) {
  if (pickup) {
    return joinPickupProps(qb).where("op6.VALUE", pickup);
  }
  return qb;
}

export function preparePayOrder(qb: Knex.QueryBuilder, payOrder: yn) {
  if (payOrder > 0) {
    return qb.where("o.PAYED", payOrder === 1 ? "Y" : "N");
  }
  return qb;
}

export function prepareRegistrationMethod(
  qb: Knex.QueryBuilder,
  registrationMethod: string
) {
  if (registrationMethod) {
    if (registrationMethod === "UF_IS_SERVICE") {
      return joinUserProperties(qb).where((qb) =>
        qb
          .whereNull("ut.UF_REGISTER_METHOD")
          .orWhere("ut.UF_REGISTER_METHOD", "")
      );
    } else {
      return joinUserProperties(qb).where(
        "ut.UF_REGISTER_METHOD",
        registrationMethod
      );
    }
  }
  return qb;
}

export function prepareUserNew(
  qb: Knex.QueryBuilder,
  start: number,
  end: number
) {
  if (start > 0 && end > 0) {
    const endDate = moment(end).add(1, "days").toDate();
    return joinUser(qb)
      .where("u.DATE_REGISTER", ">=", start)
      .where("u.DATE_REGISTER", "<", endDate);
  }
  return qb;
}

export function prepareEs(qb: Knex.QueryBuilder, isEs: yn) {
  if (isEs > 0) {
    return joinBitCountry(qb).where("c.UF_IS_EU", Boolean(isEs === 1));
  }
  return qb;
}

export function prepareBoutique(qb: Knex.QueryBuilder, isBoutique: yn) {
  if (isBoutique > 0) {
    return joinIsBoutiqueProps(qb).where(
      "op8.VALUE",
      isBoutique === 1 ? "Y" : "N"
    );
  }
  return qb;
}
