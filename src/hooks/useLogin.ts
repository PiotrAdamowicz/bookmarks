import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "usehooks-ts";
import { addTime } from "../helpers/addTime";
import { api } from "../api/api";
import {
    TOKEN_EXPIRATION,
    TOKEN_EXPIRATION_KEY,
    TOKEN_KEY,
    URL,
} from "../constants";

type LoginPayload = {
    email: string;
    password: string;
};

type LoginResponse = {
    access_token: string;
};

export function useLogin() {
    const [_, setAccessToken] = useLocalStorage(TOKEN_KEY, "");
    const [__, setExpiration] = useLocalStorage(TOKEN_EXPIRATION_KEY, "");
    const queryClient = useQueryClient();

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
        onSuccess: () => {
            // Re-fetch auth state so ProtectedRoute sees updated user
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
}
