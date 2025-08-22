import { useNavigate } from "react-router";
import { clearToken } from "../helpers/tokenHelpers";
import { useQueryBookmarks } from "../hooks/useQueryBookmarks";
import { URL } from "../constants";

export default function Bookmarks() {
    const { bookmarks, isPending, error } = useQueryBookmarks();
    const navigate = useNavigate();

    const onLogout = () => {
        clearToken();
        navigate(URL.home);
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
        <>
            <h1 className="text-4xl text-center">Bookmarks page</h1>
            <ul className="text-center my-4 text-4xl">
                {bookmarks.map((bookmark) => (
                    <li key={bookmark.id}>{bookmark.title}</li>
                ))}
            </ul>
            <button onClick={onLogout}>Logout</button>
        </>
    );
}
