import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

// Type for form data
type PostErrors = {
    title?: string;
    content?: string;
    author?: string;
};

// Action function to handle form submission
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get("title") as string | null;
    const content = formData.get("content") as string | null;
    const author = formData.get("author") as string | null;

    // Simple validation
    const errors: PostErrors = {};
    if (!title) errors.title = "Title is required";
    if (!content) errors.content = "Content is required";
    if (!author) errors.author = "Author is required";

    // If there are validation errors, return them to the form
    if (Object.keys(errors).length > 0) {
        return json({ errors }, { status: 400 });
    }

    // Example: You could save the post to a database here
    // savePostToDatabase({ title, content, author });

    // Redirect to the posts list after successful submission
    return redirect("/posts");
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
