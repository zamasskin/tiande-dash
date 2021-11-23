import { prepareResponse, Response } from "./index";
import Cookies from "js-cookie";
import axios from "axios";
import { getUrl } from "../../settings/public";

export interface fetchOptions {
  login: string;
  password: string;
  type: number;
}

export async function fetchLogin({ login, password, type }: fetchOptions) {
  const response = await axios.post<Response>(getUrl("/api/login"), {
    login,
    password,
    type,
  });
  const data = prepareResponse(response);
  Cookies.set("PHPSESSID", data);
  return true;
}
