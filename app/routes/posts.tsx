import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

// Define the Post type
type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
};

// Loader function to fetch data
export const loader = async () => {
    const data = {
        posts: await db.post.findMany({
            take: 20,
            select: { id: true, author: true, title: true, content: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        })
    }

    return data; // Return the posts data
};

// Component to display post items
function PostItems() {
    const { posts } = useLoaderData<{ posts: Post[] }>(); // Access the data loaded by the loader

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Link to={"new"}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        New Post
                    </button>
                </Link>
            </div>
            <div className="space-y-6">
                {posts.map((post) => (
                    <article key={post.id} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                        <Link to={`/posts/${post.id}`} className="block mb-4">
                            <h3 className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">{post.title}</h3>
                        </Link>
                        <p className="text-gray-800 mb-3">{post.content}</p>
                        <div className="flex items-center">
                            <span className="text-gray-600">Author: {post.author}</span>
                        </div>
                        {new Date(post.createdAt).toLocaleString()}
                    </article>
                ))}
            </div>
            {/* <Outlet /> */}
        </div>
    );
}

export default PostItems;
