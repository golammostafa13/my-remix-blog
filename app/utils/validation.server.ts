// app/utils/validation.server.ts

export function validateLogin(email: string | null, password: string | null) {
    const errors: { email?: string; password?: string } = {};

    if (!email?.includes("@")) {
        errors.email = "Invalid email address";
    }

    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return Object.keys(errors).length ? errors : null;
}

// app/utils/validation.server.ts

export function validateSignup(email: string | null, password: string | null, confirmPassword: string | null, name: string | null) {
    const errors: { email?: string; password?: string; confirmPassword?: string; name?: string } = {};

    if (!name || name.trim().length === 0) {
        errors.name = "Name is required";
    }

    if (!email?.includes("@")) {
        errors.email = "Invalid email address";
    }

    if (!password || password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return Object.keys(errors).length ? errors : null;
}
