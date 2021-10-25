import type { NextApiHandler } from "next";
import axios, { AxiosResponse } from "axios";
import crypto from "crypto";

import { sessionAccess } from "../../models/access";
import { sessionApiUrl } from "../../settings/api";

interface ErrorResponse {
  error: string;
}
interface Response {
  response: any;
}

const sessionHandler: NextApiHandler = async (request, response) => {
  const { sessionId = "" } = request.body;
  const { login, password } = await sessionAccess();

  const date = new Date();
  const signature = crypto
    .createHash("sha256")
    .update(`${login}:${password}:${date}`)
    .digest("hex");

  let axiosResponse: AxiosResponse<ErrorResponse | Response>;
  try {
    axiosResponse = await axios.post(sessionApiUrl, {
      login,
      signature,
      date,
      params: { session_id: sessionId },
    });
    const data = axiosResponse.data;

    if (!data) {
      throw new Error(
        `response error: [${axiosResponse.status}] ${axiosResponse.statusText}`
      );
    } else if ("error" in data) {
      throw new Error(data.error);
    }
    response.json({ result: "ok", data: data.response });
  } catch (e) {
    response.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

export default sessionHandler;
