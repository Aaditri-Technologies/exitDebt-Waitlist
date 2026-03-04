-- ══════════════════════════════════════════════════════════════
-- ExitDebt Waitlist — Database Migration
-- Run this against your PostgreSQL database (RDS / local).
-- Safe to run multiple times (IF NOT EXISTS on everything).
-- ══════════════════════════════════════════════════════════════

-- ── Waitlist Table ──
CREATE TABLE IF NOT EXISTS waitlist (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  mobile      VARCHAR(15)  NOT NULL,
  place       VARCHAR(100) NOT NULL,
  state       VARCHAR(50)  DEFAULT 'Other',
  total_debt  NUMERIC(15,2) NOT NULL,
  archived    BOOLEAN      DEFAULT FALSE,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_mobile   ON waitlist(mobile);
CREATE INDEX IF NOT EXISTS idx_waitlist_created  ON waitlist(created_at);
CREATE INDEX IF NOT EXISTS idx_waitlist_state    ON waitlist(state);
CREATE INDEX IF NOT EXISTS idx_waitlist_archived ON waitlist(archived);

-- ── Rate Limiting ──
-- Per-key request counts for PostgreSQL-backed rate limiting.
-- Required for serverless (in-memory storage resets on cold start).
CREATE TABLE IF NOT EXISTS rate_limits (
  key        VARCHAR(255) PRIMARY KEY,
  count      INTEGER      NOT NULL DEFAULT 1,
  reset_at   BIGINT       NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_reset ON rate_limits(reset_at);
