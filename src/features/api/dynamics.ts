import axios from "axios";
import { DynamicsFilterState } from "../dynamics/filterSlice";
import { prepareResponse, Response } from "./index";

export async function fetchDeliveryGroupList(filter: DynamicsFilterState) {
  const response = await axios.post<Response>("/api/dynamics/dynamic-sale", {
    filter,
  });
  return prepareResponse(response);
}
