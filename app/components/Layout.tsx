// app/components/Layout.tsx
import { Link } from "@remix-run/react";

type LayoutProps = {
    children: React.ReactNode;
    authStatus: boolean;
};

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-blue-900 text-white p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold">My Remix Blog</Link>
                    <ul className="flex space-x-4">
                        <li><Link to="/posts" className="hover:text-gray-300">Posts</Link></li>
                        <li><Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link></li>
                        <li><Link to="/logout" className="hover:text-gray-300">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1 container mx-auto p-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 mt-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 My Remix Blog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

function UnauthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-gray-900 text-white p-4 shadow-md">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold">My Remix Blog</Link>
                    <ul className="flex space-x-4">
                        <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
                        <li><Link to="/signup" className="hover:text-gray-300">Signup</Link></li>
                    </ul>
                </div>
            </nav>
            <main className="flex-1 container mx-auto p-6">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 mt-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 My Remix Blog. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default function Layout({ children, authStatus }: LayoutProps) {
    return authStatus ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
    ) : (
        <UnauthenticatedLayout>{children}</UnauthenticatedLayout>
    );
}
