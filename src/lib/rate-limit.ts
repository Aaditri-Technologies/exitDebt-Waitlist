import { getPool } from "./db";

/**
 * PostgreSQL-backed rate limiter for API routes.
 * Tracks requests by key (e.g., IP address) with a fixed window.
 *
 * Unlike an in-memory Map, this works correctly across Vercel serverless
 * function invocations since state is persisted in the database.
 *
 * Requires the `rate_limits` table (see migrate.sql).
 */

/**
 * Check if a request should be rate-limited.
 * @param key - Unique identifier (e.g., IP address or "admin:<ip>")
 * @param maxRequests - Max requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed, remaining, resetAt }
 */
export async function rateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const pool = getPool();
  const now = Date.now();
  const resetAt = now + windowMs;

  try {
    // Upsert: if the key exists and its window hasn't expired, increment.
    // If the key doesn't exist or the window expired, start a new window.
    const result = await pool.query(
      `INSERT INTO rate_limits (key, count, reset_at)
       VALUES ($1, 1, $2)
       ON CONFLICT (key) DO UPDATE
         SET count = CASE
           WHEN rate_limits.reset_at <= $3 THEN 1
           ELSE rate_limits.count + 1
         END,
         reset_at = CASE
           WHEN rate_limits.reset_at <= $3 THEN $2
           ELSE rate_limits.reset_at
         END
       RETURNING count, reset_at`,
      [key, resetAt, now]
    );

    const { count, reset_at: storedResetAt } = result.rows[0];
    const currentResetAt = Number(storedResetAt);

    if (count > maxRequests) {
      return { allowed: false, remaining: 0, resetAt: currentResetAt };
    }

    // Probabilistic cleanup: ~1% of requests trigger stale row deletion.
    // Fire-and-forget to avoid adding latency to the request.
    if (Math.random() < 0.01) {
      cleanupExpiredRateLimits().catch(() => { });
    }

    return {
      allowed: true,
      remaining: maxRequests - count,
      resetAt: currentResetAt,
    };
  } catch (error) {
    // If the rate_limits table doesn't exist or DB is unreachable,
    // fail open to avoid blocking all legitimate traffic.
    console.error("Rate limit check failed, allowing request:", error);
    return { allowed: true, remaining: maxRequests, resetAt };
  }
}

/**
 * Cleanup expired rate limit entries.
 * Call this periodically (e.g., via a cron job or after each request).
 */
export async function cleanupExpiredRateLimits(): Promise<void> {
  try {
    const pool = getPool();
    await pool.query("DELETE FROM rate_limits WHERE reset_at <= $1", [
      Date.now(),
    ]);
  } catch (error) {
    console.error("Rate limit cleanup failed:", error);
  }
}
