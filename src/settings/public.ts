import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const homePath = process.env.NEXT_PUBLIC_HOME_PATH || "";
const domain = process.env.NEXT_PUBLIC_DOMAIN || "127.0.0.1";

export const getUrl = (url: string) => homePath + url;
export const getUri = (url) => domain + url;
