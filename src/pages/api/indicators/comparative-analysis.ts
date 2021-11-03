import type { NextApiHandler } from "next";
import { comparativeAnalysis } from "../../../models/indicators";

const countriesHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  //const result = await comparativeAnalysis(filter);
  // /api/indicators/comparative-analysis
  response.json({ result: "ok", data: [] });
};

export default countriesHandler;
