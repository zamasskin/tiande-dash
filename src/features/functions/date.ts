import moment from "moment";
import { FilterState } from "../indicators/filterSlice";

export function addMonth(time: number, month: number = 1) {
  return moment(time).add(month, "month").toDate().getTime();
}

export function addYear(time: number, year: number = 1) {
  return moment(time).add(year, "year").toDate().getTime();
}

export function getDefaultDateRange() {
  let startDate = moment().startOf("month");
  const dateEnd = moment();
  if (startDate.format("YYYY-MM-DD") === dateEnd.format("YYYY-MM-DD")) {
    startDate = startDate.add(-1, "days");
  }
  return [startDate.toDate(), dateEnd.toDate()];
}

export function getFilterMonthAgo(filter: FilterState) {
  return {
    ...filter,
    periodStart: addMonth(filter.periodStart, -1),
    periodEnd: addMonth(filter.periodEnd, -1),
  };
}

export function getFilterYearAgo(filter: FilterState) {
  return {
    ...filter,
    periodStart: addYear(filter.periodStart, -1),
    periodEnd: addYear(filter.periodEnd, -1),
  };
}
