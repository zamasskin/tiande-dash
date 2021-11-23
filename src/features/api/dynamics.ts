import _ from "lodash";
import axios from "axios";
import { DynamicsFilterState } from "../dynamics/filterSlice";
import { prepareResponse, Response } from "./index";
import { getUrl } from "../../settings/public";

export async function fetchDynamicSaleList(filter: DynamicsFilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/dynamics/dynamic-sale"),
    { filter }
  );
  const data = prepareResponse(response);
  const trace1 = {
    x: _.map(data, "date"),
    y: _.map(data, "salesSum"),
    hovertemplate: "%{y:,.2f} руб",
    name: "Сумма продаж",
    type: "scatter",
  };

  const trace2 = {
    x: _.map(data, "date"),
    y: _.map(data, "salesSumNew"),
    hovertemplate: "%{y:,.2f} руб",
    name: "Сумма продаж по новичкам",
    type: "scatter",
  };

  return [trace1, trace2];
}
