import axios from "axios";

import { domain } from "../settings/api";
import { prepareResponse, Response } from "../features/api";

export async function fetchSession(sessionId: string) {
  const url = "http://127.0.0.1:3002/api/session";
  const response = await axios.post<Response>(url, { sessionId });
  const data = prepareResponse(response);
  return data;
}
