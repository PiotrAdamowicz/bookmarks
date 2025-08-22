import { clearToken, getToken, isExpired } from "../helpers/tokenHelpers";

export async function api(
    endpoint: string,
    options: RequestInit = {}
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
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}
