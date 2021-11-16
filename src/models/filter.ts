import { fetchSession } from "./session";
import { qb } from "../settings/api";

export async function findCountryList(sessionId: string) {
  const sessionData = await fetchSession(sessionId);
  const userId = Number(sessionData?.AUTH_USER_FIELDS?.ID) || 0;
  const isAdmin = sessionData?.SESS_AUTH?.ADMIN || false;
  let countries = await qb("bit_country").select(
    "ID as value",
    "UF_NAME as text"
  );

  if (!isAdmin) {
    const properties = await qb("b_utm_user")
      .where("FIELD_ID", "2011")
      .where("VALUE_ID", userId)
      .select("VALUE_INT", "id");

    const allowedCountries = properties.map((p) => Number(p.id));
    countries = countries.filter((c) =>
      allowedCountries.includes(Number(c.value))
    );
  }

  if (countries.length === 0) {
    throw new Error("Не доступно");
  }

  return countries;
}
