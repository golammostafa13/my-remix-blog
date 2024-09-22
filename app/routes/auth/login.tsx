import { Form, Link, useActionData, useFetcher } from "@remix-run/react";

type ActionData = {
    errors?: {
        email?: string;
        password?: string;
    };
};

export default function Login() {
    const actionData = useActionData<ActionData>();
    const fetcher = useFetcher();

    return (
        <div className="flex justify-center items-center bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                {/* Login Header */}
                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                            create a new account
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <Form method="post" className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {actionData?.errors?.email && (
                            <p className="mt-2 text-sm text-red-600">{actionData.errors.email}</p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        {actionData?.errors?.password && (
                            <p className="mt-2 text-sm text-red-600">{actionData.errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={fetcher.state === "submitting"}
                        >
                            {fetcher.state === "submitting" ? "Signing in..." : "Sign In"}
                        </button>
                    </div>
                </Form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Forgot your password?{" "}
                    <Link to="/reset-password" className="text-blue-600 hover:underline">
                        Reset it here
                    </Link>
                </p>
            </div>
        </div>
    );
}
