import type { NextApiHandler } from "next";
import { purchasesInPeriod } from "../../../models/indicators/ltv";

const purchasesInPeriodHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await purchasesInPeriod(filter);
  response.json({ result: "ok", data: result });
};

export default purchasesInPeriodHandler;
