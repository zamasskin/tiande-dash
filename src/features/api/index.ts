import axios, { AxiosResponse } from "axios";
import { homePath } from "../../settings/public";

interface ErrorResponse {
  error: boolean;
  message: string;
}

interface OkResponse {
  data: any;
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 404) {
      if (
        error.response.config.url &&
        error.response.config.url.substr(0, homePath.length) === homePath
      ) {
        error.message =
          'Url is not set correctly. Set the correct value in the parameter "NEXT_PUBLIC_HOME_PATH". NEXT_PUBLIC_HOME_PATH=' +
          homePath;
      }
    }
    throw error;
  }
);

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
