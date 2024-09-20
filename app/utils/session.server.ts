// app/utils/session.server.ts
import { Session, SessionData, createCookieSessionStorage } from "@remix-run/node";

// Create session storage
const sessionSecret = process.env.SESSION_SECRET ?? "default-secret"; // Ensure this is set in your environment
const storage = createCookieSessionStorage({
    cookie: {
        name: "session",
        secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "lax",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        secrets: [sessionSecret],
    },
});

// Function to get session
export async function getSession(request: Request) {
    const session = await storage.getSession(request.headers.get("Cookie"));
    return session;
}

// Function to commit session
export async function commitSession(session: Session<SessionData, SessionData>) {
    return storage.commitSession(session);
}

// Function to destroy session
export async function destroySession(session: Session<SessionData, SessionData>) {
    return storage.destroySession(session);
}
