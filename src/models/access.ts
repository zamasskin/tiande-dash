import { getOptionByName } from "./options";

export async function sessionAccess() {
  const { session_login = "", session_password = "" } = await getOptionByName(
    "api_access_tiande"
  );
  return { login: session_login, password: session_password };
}
