// app/routes/login.tsx
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useFetcher } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/session.server";
import { validateLogin } from "~/utils/validation.server";

export const meta: MetaFunction = () => {
    return [
        { title: "Login - My Remix Blog" },
        { name: "description", content: "Login to join My Remix Blog." },
        { name: "robots", content: "noindex" } // Optional
    ];
};

type ActionData = {
    errors?: {
        email?: string;
        password?: string;
    };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const email = formData.get("email");
    const password = formData.get("password");

    // Validate form data
    const errors = validateLogin(email, password);
    if (errors) {
        return json<ActionData>({ errors }, { status: 400 });
    }

    // Dummy authentication for example
    if (email === "user@example.com" && password === "password") {
        const session = await getSession(request);
        session.set("userId", "some-unique-user-id"); // Set userId or similar identifier
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }

    return json<ActionData>({
        errors: {
            email: "Invalid credentials",
        },
    }, { status: 401 });
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request);
    const userId = session.get("userId");
    if (userId) {
        return redirect("/");
    }
    return json({});
};

export default function Login() {
    const actionData = useActionData<ActionData>();
    const fetcher = useFetcher();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Login</h1>

                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {actionData?.errors?.email && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {actionData?.errors?.password && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                        disabled={fetcher.state === "submitting"}
                    >
                        {fetcher.state === "submitting" ? "Logging in..." : "Login"}
                    </button>
                </Form>

                <p className="mt-4 text-center">
                    Don&apos;t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
