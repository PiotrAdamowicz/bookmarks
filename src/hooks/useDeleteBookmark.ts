import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";
import { URL } from "../constants";

export function useDeleteBookmark(id: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) =>
            api(URL.bookmarks + id, { method: "DELETE" }),
        onSuccess: () => {
            // invalidate cached bookmarks so UI refreshes
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        },
    });
}
