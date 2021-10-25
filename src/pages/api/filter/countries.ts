import type { NextApiHandler } from "next";

import { qb } from "../../../settings/api";

const countriesHandler: NextApiHandler = async (request, response) => {
  const { useId = 0, allowed = true } = request.body;

  let countries = await qb("bit_country").select(
    "ID as value",
    "UF_NAME as text"
  );

  if (!allowed) {
    const properties = await qb("b_utm_user")
      .where("FIELD_ID", "2011")
      .where("VALUE_ID", useId)
      .select("VALUE_INT", "id");

    const allowedCountries = properties.map((p) => Number(p.id));
    countries = countries.filter((c) =>
      allowedCountries.includes(Number(c.value))
    );
  }

  response.json({ result: "ok", data: countries });
};

export default countriesHandler;
