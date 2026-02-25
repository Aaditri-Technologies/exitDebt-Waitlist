import { SessionOptions } from "iron-session";

/**
 * Session configuration for admin authentication.
 * Uses iron-session to create encrypted, HTTP-only cookies.
 *
 * The SESSION_SECRET env var must be at least 32 characters.
 */

export interface SessionData {
  isAdmin: boolean;
}

function getSessionPassword(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET must be set and at least 32 characters in production.");
    }
    // Dev-only fallback — never used in production
    return "dev-only-fallback-secret-32chars!";
  }
  return secret;
}

export function getSessionOptions(): SessionOptions {
  return {
    password: getSessionPassword(),
    cookieName: "exitdebt_admin",
    ttl: 8 * 60 * 60, // 8 hours
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    },
  };
}
