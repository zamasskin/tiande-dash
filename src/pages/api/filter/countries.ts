import type { NextApiHandler } from "next";
import { qb } from "../../../settings/api";

const countriesHandler: NextApiHandler = async (request, response) => {
  const { amount = 1 } = request.body;

  const countries = await qb("bit_country").select(
    "ID as value",
    "UF_NAME as text"
  );
  response.json({ result: "ok", data: countries });
};

export default countriesHandler;
