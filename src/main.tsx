import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthProvider from "./components/AuthProvider";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmarks from "./routes/BookmarksPage";
import { Login } from "./routes/LoginPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Bookmarks />
            </ProtectedRoute>
        ),
    },
    {
        path: "/signin",
        element: <Login />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider isSignedIn={false}>
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
