import moment from "moment";

export function getDefaultDateRange() {
  let startDate = moment().startOf("month");
  const dateEnd = moment();
  if (startDate.format("YYYY-MM-DD") === dateEnd.format("YYYY-MM-DD")) {
    startDate = startDate.add(-1, "days");
  }
  return [startDate, dateEnd];
}
