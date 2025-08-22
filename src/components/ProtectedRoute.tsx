import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { LOCAL_STORAGE_KEYS } from "../constants";
import { isExpired } from "../helpers/tokenHelpers";

export default function ProtectedRoute() {
    const [accessToken] = useLocalStorage(LOCAL_STORAGE_KEYS.token, "");

    if (accessToken && !isExpired()) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
}
