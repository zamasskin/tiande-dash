import axios from "axios";
import { getUrl } from "../../settings/public";
import { prepareResponse, Response } from "./index";

export async function fetchCountry() {
  const response = await axios.post<Response>(getUrl("/api/filter/countries"));

  return prepareResponse(response);
}

export async function fetchStorage() {
  const response = await axios.post<Response>(getUrl("/api/filter/storages"));
  return prepareResponse(response);
}

export async function fetchCurrencies() {
  const response = await axios.post<Response>(getUrl("/api/filter/currencies"));
  return prepareResponse(response);
}

export async function fetchShipmentMethod() {
  const response = await axios.post<Response>(
    getUrl("/api/filter/shipment-method")
  );
  return prepareResponse(response);
}
