import { prepareResponse, Response } from "./index";
import Cookies from "js-cookie";
import axios from "axios";
import { getUrl } from "../../settings/public";

export async function fetchSession(sessionId: string) {
  const response = await axios.post<Response>(getUrl("/api/session"), {
    sessionId,
  });
  const data = prepareResponse(response);
  return data;
}
