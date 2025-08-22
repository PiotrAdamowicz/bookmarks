import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { QUERY_KEYS, URL } from "../constants";
import type { Bookmark } from "../types";
import { useNavigate } from "react-router";

export function useQueryBookmarks(): {
    bookmarks: Bookmark[];
    isPending: boolean;
    error: Error | null;
} {
    const navigate = useNavigate();
    const {
        data: bookmarks,
        isPending,
        error,
    } = useQuery({
        queryKey: [QUERY_KEYS.bookmarks],
        queryFn: async () => {
            const res = await api(URL.bookmarks, {}, true);
            if (res.status === 401) {
                navigate("/login", { replace: true });
                return []; // prevent further errors
            }
            return res.json() as Promise<Bookmark[]>;
        },
        retry: false,
    });

    return {
        bookmarks: bookmarks || [],
        isPending,
        error: error as Error | null,
    };
}
