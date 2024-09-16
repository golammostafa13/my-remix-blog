import { ActionFunction } from "@remix-run/node";
import { Form, Link, isRouteErrorResponse, json, redirect, useActionData, useRouteError } from "@remix-run/react";
import { db } from "~/utils/db.server";

// Type for form data
type PostErrors = {
    title?: string;
    content?: string;
    author?: string;
};

// Action function to handle form submission
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const { title, content, author } = Object.fromEntries(formData) as { title: string, content: string, author: string };

    // Simple validation
    const errors: PostErrors = {};
    if (!title) errors.title = "Title is required";
    if (!content) errors.content = "Content is required";
    if (!author) errors.author = "Author is required";

    // If there are validation errors, return them to the form
    if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 });
    }


    // throw new Response("Oh no! Something went wrongdfssssssss!", {
    //     status: 500,
    // });
    // throw new Error("Oh no! Something went wrongdsd!");

    // Example: You could save the post to a database here
    const post = await db.post.create({ data: { title, content, author } });

    // Example: You could send an email to the author here
    // Redirect to the posts list after successful submission
    return redirect(`/posts/${post.id}`);
};

// Component to render the form
export default function NewPost() {
    const actionData = useActionData<{ errors?: PostErrors }>(); // Expecting an object with possible 'errors'

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
            <Form method="post">
                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block font-medium mb-1">
                        Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {actionData?.errors?.title && (
                        <p className="text-red-500">{actionData.errors.title}</p>
                    )}
                </div>

                {/* Content */}
                <div className="mb-4">
                    <label htmlFor="content" className="block font-medium mb-1">
                        Content
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        rows={5}
                    ></textarea>
                    {actionData?.errors?.content && (
                        <p className="text-red-500">{actionData.errors.content}</p>
                    )}
                </div>

                {/* Author */}
                <div className="mb-4">
                    <label htmlFor="author" className="block font-medium mb-1">
                        Author
                    </label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                    />
                    {actionData?.errors?.author && (
                        <p className="text-red-500">{actionData.errors.author}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Post
                </button>
            </Form>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError() as Error;

    if (isRouteErrorResponse(error)) {
        console.log(error)
        return (
            <div className="flex flex-col items-center justify-center py-8  bg-red-50">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
                <p className="text-lg text-gray-700 mb-2">Status: {error.status}</p>
                <p className="text-gray-600">{error.data.message || "An unexpected error occurred."}</p>
                <Link
                    to="/"
                    className="mt-6 inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                >
                    Go back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-8 bg-gray-50">
            <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mb-2">{error.message}</p>
            <Link
                to="/"
                className="mt-6 inline-block bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
            >
                Go back to Home
            </Link>
        </div>
    );
}
