import MainLayout from "~/routes";
import AuthLayout from "~/routes/auth";

// This is just a mock function. Replace it with real authentication logic.
const isAuthenticated = () => {
    // Logic to determine if user is authenticated
    return true; // Mock example; replace with your auth logic
};

export default function Layout() {

    return isAuthenticated() ? (
        <MainLayout />
    ) : (
        <AuthLayout />
    );
}
