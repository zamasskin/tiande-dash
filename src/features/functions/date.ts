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
    periodUserNewStart:
      filter.periodUserNewStart > 0
        ? addMonth(filter.periodUserNewStart, -1)
        : 0,
    periodUserNewEnd:
      filter.periodUserNewEnd > 0 ? addMonth(filter.periodUserNewEnd, -1) : 0,
  };
}

export function getFilterYearAgo(filter: FilterState) {
  return {
    ...filter,
    periodStart: addYear(filter.periodStart, -1),
    periodEnd: addYear(filter.periodEnd, -1),
    periodUserNewStart:
      filter.periodUserNewStart > 0
        ? addYear(filter.periodUserNewStart, -1)
        : 0,
    periodUserNewEnd:
      filter.periodUserNewEnd > 0 ? addYear(filter.periodUserNewEnd, -1) : 0,
  };
}

export function startTime(time: number) {
  return moment(time)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toDate()
    .getTime();
}
export function endTime(time: number) {
  return moment(time)
    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
    .toDate()
    .getTime();
}

export const indicators = {
  diff: (start: number, end: number) =>
    moment(end).diff(moment(start), "days") + 1,
};
