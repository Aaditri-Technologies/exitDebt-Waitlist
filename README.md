# ExitDebt Waitlist

A waitlist landing page for **ExitDebt** — India's smartest debt management platform. Collects user information and stores it in PostgreSQL.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **PostgreSQL 16** via `pg`
- **Tailwind CSS v4**
- **iron-session** — encrypted cookie-based admin sessions

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with CTA |
| `/waitlist` | Waitlist form (Name, Mobile, Place, Total Debt) |
| `/admin/waitlist` | Admin dashboard — manage submissions |

## Admin Dashboard

The admin dashboard includes:

- **Cookie-based authentication** — secure, encrypted HTTP-only session cookies via `iron-session`
- **Active / Archived tabs** — toggle between current and archived submissions
- **Filters** — filter by Place (city) and Total Debt range (min / max)
- **Print** — generate a formatted, print-ready page of visible entries
- **Refresh** — manually reload data (also auto-refreshes every 30s)
- **Archive / Restore** — soft-archive entries without deleting
- **Delete** — permanently remove entries with a confirmation dialog

## API Endpoints

### `POST /api/waitlist`

Submit a waitlist entry.

```json
{
  "name": "Rahul Sharma",
  "mobile": "9876543210",
  "place": "Surat",
  "totalDebt": 500000
}
```

| Status | Meaning |
|---|---|
| `201` | Created successfully |
| `400` | Validation error |
| `409` | Duplicate mobile (24h window) |
| `429` | Rate limited (15 req / 15 min per IP) |

### `POST /api/admin/login`

Authenticate and receive a session cookie.

```json
{ "secret": "your-admin-secret" }
```

### `GET /api/admin/waitlist`

Fetch all submissions. Requires valid session cookie (login first).

### `PATCH /api/admin/waitlist`

Archive or restore an entry.

```json
{ "id": 1, "archived": true }
```

### `DELETE /api/admin/waitlist`

Permanently delete an entry.

```json
{ "id": 1 }
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 16+

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Edit .env.local with your DATABASE_URL, ADMIN_SECRET, and SESSION_SECRET

# 3. Create database and run migration
createdb exitdebt
psql -d exitdebt -f migrate.sql

# 4. Start development server
npm run dev

# 5. Run tests
npm test
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://username@localhost:5432/exitdebt
ADMIN_SECRET=your-strong-secret-here        # minimum 8 characters
SESSION_SECRET=your-32-char-session-secret   # minimum 32 characters (openssl rand -hex 16)
```

## Security

| Feature | Details |
|---|---|
| **Rate Limiting** | PostgreSQL-backed — works across serverless invocations. 15 submissions / 15 min per IP; 10 admin login attempts / 15 min |
| **Bot Protection** | Honeypot field + minimum form submission time check |
| **Cookie Auth** | Admin sessions use `iron-session` encrypted HTTP-only cookies |
| **Input Sanitization** | HTML entities escaped to prevent stored XSS |
| **SQL Injection** | Parameterized queries via `pg` |
| **Timing-Safe Auth** | Admin secret compared with `crypto.timingSafeEqual` |
| **Duplicate Prevention** | Same mobile blocked within 24-hour window |
| **Debt Capping** | Max ₹100 crore to prevent numeric overflow |
| **Security Headers** | CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Permissions-Policy |
| **Secrets** | `.env*` gitignored — never committed |

## Database Schema

```sql
CREATE TABLE waitlist (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  mobile      VARCHAR(15) NOT NULL,
  place       VARCHAR(100) NOT NULL,
  state       VARCHAR(50) DEFAULT 'Other',
  total_debt  NUMERIC(20,2) NOT NULL,
  archived    BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rate_limits (
  key       VARCHAR(255) PRIMARY KEY,
  count     INTEGER NOT NULL DEFAULT 0,
  reset_at  BIGINT NOT NULL
);
```

## Testing

The project includes a comprehensive test suite using **Vitest**. Run all tests with:

```bash
npm test
```

| Test File | Coverage |
|---|---|
| `sanitize.test.ts` | XSS prevention, debt clamping |
| `city-state.test.ts` | City-to-state mapping, case handling |
| `rate-limit.test.ts` | Rate limiting, DB failure fallback |
| `session.test.ts` | Session config, env validation |
| `color-scheme.test.ts` | Color consistency across all source files |
| `waitlist-api.test.ts` | Input validation, bot detection, IP extraction |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage (grid-based view transitions)
│   ├── layout.tsx                  # Root layout + SEO metadata + JSON-LD
│   ├── globals.css                 # Design tokens (teal color scheme)
│   ├── robots.ts                   # robots.txt (blocks /admin, /api)
│   ├── sitemap.ts                  # sitemap.xml for Google
│   ├── waitlist/page.tsx           # Waitlist form
│   ├── admin/waitlist/page.tsx     # Admin dashboard
│   ├── __tests__/
│   │   └── waitlist-api.test.ts    # API validation & bot detection tests
│   └── api/
│       ├── waitlist/route.ts       # POST — submit entry
│       └── admin/
│           ├── login/route.ts      # POST — admin login
│           ├── logout/route.ts     # POST — admin logout
│           └── waitlist/route.ts   # GET, PATCH, DELETE — admin
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HomeContent.tsx             # Hero section
│   ├── MarketingContent.tsx        # Features & CTA
│   ├── WaitlistContent.tsx         # Waitlist form with validation
│   └── CookieConsent.tsx           # Cookie consent banner
├── lib/
│   ├── db.ts                       # PostgreSQL pool (globalThis cached)
│   ├── rate-limit.ts               # PostgreSQL-backed rate limiter
│   ├── session.ts                  # iron-session config
│   ├── sanitize.ts                 # Input sanitization
│   ├── city-state.ts               # City → State mapping
│   └── __tests__/                  # Unit tests (sanitize, city-state, etc.)
└── proxy.ts                        # Security headers (Next.js 16 proxy)
```

## SEO & Crawlability

- **sitemap.xml** — auto-generated via `src/app/sitemap.ts`
- **robots.txt** — allows `/` and `/waitlist`, blocks `/admin/` and `/api/`
- **JSON-LD** — structured data for Google AI answers (WebApplication schema)
- **Open Graph + Twitter Cards** — rich link previews
- **Canonical URLs** — via `metadataBase`

## Deployment

Optimized for **Vercel + AWS RDS**:

```bash
npm run build
npx vercel
```

Set these environment variables in the Vercel dashboard:
- `DATABASE_URL` — your AWS RDS PostgreSQL connection string
- `ADMIN_SECRET` — strong random string (8+ chars)
- `SESSION_SECRET` — random 32+ char string

Then run `migrate.sql` against your production database.

## License

Proprietary — Aaditri GlobalTech Private Limited
