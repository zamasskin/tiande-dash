import axios from "axios";
import { FilterState } from "../indicators/filterSlice";
import { prepareResponse, Response } from "./index";

export async function fetchComparativeAnalysis(filter: FilterState) {
  const response = await axios.post<Response>(
    "/api/indicators/comparative-analysis",
    {
      filter,
    }
  );
  return prepareResponse(response);
}

export async function fetchSalesPerformance(filter: FilterState) {
  const response = await axios.post<Response>(
    "/api/indicators/sales-performance",
    {
      filter,
    }
  );
  return prepareResponse(response);
}

export async function fetchPlanFactAnalysis(filter: FilterState) {
  const response = await axios.post<Response>(
    "/api/indicators/plan-fact-analysis",
    {
      filter,
    }
  );
  return prepareResponse(response);
}

export async function fetchDeliveryList(filter: FilterState) {
  const response = await axios.post<Response>("/api/indicators/delivery", {
    filter,
  });
  return prepareResponse(response);
}

export async function fetchDeliveryGroupList(filter: FilterState) {
  const response = await axios.post<Response>(
    "/api/indicators/delivery-group",
    {
      filter,
    }
  );
  return prepareResponse(response);
}