import { redirect } from "react-router";
import { clearToken, getToken, isExpired } from "../helpers/tokenHelpers";

export async function api(
    endpoint: string,
    options: RequestInit = {},
    returnRaw = false
): Promise<any> {
    let token = getToken();

    if (token && isExpired()) {
        console.warn("Token expired, clearing");
        clearToken();
        token = null;
    }

    const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });
    if (!res.ok) {
        if (res.status === 401) {
            clearToken();
            console.log("REDIRECTG works!");
            redirect("/login");
        }
        throw new Error(`API error: ${res.status}`);
    }
    if (!res.ok && !returnRaw) {
        throw new Error(`API error: ${res.status}`);
    }

    return returnRaw ? res : res.json();
}
