import type { NextApiHandler } from "next";
import { comparativeAnalysis } from "../../../models/indicators/comparativeAnalysis";

const comparativeAnalysisHandler: NextApiHandler = async (
  request,
  response
) => {
  const { filter } = request.body;
  const result = await comparativeAnalysis(filter);
  response.json({ result: "ok", data: result });
};

export default comparativeAnalysisHandler;
