import axios from "axios";
import { FilterState } from "../../features/indicators/filterSlice";
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

export async function SalesPerformanceQuery(filter: FilterState) {
  const response = await axios.post<Response>(
    "/api/indicators/sales-performance",
    {
      filter,
    }
  );
  return prepareResponse(response);
}
