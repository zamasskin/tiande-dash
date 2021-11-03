import axios from "axios";
import { prepareResponse, Response } from "./index";

export async function fetchCountry(useId = 0, allowed = true) {
  const response = await axios.post<Response>("/api/filter/countries", {
    useId,
    allowed,
  });

  return prepareResponse(response);
}

export async function fetchStorage() {
  const response = await axios.post<Response>("/api/filter/storages");
  return prepareResponse(response);
}

export async function fetchCurrencies() {
  const response = await axios.post<Response>("/api/filter/currencies");
  return prepareResponse(response);
}

export async function fetchShipmentMethod() {
  const response = await axios.post<Response>("/api/filter/shipment-method");
  return prepareResponse(response);
}
