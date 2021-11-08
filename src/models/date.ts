import moment from "moment";

export function addMonth(time: number, month: number = 1) {
  return moment(time).add(month, "month").toDate().getTime();
}

export function addYear(time: number, year: number = 1) {
  return moment(time).add(year, "year").toDate().getTime();
}

export const indicators = {
  diff: (start: number, end: number) =>
    moment(end).diff(moment(start), "days") + 1,
};
