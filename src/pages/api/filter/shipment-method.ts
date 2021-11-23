import type { NextApiHandler } from "next";

import { qb } from "../../../settings";

const shipmentMethod: NextApiHandler = async (request, response) => {
  const currencies = await qb("b_sale_order_props_variant")
    .where("ORDER_PROPS_ID", 69)
    .select("VALUE as value", "NAME as text");

  response.json({ result: "ok", data: currencies });
};

export default shipmentMethod;
