import type { NextApiHandler } from "next";

import { qb } from "../../../settings";

const storagesHandler: NextApiHandler = async (request, response) => {
  const storages = await qb("b_catalog_store").select(
    "XML_ID as value",
    "TITLE as text"
  );

  response.json({ result: "ok", data: storages });
};

export default storagesHandler;
