import type { NextApiHandler } from "next";
import { planFactAnalysis } from "../../../models/indicators/planFactAnalysis";

const planFactAnalysisHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await planFactAnalysis(filter);
  response.json({ result: "ok", data: result });
};

export default planFactAnalysisHandler;
