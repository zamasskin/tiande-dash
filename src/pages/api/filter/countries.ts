import type { NextApiHandler } from "next";

import { findCountryList } from "../../../models/filter";

const countriesHandler: NextApiHandler = async (request, response) => {
  try {
    const countries = await findCountryList(request.cookies["PHPSESSID"]);
    response.json({ result: "ok", data: countries });
  } catch (err) {
    response.json({ error: true, message: err.message });
  }
};

export default countriesHandler;
