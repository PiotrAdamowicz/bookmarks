import type { AddTimeProps } from "./helpers/addTime";
import type { UrlProps } from "./types";

export const TOKEN_KEY = "accessToken";
export const TOKEN_EXPIRATION_KEY = "expiresAt";
export const LOCAL_STORAGE_KEYS = {
    token: "accessToken",
    expiration: "expiresAt",
};
export const URL: UrlProps = {
    home: "/",
    login: "auth/login",
    bookmarks: "bookmarks",
};
export const TOKEN_EXPIRATION: AddTimeProps = { amount: 15, unit: "minutes" };
export const QUERY_KEYS = {
    bookmarks: "bookmarks",
};
