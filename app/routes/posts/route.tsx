import { Link, useLoaderData } from "@remix-run/react";

// Define the Post type
type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
};

// Loader function to fetch data
export const loader = () => {
    const posts: Post[] = [
        {
            id: 1,
            title: "Getting Started with Remix",
            content: "This post will guide you through the basics of Remix.",
            author: "John Doe",
        },
        {
            id: 2,
            title: "Advanced Remix Techniques",
            content: "Explore advanced techniques for building Remix apps.",
            author: "Jane Smith",
        },
        {
            id: 3,
            title: "Using Tailwind CSS in Remix",
            content: "Learn how to integrate Tailwind CSS with Remix to style your apps.",
            author: "Alex Johnson",
        },
    ];

    return { posts }; // Return the posts data
};

// Component to display post items
function PostItems() {
    const { posts } = useLoaderData<{ posts: Post[] }>(); // Access the data loaded by the loader

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Link to="/posts/new">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        New Post
                    </button>
                </Link>
            </div>
            <div className="space-y-4">
                {posts.map((post) => (
                    <article key={post.id} className="p-4 bg-white rounded shadow">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-700 mb-2">{post.content}</p>
                        <span className="text-gray-500">Author: {post.author}</span>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default PostItems;
