import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import { QUERY_KEYS, URL } from "../constants";
import type { Bookmark } from "../types";

// export function useDeleteBookmark() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (id: number) =>
//             await api(`${URL.bookmarks}/${id}`, { method: "DELETE" }),
//     });
// }

export function useDeleteBookmark() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) =>
            await api(`${URL.bookmarks}/${id}`, { method: "DELETE" }),

        onSettled: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.bookmarks],
                });
            }, 300);
        },
    });
}
