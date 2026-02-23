# ExitDebt Waitlist

A waitlist landing page for **ExitDebt** — India's smartest debt management platform. Collects user information and stores it in PostgreSQL.

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **PostgreSQL 16** via `pg`
- **Tailwind CSS v4**

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with CTA |
| `/waitlist` | Waitlist form (Name, Mobile, Place, Total Debt) |
| `/admin/waitlist` | Admin dashboard — manage submissions |

## Admin Dashboard

The admin dashboard includes:

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
  "place": "Mumbai",
  "totalDebt": 500000
}
```

| Status | Meaning |
|---|---|
| `201` | Created successfully |
| `400` | Validation error |
| `409` | Duplicate mobile (24h window) |
| `429` | Rate limited (15 req / 15 min per IP) |

### `GET /api/admin/waitlist`

Fetch all submissions. Requires `x-admin-secret` header.

```bash
curl -H "x-admin-secret: YOUR_SECRET" http://localhost:3000/api/admin/waitlist
```

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
# Edit .env.local with your DATABASE_URL and ADMIN_SECRET

# 3. Create database and run migration
createdb exitdebt
psql -d exitdebt -f migrate.sql

# 4. Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=postgresql://username@localhost:5432/exitdebt
ADMIN_SECRET=your-strong-secret-here   # minimum 8 characters
```

## Security

| Feature | Details |
|---|---|
| **Rate Limiting** | 15 submissions / 15 min per IP; 10 admin attempts / 15 min |
| **Input Sanitization** | HTML entities escaped to prevent stored XSS |
| **SQL Injection** | Parameterized queries via `pg` |
| **Timing-Safe Auth** | Admin secret compared with `crypto.timingSafeEqual` |
| **Duplicate Prevention** | Same mobile blocked within 24-hour window |
| **Debt Capping** | Max ₹100 crore to prevent numeric overflow |
| **Security Headers** | CSP, X-Frame-Options, HSTS, X-Content-Type-Options |
| **Secrets** | `.env*` gitignored — never committed |

## Database Schema

```sql
CREATE TABLE waitlist (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  mobile      VARCHAR(15) NOT NULL,
  place       VARCHAR(100) NOT NULL,
  state       VARCHAR(50) DEFAULT 'Other',
  total_debt  NUMERIC(12,2) NOT NULL,
  archived    BOOLEAN DEFAULT false,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design tokens
│   ├── waitlist/page.tsx           # Waitlist form
│   ├── admin/waitlist/page.tsx     # Admin dashboard
│   └── api/
│       ├── waitlist/route.ts       # POST — submit entry
│       └── admin/waitlist/route.ts # GET, PATCH, DELETE — admin
├── components/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── db.ts                       # PostgreSQL pool
│   ├── rate-limit.ts               # In-memory rate limiter
│   ├── sanitize.ts                 # Input sanitization
│   └── city-state.ts               # City → State mapping
└── proxy.ts                        # Security headers
```

## Deployment

Optimized for **Vercel**:

```bash
npm run build
npx vercel
```

> **Note:** For production, use a managed PostgreSQL service and consider Redis-backed rate limiting for multi-instance deployments.

## License

Proprietary — Aaditri Technologies Pvt. Ltd.
