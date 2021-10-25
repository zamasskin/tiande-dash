import axios, { AxiosResponse } from "axios";

interface ErrorResponse {
  error: boolean;
  message: string;
}

interface OkResponse {
  data: any;
}

type Response = ErrorResponse | OkResponse;

export function prepareResponse(response: AxiosResponse<Response>) {
  const { data } = response;
  if (!data) {
    throw new Error(
      `response error: [${response.status}] ${response.statusText}`
    );
  }

  if ("error" in data) {
    throw new Error(data.message);
  }
  return data.data;
}

export async function fetchCountry(useId = 0, allowed = true) {
  const response = await axios.post<Response>("/api/filter/countries", {
    useId,
    allowed,
  });

  return prepareResponse(response);
}
