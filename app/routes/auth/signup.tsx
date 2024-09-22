// app/routes/signup.tsx
import {
    ActionFunction,
    LoaderFunction,
    MetaFunction,
    json,
    redirect,
} from "@remix-run/node";
import { Form, Link, useActionData, useFetcher } from "@remix-run/react";
import { hashPassword } from "~/utils/auth.server"; // Function to hash passwords
import { commitSession, getSession } from "~/utils/session.server";
import { validateSignup } from "~/utils/validation.server";

export const meta: MetaFunction = () => {
    return [
        { title: "Sign Up - My Remix Blog" },
        { name: "description", content: "Create a new account to join My Remix Blog." },
        { name: "robots", content: "noindex" } // Optional
    ];
};


type ActionData = {
    errors?: {
        email?: string;
        password?: string;
        confirmPassword?: string;
        name?: string;
    };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword");
    const name = formData.get("name");

    // Validate form data
    const errors = validateSignup(email, password, confirmPassword, name);
    if (errors) {
        return json<ActionData>({ errors }, { status: 400 });
    }

    // Dummy user creation
    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword)
    // Save user to your database here
    // e.g., await db.user.create({ data: { email, name, password: hashedPassword } });

    const session = await getSession(request);
    session.set("userId", "some-unique-user-id"); // Set userId or similar identifier
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};

export const loader: LoaderFunction = async ({ request }) => {
    const session = await getSession(request);
    const userId = session.get("userId");
    if (userId) {
        return redirect("/");
    }
    return json({});
};

export default function Signup() {
    const actionData = useActionData<ActionData>();
    const transition = useFetcher();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>

                <Form method="post" className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {actionData?.errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.name}</p>
                        )}
                    </div>

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

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                        />
                        {actionData?.errors?.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{actionData.errors.confirmPassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600"
                        disabled={transition.state === "submitting"}
                    >
                        {transition.state === "submitting" ? "Signing up..." : "Sign Up"}
                    </button>
                </Form>

                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}
