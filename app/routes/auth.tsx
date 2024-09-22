import { Outlet } from "@remix-run/react";
import Login from "./auth/login";

function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div>
                <Login />
                <Outlet />
            </div>

            <footer className="absolute bottom-4 text-center text-sm text-white">
                <p>© {new Date().getFullYear()} My Remix Blog. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default AuthLayout;
