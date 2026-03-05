import { Pool } from "pg";

/**
 * PostgreSQL connection pool.
 * Uses DATABASE_URL from environment variables.
 *
 * In development, the pool is cached on `globalThis` to survive Next.js
 * hot-reloads without exhausting database connections.
 * In production (Vercel serverless), the module-level singleton is sufficient.
 */

const globalForPg = globalThis as unknown as { pgPool: Pool | undefined };

function createPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
    ssl: (process.env.DB_REQUIRE_SSL ?? (process.env.NODE_ENV === "production" ? "true" : "false")) === "true"
      ? { rejectUnauthorized: false }
      : undefined,
  });
}

let pool: Pool | undefined = globalForPg.pgPool;

export function getPool(): Pool {
  if (!pool) {
    pool = createPool();
    if (process.env.NODE_ENV !== "production") {
      globalForPg.pgPool = pool;
    }
  }
  return pool;
}
