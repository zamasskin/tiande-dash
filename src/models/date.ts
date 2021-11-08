import moment from "moment";

export const indicators = {
  diff: (start: number, end: number) =>
    moment(end).diff(moment(start), "days") + 1,
};
