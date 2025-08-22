import { LOCAL_STORAGE_KEYS } from "../constants";

export function getToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.token);
    if (!token) return;

    return JSON.parse(token);
}

export function getExpiresAt(): number {
    const expiresAt = localStorage.getItem(LOCAL_STORAGE_KEYS.expiration);
    if (!expiresAt) return 0;
    try {
        const parsed = JSON.parse(expiresAt);

        if (typeof parsed === "number") {
            return parsed; // already ms timestamp
        }

        if (typeof parsed === "string") {
            return Date.parse(parsed); // convert to ms
        }

        return 0;
    } catch {
        return Date.parse(expiresAt) || Number(expiresAt) || 0;
    }
}

export function isExpired(): boolean {
    return Date.now() > getExpiresAt();
}

export function clearToken() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.token);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.expiration);
}
