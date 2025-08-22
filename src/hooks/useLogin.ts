import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { addTime } from "../helpers/addTime";
import { api } from "../api/api";
import { LOCAL_STORAGE_KEYS, TOKEN_EXPIRATION, URL } from "../constants";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
};

export function useLogin() {
    const [_, setAccessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.token, "");
    const [__, setExpiration] = useLocalStorage(
        LOCAL_STORAGE_KEYS.expiration,
        ""
    );

    return useMutation<LoginResponse, Error, LoginPayload>({
        mutationFn: async (credentials: LoginPayload) => {
            const res = await api(URL.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(credentials),
            });

            setAccessToken(res.access_token);
            const expiration = addTime(TOKEN_EXPIRATION);
            setExpiration(
                expiration instanceof Date
                    ? expiration.toISOString()
                    : String(expiration)
            );
            return res;
        },
    });
}
