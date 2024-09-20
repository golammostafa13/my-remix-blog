// app/utils/auth.server.ts
import bcrypt from "bcryptjs";
import { JWTPayload, jwtVerify, SignJWT } from 'jose';
import { env } from '~/utils/env.server';
import { getSession } from './session.server';

export async function signJwt(payload: JWTPayload) {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    return new SignJWT(payload)
        .setExpirationTime('1h')
        .sign(secret);
}

export async function verifyJwt(token: string) {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    try {
        const { payload } = await jwtVerify(token, secret);
        return payload;
    } catch {
        return null;
    }
}

// app/utils/auth.server.ts
export async function getAuthStatus(request: Request) {
    const session = await getSession(request);
    const userId = session.get("userId");

    // Check if the userId exists in the session
    return !!userId; // Return true if authenticated, false otherwise
}

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 10);
}
