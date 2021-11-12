import type { NextApiHandler } from "next";
import { deliveryList } from "../../../models/indicators/delivery";

const deliveryHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await deliveryList(filter);
  response.json({ result: "ok", data: result });
};

export default deliveryHandler;
