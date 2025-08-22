import { Link, useNavigate } from "react-router";
import { clearToken } from "../helpers/tokenHelpers";
import { useQueryBookmarks } from "../hooks/useQueryBookmarks";
import { QUERY_KEYS, URL } from "../constants";
import { useDeleteBookmark } from "../hooks/useDeleteBookmark";
import { useQueryClient } from "@tanstack/react-query";
import { AnimateItemWrapper } from "../components/AnimateItemWrapper";

export default function Bookmarks() {
    const { bookmarks, isPending, error } = useQueryBookmarks();
    const navigate = useNavigate();
    const remove = useDeleteBookmark();
    const queryClient = useQueryClient();

    const onLogout = () => {
        clearToken();
        navigate(URL.home);
    };

    const removeBookmark = (id: number) => {
        remove.mutate(id, {
            onSuccess: () => {
                // invalidate cached bookmarks so UI refreshes
                queryClient.invalidateQueries({
                    queryKey: [QUERY_KEYS.bookmarks],
                });
            },
        });
    };

    if (error) {
        return <p className="text-red-600">Authentication expired</p>;
    }
    if (isPending) {
        return <p>Loading...</p>;
    }
    if (bookmarks?.length === 0) {
        return <p>No bookmarks</p>;
    }
    return (
        <section className="flex flex-col">
            <h1 className="text-4xl text-center">Bookmarks page</h1>
            <ul className="text-center my-4 text-4xl">
                <AnimateItemWrapper>
                    {bookmarks.map((bookmark) => (
                        <li key={bookmark.id}>
                            <h3>{bookmark.title}</h3>
                            <button
                                onClick={() => removeBookmark(bookmark.id)}
                                className="bg-red-600 text-xl p-2 rounded-md cursor-pointer"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </AnimateItemWrapper>
            </ul>
            <Link
                to="/add"
                className="bg-green-500 text-center inline py-2 px-8 cursor-pointer rounded-md m-2 max-w-md text-white mx-auto font-bold"
            >
                Add
            </Link>
            <button onClick={onLogout}>Logout</button>
        </section>
    );
}
