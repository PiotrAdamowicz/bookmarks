import { useEffect, type FormEvent } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { TOKEN_KEY } from "../constants";

export const Login = () => {
    const [accessToken] = useLocalStorage(TOKEN_KEY, "");
    const navigate = useNavigate();
    const login = useLogin();

    useEffect(() => {
        if (accessToken) navigate("/bookmarks");
    }, []);

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        login.mutate(
            {
                email: form.get("email") as string,
                password: form.get("password") as string,
            },
            {
                onSuccess: () => {
                    navigate("/bookmarks");
                },
            }
        );
    };

    return (
        <div className="flex h-screen items-center justify-center">
            <form onSubmit={submitHandler}>
                <input
                    name="email"
                    placeholder="Email"
                    value="harry@pipa.com"
                />
                <input name="password" type="password" placeholder="Password" />
                <button className="cursor-pointer">
                    {login.isPending ? "Logging in..." : "Login"}
                </button>
                {login.isError && (
                    <p className="text-red-500">{login.error.message}</p>
                )}
            </form>
        </div>
    );
};
