import util from "util";
import type { NextApiHandler } from "next";
import axios from "axios";
import cheerio from "cheerio";
import cookie from "cookie";
import FormData from "form-data";

const loginHandler: NextApiHandler = async (request, response) => {
  const {
    login = "",
    password = "",
    type = 1,
    phpSessId = false,
  } = request.body;

  var bodyFormData = new FormData();
  bodyFormData.append("auth_modal_open", "Y");
  bodyFormData.append(
    "USER_AUTH_TYPE",
    type === 1 ? "SERVICE_CENTER" : "ONLINE_OFFICE"
  );
  bodyFormData.append("USER_LOGIN", login);
  bodyFormData.append("USER_PASSWORD", password);
  bodyFormData.append("backurl", "/");
  bodyFormData.append("AUTH_FORM", "Y");
  bodyFormData.append("TYPE", "AUTH");

  const headers: { [key: string]: string } = bodyFormData.getHeaders();

  if (phpSessId) {
    headers["Cookie"] = util.format("PHPSESSID=%s;", phpSessId);
  }

  try {
    const axiosResponse = await axios({
      method: "post",
      url: "https://tiande.ru/bitrix/templates/.default/ajax/auth.php",
      data: bodyFormData,
      headers,
    });

    let $phpSessId: string;
    for (let strCookie of axiosResponse.headers["set-cookie"]) {
      let cookies = cookie.parse(strCookie);
      if ("PHPSESSID" in cookies) {
        $phpSessId = cookies.PHPSESSID;
      }
    }

    const $ = cheerio.load((axiosResponse.data || "").toString());
    if ($("#sign-in").length > 0) {
      return response.json({
        error: true,
        message: "Неверный логин или пароль",
      });
    }
    response.json({ data: $phpSessId });
  } catch (err) {
    response.json({ error: true, message: err.message });
  }
};

export default loginHandler;
