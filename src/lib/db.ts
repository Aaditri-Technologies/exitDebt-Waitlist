import { Pool } from "pg";

/**
 * PostgreSQL connection pool.
 * Uses DATABASE_URL from environment variables.
 * The pool is created once and reused across requests (serverless-safe singleton).
 */

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}
