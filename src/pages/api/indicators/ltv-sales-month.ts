import type { NextApiHandler } from "next";
import { salesByMonth } from "../../../models/indicators/ltv";

const ltvSalesMonthHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await salesByMonth(filter);
  response.json({ result: "ok", data: result });
};

export default ltvSalesMonthHandler;

//ltv-sales-month
