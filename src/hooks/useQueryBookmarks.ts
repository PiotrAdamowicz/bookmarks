import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { URL } from "../constants";
import type { Bookmark } from "../types";

export function useQueryBookmarks(): {
    bookmarks: Bookmark[];
    isPending: boolean;
    error: Error | null;
} {
    const {
        data: bookmarks,
        isPending,
        error,
    } = useQuery({
        queryKey: ["bookmarks"],
        queryFn: () => api(URL.bookmarks),
    });

    return { bookmarks, isPending, error };
}
