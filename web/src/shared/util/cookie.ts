import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = <T>(key: string, value: T, days: number): void => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days);
  return cookies.set(key, JSON.stringify(value), {
    expires: expires,
    path: "/",
  });
};

export const getCookie = <T>(key: string): T | undefined => {
  return cookies.get(key);
};

export const removeCookie = (key: string, path: string = "/"): void => {
  cookies.remove(key, { path: path });
};
