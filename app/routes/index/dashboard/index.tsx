import { json, LoaderFunction } from "@remix-run/node";
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "@remix-run/react";
import { formatDistanceToNow } from "date-fns";
import random from "lodash/random";
import { FaEye } from "react-icons/fa";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

type User = {
    id: number;
    name: string;
    email: string;
    posts: number;
    signUpDate: string;
    rewards: number;
    stars: number;
};

// Mock user data generator
function generateRandomUsers(count: number) {
    const users: User[] = [];
    for (let i = 0; i < count; i++) {
        users.push({
            id: i + 1,
            name: `User ${i + 1}`,
            email: `user${i + 1}@example.com`,
            posts: random(1, 20),
            signUpDate: new Date(2022, random(0, 11), random(1, 28)).toLocaleDateString(),
            rewards: random(1, 5),
            stars: random(1, 5),
        });
    }
    return users;
}

// Loader for fetching mock data
export const loader: LoaderFunction = async () => {
    const users = generateRandomUsers(10); // Generate 10 users
    const activityData = Array.from({ length: 12 }, (_, index) => ({
        month: new Date(0, index).toLocaleString("default", { month: "short" }),
        posts: random(10, 100),
    }));

    const activityLevels = Array.from({ length: 10 }, (_, index) => ({
        user: `User ${index + 1}`,
        activity: random(1, 10),
    }));

    // Mock topic post data
    const topicData = [
        { topic: "React", posts: random(10, 50) },
        { topic: "JavaScript", posts: random(10, 50) },
        { topic: "Remix", posts: random(10, 50) },
        { topic: "TypeScript", posts: random(10, 50) },
        { topic: "GraphQL", posts: random(10, 50) },
    ];

    return json({ users, activityData, activityLevels, topicData });
};

// Dashboard Component
export default function Dashboard() {
    const { users, activityData, activityLevels, topicData } = useLoaderData<typeof loader>();

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4563"];

    return (
        <div className="p-8 space-y-8">

            {/* User Info Table */}
            <div className="overflow-auto">
                <h1 className="text-3xl font-semibold mb-6">Users Dashboard</h1>

                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-200">Name</th>
                            <th className="py-2 px-4 bg-gray-200">Email</th>
                            <th className="py-2 px-4 bg-gray-200">Posts</th>
                            <th className="py-2 px-4 bg-gray-200">Days Present</th> {/* Updated */}
                            <th className="py-2 px-4 bg-gray-200">Rewards</th>
                            <th className="py-2 px-4 bg-gray-200">Stars</th>
                            <th className="py-2 px-4 bg-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: User) => (
                            <tr key={user.id} className="border-b">
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.posts}</td>
                                <td className="py-2 px-4">
                                    {formatDistanceToNow(new Date(user.signUpDate), { addSuffix: false })} {/* Days present */}
                                </td>
                                <td className="py-2 px-4">{user.rewards}</td>
                                <td className="py-2 px-4">{user.stars}</td>
                                <td className="py-2 px-4">
                                    <Link to={`/user/posts/${user.id}`} className="text-blue-500 hover:text-blue-700">
                                        <FaEye className="inline mr-2" />
                                        View Posts
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Monthly Post Activity - Line Chart */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Monthly Post Activity</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={activityData}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="posts" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* User Activity Levels - Bar Chart */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">User Activity Levels</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={activityLevels}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                        <XAxis dataKey="user" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="activity" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Most Posted Topics - Bar Chart */}
            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Most Posted Topics</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topicData}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
                        <XAxis dataKey="topic" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#FF8042">
                            {topicData.map((_: never, index: number) => (
                                <Cell key={COLORS[index]} fill={COLORS[index]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <div>
                <h1>{error.status}</h1>
                <p>{error.statusText}</p>
            </div>
        );
    }

    if (error instanceof Error) {
        return (
            <div>
                <h1>Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        );
    }

    return <h1>Unknown error occurred</h1>;
}
