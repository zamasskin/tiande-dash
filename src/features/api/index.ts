import { AxiosResponse } from "axios";

interface ErrorResponse {
  error: boolean;
  message: string;
}

interface OkResponse {
  data: any;
}

export type Response = ErrorResponse | OkResponse;

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
