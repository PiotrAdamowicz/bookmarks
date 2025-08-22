import type { FormEvent } from "react";
import { useAddBookmark } from "../hooks/useAddBookmark";
import { useNavigate } from "react-router";
import { URL } from "../constants";

export default function AddBookmark() {
    const add = useAddBookmark();
    const navigate = useNavigate();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        add.mutate(
            {
                title: form.get("title") as string,
                description: form.get("description") as string,
                link: form.get("link") as string,
            },
            {
                onSuccess: () =>
                    navigate("/" + URL.bookmarks, { replace: true }),
            }
        );
    };

    return (
        <>
            <h1 className="text-4xl text-center">Add Bookmar page</h1>
            <form
                className="flex flex-col gap-2 mx-10"
                onSubmit={submitHandler}
            >
                <input name="title" placeholder="Title" />
                <input name="description" placeholder="Description" />
                <input name="link" placeholder="Link" />
                <button className="cursor-pointer">
                    {add.isPending ? "Adding..." : "Add"}
                </button>
                {add.isError && (
                    <p className="text-red-500">{add.error.message}</p>
                )}
            </form>
        </>
    );
}
