import { redirect } from "@remix-run/node";
import { Form, Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import invariant from "tiny-invariant";
import { db } from "~/utils/db.server";

// Loader function to fetch the post based on the postId param
export const loader = async ({ params }: { params: { postId: string } }) => {
    invariant(params.postId, "Missing post id param");

    const post = await db.post.findUnique({
        where: { id: params.postId },
    });

    if (!post) {
        throw new Response("Post not found", { status: 404 });
    }

    return { post };
};

// Action function to handle post updates and deletion
export const action = async ({ request, params }: { request: Request; params: { postId: string } }) => {
    const formData = await request.formData();
    const actionType = formData.get("_action");

    // Handle post deletion
    if (actionType === "delete") {
        try {
            await db.post.delete({
                where: { id: params.postId },
            });
            return redirect("/posts");
        } catch (error) {
            throw new Response("Failed to delete the post", { status: 500 });
        }
    }
};

// PostItem component to display and edit the post
function PostItem() {
    const { post } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
                <p className="text-sm text-gray-500">
                    By <span className="font-semibold">{post.author}</span> |{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                </p>
            </header>

            <div className="text-gray-700 text-lg leading-relaxed">
                <p>{post.content}</p>
            </div>

            <footer className="mt-8 border-t pt-4">
                <div className="text-sm text-gray-500">Posted on {new Date(post.createdAt).toLocaleDateString()}</div>
            </footer>

            <div className="mt-6 flex justify-between">
                <Link
                    to="/posts"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Back to Posts
                </Link>

                <div className="flex gap-4">
                    <Link
                        to={`/posts/${post.id}/edit`}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                        Edit Post
                    </Link>

                    {/* Form for deleting the post */}
                    <Form method="post">
                        <input type="hidden" name="_action" value="delete" />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => confirm("Are you sure you want to delete this post?")}
                        >
                            Delete Post
                        </button>
                    </Form>
                </div>
            </div>

        </div>
    );
}

export default PostItem;

// ErrorBoundary component to catch errors during post loading
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