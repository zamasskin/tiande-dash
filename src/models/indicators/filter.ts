import { Knex } from "knex";
import { qb as knex } from "../../settings";
import moment from "moment";
import { from, map, Observable, of } from "rxjs";
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
import { endTime, startTime } from "../../features/functions/date";

export type yn = 0 | 1 | 2;

export function valToYn<T>(val: T): yn {
  const result = Number(val) || 0;
  return result as yn;
}

export function prepareFilter(query: Knex.QueryBuilder, filter: FilterState) {
  query = preparePeriod(
    query,
    Number(filter.periodStart) || 0,
    Number(filter.periodEnd) || 0
  );
  query = prepareCountry(query, Number(filter.country) || 0);
  query = prepareStorage(query, filter.storage);
  query = prepareCurrency(query, filter.currency);
  query = prepareIsApp(query, valToYn(filter.isApp));
  query = prepareLoyalty(query, valToYn(filter.loyalty));
  query = preparePickup(query, filter.pickup);
  query = preparePayOrder(query, valToYn(filter.payOrder));
  query = prepareRegistrationMethod(query, filter.registrationMethod);
  query = prepareUserNew(
    query,
    Number(filter.periodUserNewStart) || 0,
    Number(filter.periodUserNewEnd) || 0
  );
  query = prepareEs(query, valToYn(filter.isEs));
  query = prepareBoutique(query, valToYn(filter.isBoutique));
  return query;
}

export function prepareFilterPlanFactIndicators(
  query: Knex.QueryBuilder,
  filter: FilterState
) {
  query = preparePeriod(query, filter.periodStart, filter.periodEnd);
  query = prepareCountry(query, filter.country);
  return query;
}

export function preparePeriod(
  qb: Knex.QueryBuilder,
  start: number,
  end: number
) {
  if (start > 0 && end > 0) {
    start = startTime(start);
    end = endTime(end);
    const dateStart = moment(start),
      dateEnd = moment(end);
    dateStart.set({ hour: 0, minute: 0, second: 0 });
    dateEnd.set({ hour: 23, minute: 59, second: 59 });

    return qb
      .where("o.DATE_INSERT", ">=", dateStart.toDate())
      .where("o.DATE_INSERT", "<=", dateEnd.toDate());
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
): Knex.QueryBuilder {
  if (start > 0) {
    const dateStart = moment(start).set({ hour: 0, minute: 0, second: 0 });
    qb = joinUser(qb).where("u.DATE_REGISTER", ">=", dateStart.toDate());
  }
  if (end > 0) {
    const endDate = moment(end)
      .add(1, "days")
      .set({ hour: 23, minute: 59, second: 59 });
    qb = joinUser(qb).where("u.DATE_REGISTER", "<", endDate.toDate());
  }
  return qb;
}

export function prepareEs(qb: Knex.QueryBuilder, isEs: yn): Knex.QueryBuilder {
  if (isEs > 0) {
    return joinBitCountry(qb).where("c.UF_IS_EU", Boolean(isEs === 1));
  }
  return qb;
}

export function prepareBoutique(qb: Knex.QueryBuilder, isBoutique: yn) {
  if (isBoutique > 0) {
    return joinIsBoutiqueProps(qb).where((qb) =>
      qb
        .where("op8.VALUE", isBoutique === 1 ? "Y" : "N")
        .orWhereNull("op8.VALUE")
    );
  }
  return qb;
}

export function prepareUserCountry(qb: Knex.QueryBuilder, countryId: number) {
  if (countryId > 0) {
    return joinUserProperties(qb).where("ut.UF_COUNTRY", countryId);
  }
  return qb;
}
