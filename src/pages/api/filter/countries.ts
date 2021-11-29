import type { NextApiHandler } from "next";

import { findCountryList } from "../../../models/filter";

const countriesHandler: NextApiHandler = async (request, response) => {
  const { phpSessId } = request.body;
  try {
    const countries = await findCountryList(
      phpSessId || request.cookies["PHPSESSID"]
    );
    response.json({ result: "ok", data: countries });
  } catch (err) {
    response.json({ error: true, message: err.message });
  }
};

export default countriesHandler;
