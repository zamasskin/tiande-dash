import type { NextApiHandler } from "next";
import { ltvIndicators } from "../../../models/indicators/ltv";

const ltvIndicatorsHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await ltvIndicators(filter);
  response.json({ result: "ok", data: result });
};

export default ltvIndicatorsHandler;
