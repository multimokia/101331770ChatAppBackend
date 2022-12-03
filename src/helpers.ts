import { API_SECRET } from "./server.js";
import jwt from "jsonwebtoken";

export type JwtValidationError = {
    status: number;
    message: string;
}

export type DecodedAuthToken = {
    id: number;
}

export function validateAndDecodeJWT<T>(token?: string): T {
    if (!token) {
        throw {status: 401, message: "Authentication is required to access this resource." };
    }

    try {
        return jwt.verify(token, API_SECRET!, {complete: true }).payload as T;
    }

    catch {
        throw {status: 401, message: "Invalid authentication token." };
    }
}
