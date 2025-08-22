import type { AddTimeProps } from "./helpers/addTime";

export const TOKEN_KEY = "accessToken";
export const TOKEN_EXPIRATION_KEY = "expiresAt";
export const URL: UrlProps = {
    home: "/",
    login: "auth/login",
    bookmarks: "bookmarks",
};
export const TOKEN_EXPIRATION: AddTimeProps = { amount: 1, unit: "minutes" };

export type UrlProps = {
    home: string;
    login: string;
    bookmarks: string;
};
