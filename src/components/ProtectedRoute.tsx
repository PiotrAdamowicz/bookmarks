import { Navigate, Outlet } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_KEY } from "../constants";
import { isExpired } from "../helpers/tokenHelpers";

export default function ProtectedRoute() {
    const [accessToken] = useLocalStorage(TOKEN_KEY, "");

    if (accessToken && !isExpired()) {
        return <Outlet />;
    }
    return <Navigate to="/" replace />;
}
