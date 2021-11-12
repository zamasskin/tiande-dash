import type { NextApiHandler } from "next";
import { dynamicsSale } from "../../../models/dynamics";

const dynamicSaleHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await dynamicsSale(filter);
  response.json({ result: "ok", data: result });
};

export default dynamicSaleHandler;
