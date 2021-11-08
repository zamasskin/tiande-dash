import type { NextApiHandler } from "next";
import { SalesPerformance } from "../../../models/indicators";

const salesPerformance: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await SalesPerformance(filter);
  response.json({ result: "ok", data: result });
};

export default salesPerformance;
