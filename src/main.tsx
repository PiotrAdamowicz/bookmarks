import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Bookmarks from "./routes/BookmarksPage";
import { Login } from "./routes/LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddBookmark from "./routes/AddBookmarkPage";
import EditBookmark from "./routes/EditBookmarkPage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/bookmarks",
                element: <Bookmarks />,
            },
            {
                path: "/add",
                element: <AddBookmark />,
            },
            {
                path: "/edit",
                element: <EditBookmark />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </React.StrictMode>
);
