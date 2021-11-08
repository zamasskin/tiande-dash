import type { NextApiHandler } from "next";
import { SalesPerformanceQuery } from "../../../models/indicators";

const salesPerformance: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await SalesPerformanceQuery(filter);
  response.json({ result: "ok", data: result });
};

export default salesPerformance;
