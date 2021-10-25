import type { NextApiHandler } from "next";

import { qb } from "../../../settings/api";

const currenciesHandler: NextApiHandler = async (request, response) => {
  const currencies = await qb("b_catalog_currency_lang")
    .where("LID", "ru")
    .select("CURRENCY as value", "FULL_NAME as text");

  response.json({ esult: "ok", data: currencies });
};

export default currenciesHandler;
