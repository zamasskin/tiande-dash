import axios from "axios";

import { getUri } from "../settings/public";
import { prepareResponse, Response } from "../features/api";

export async function fetchSession(sessionId: string) {
  const response = await axios.post<Response>(getUri("/api/session"), {
    sessionId,
  });
  const data = prepareResponse(response);
  return data;
}
