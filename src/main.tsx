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
import { AnimatePresence } from "motion/react";
import { PageAnimationWrapper } from "./components/PageAnimationWrapper";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PageAnimationWrapper>
                <Login />
            </PageAnimationWrapper>
        ),
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/bookmarks",
                element: (
                    <PageAnimationWrapper>
                        <Bookmarks />
                    </PageAnimationWrapper>
                ),
            },
            {
                path: "/add",
                element: (
                    <PageAnimationWrapper>
                        <AddBookmark />
                    </PageAnimationWrapper>
                ),
            },
            {
                path: "/edit",
                element: (
                    <PageAnimationWrapper>
                        <EditBookmark />
                    </PageAnimationWrapper>
                ),
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AnimatePresence mode="wait">
                <RouterProvider router={router} />
            </AnimatePresence>
        </QueryClientProvider>
    </React.StrictMode>
);
