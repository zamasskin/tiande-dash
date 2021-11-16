import { prepareResponse, Response } from "./index";
import Cookies from "js-cookie";
import axios from "axios";

export async function fetchSession(sessionId: string) {
  const response = await axios.post<Response>("/api/session", { sessionId });
  const data = prepareResponse(response);
  return data;
}
