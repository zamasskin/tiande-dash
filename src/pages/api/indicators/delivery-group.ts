import type { NextApiHandler } from "next";
import { deliveryGroupList } from "../../../models/indicators/delivery";

const deliveryGroupHandler: NextApiHandler = async (request, response) => {
  const { filter } = request.body;
  const result = await deliveryGroupList(filter);
  response.json({ result: "ok", data: result });
};

export default deliveryGroupHandler;
