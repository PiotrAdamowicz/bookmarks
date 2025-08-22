import { useMutation } from "@tanstack/react-query";
import type { Bookmark } from "../types";
import { api } from "../api/api";
import { URL } from "../constants";

type AddPayload = {
    title: string;
    description: string;
    link: string;
};

export function useAddBookmark() {
    return useMutation<Bookmark, Error, AddPayload>({
        mutationFn: async (payload: AddPayload) => {
            const res = await api(URL.bookmarks, {
                method: "POST",
                body: JSON.stringify(payload),
            });

            return res;
        },
    });
}
