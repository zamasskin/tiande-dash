import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const homePath = process.env.NEXT_PUBLIC_HOME_PATH || "";

export const getUrl = (url: string) => homePath + url;
