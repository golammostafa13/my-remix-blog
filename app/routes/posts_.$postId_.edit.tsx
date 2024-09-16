// posts.$postId_.edit.tsx
import { redirect } from "@remix-run/node";
import { Form, Link, isRouteErrorResponse, useActionData, useLoaderData, useRouteError } from "@remix-run/react";
import { db } from "~/utils/db.server";

// Loader function to fetch the post based on the postId param
export const loader = async ({ params }: { params: { postId: string } }) => {
    const post = await db.post.findUnique({
        where: { id: params.postId },
    });

    if (!post) {
        throw new Response("Post not found", { status: 404 });
    }

    return { post };
};

// Action function to handle post updates
export const action = async ({ request, params }: { request: Request; params: { postId: string } }) => {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData) as { title: string, content: string };
    const { title, content } = updates;
    if (!title || !content) {
        return { error: "Title and Content are required" };
    }

    try {
        await db.post.update({
            where: { id: params.postId },
            data: {
                title,
                content,
            },
        });

        return redirect(`/posts/${params.postId}`);
    } catch (error) {
        console.log(error)
        return { error: "Failed to update the post" };
    }
};

// Post Edit Page component
export default function EditPost() {
    const { post } = useLoaderData<typeof loader>();
    const actionData = useActionData<{ error?: string }>();

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-6">Edit Post</h1>
            {actionData?.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                    {actionData.error}
                </div>
            )}
            <Form method="post" className="space-y-4">
                <input type="hidden" name="_action" value="update" />
                <div>
                    <label htmlFor="title" className="block text-lg font-semibold">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        defaultValue={post.title}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-lg font-semibold">Content:</label>
                    <textarea
                        name="content"
                        id="content"
                        defaultValue={post.content}
                        rows={6}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    ></textarea>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
            </Form>
        </div>
    );
}

// ErrorBoundary component to handle errors during post editing
export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div className="max-w-2xl mx-auto my-10 p-6 bg-red-100 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h2>
                <p className="text-lg text-red-500 mb-4">Status: {error.status}</p>
                <p className="text-md text-gray-700 mb-6">{error.data}</p>
                <Link
                    to="/posts"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                    ← Back to Posts
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto my-10 p-6 bg-red-100 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h2>
            <p className="text-lg text-red-500 mb-4">An unexpected error occurred.</p>
            <Link
                to="/"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                ← Go back to Home
            </Link>
        </div>
    );
}
