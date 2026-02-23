-- ExitDebt Waitlist Table Migration
-- Run this against your PostgreSQL database before using the waitlist API.

CREATE TABLE IF NOT EXISTS waitlist (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  mobile      VARCHAR(15) NOT NULL,
  place       VARCHAR(100) NOT NULL,
  state       VARCHAR(50) DEFAULT 'Other',
  total_debt  NUMERIC(12,2) NOT NULL,
  archived    BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index on mobile for quick duplicate checks
CREATE INDEX IF NOT EXISTS idx_waitlist_mobile ON waitlist(mobile);

-- Index on state for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_state ON waitlist(state);

-- Index on archived for tab filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_archived ON waitlist(archived);
