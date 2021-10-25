import { qb } from "../settings/api";

export async function getOptionByName(name: string) {
  const { value = "{}" } = await qb("tiande_options")
    .where("UF_NAME", name)
    .select("UF_VALUE as value");
  return JSON.parse(value);
}
