import axios from "axios";
import { getUrl } from "../../settings/public";
import { FilterState } from "../indicators/filterSlice";
import { prepareResponse, Response } from "./index";

export async function fetchComparativeAnalysis(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/comparative-analysis"),
    { filter }
  );
  return prepareResponse(response);
}

export async function fetchSalesPerformance(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/sales-performance"),
    { filter }
  );
  return prepareResponse(response);
}

export async function fetchPlanFactAnalysis(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/plan-fact-analysis"),
    { filter }
  );
  return prepareResponse(response);
}

export async function fetchDeliveryList(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/delivery"),
    { filter }
  );
  return prepareResponse(response);
}

export async function fetchDeliveryGroupList(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/delivery-group"),
    { filter }
  );
  return prepareResponse(response);
}

export async function fetchLtvIndicators(filter: FilterState) {
  const response = await axios.post<Response>(
    getUrl("/api/indicators/ltv-indicators"),
    { filter }
  );
  return prepareResponse(response);
}
