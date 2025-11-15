# PHARMIFY — Two-Mode Pharmacy Marketplace

## Short Description

Pharmify is a production-grade pharmacy marketplace that supports two distinct order flows:

1. **Order from Nearby Store** — fast delivery from pharmacies physically close to the user
2. **Order from Cheapest Pharmacy** — cross-store price aggregation to deliver the lowest total cost

## Key Goals

- Trust & compliance for prescription-driven purchases
- Fast, accurate search & typeahead
- Delightful micro-interactions and motion system that communicates trust
- Extensible partner dashboards for pharmacies
- Scalable architecture for price comparison and routing

## Tech Stack

### Monorepo
- **pnpm workspaces**

### Frontend (`apps/web`)
- Next.js (app router) + TypeScript
- Tailwind CSS + Tailwind Forms
- Framer Motion for page transitions
- TanStack Query (react-query) for server state
- react-lottie-player for Lottie animations
- Mapbox GL JS for maps / tracking
- Algolia for search (fallback: Elasticsearch)
- NextAuth for auth, supporting email & OAuth

### Backend (`apps/api`)
- NestJS (TypeScript)
- REST API (simpler for external partner integrations)
- Prisma ORM with PostgreSQL
- Redis for caching & sessions
- BullMQ for background jobs (order routing, notifications)
- AWS S3 for file storage (prescriptions)
- Stripe / Razorpay for payments
- Tesseract or Google Cloud Vision for OCR (optional feature)
- Sentry for error tracking

### Dev & Infra
- GitHub Actions CI
- Docker for local dev
- Vercel for frontend hosting
- AWS ECS/Fargate for backend
- AWS RDS (Postgres)

## Project Structure

```
/pharmify
├─ apps/
│  ├─ web/              # Next.js frontend
│  └─ api/              # NestJS backend
├─ packages/
│  ├─ ui/               # Shared React components, design tokens
│  ├─ db/               # Prisma schema & migrations
│  ├─ auth/             # Shared auth types / hooks
│  └─ lib/              # Shared utilities, validators, constants
├─ infra/               # Terraform / CloudFormation
└─ scripts/             # Dev scripts (seed, format, lint)
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL (local or remote)
- Redis (for sessions and caching)

### Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   # Copy example files
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   ```
   
   Fill in the required values:
   - `DATABASE_URL` - PostgreSQL connection string
   - `REDIS_URL` - Redis connection string
   - `NEXTAUTH_SECRET` - Random secret for NextAuth
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
   - `ALGOLIA_APP_ID` & `ALGOLIA_API_KEY` - For search
   - `MAPBOX_TOKEN` - For maps
   - `AWS_S3_BUCKET` & AWS credentials - For prescription storage
   - `STRIPE_SECRET_KEY` or `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` - For payments

3. **Set up database:**
   ```bash
   pnpm db:generate
   pnpm db:migrate
   pnpm db:seed
   ```

4. **Start development servers:**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually
   pnpm dev:web    # Frontend on http://localhost:3000
   pnpm dev:api    # Backend on http://localhost:4000
   ```

5. **Open the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)
   - Prisma Studio: Run `pnpm db:studio` to view/edit database

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm dev:web` - Start only frontend
- `pnpm dev:api` - Start only backend
- `pnpm build` - Build all apps
- `pnpm lint` - Lint all packages
- `pnpm format` - Format code with Prettier
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run database migrations
- `pnpm db:seed` - Seed database with sample data
- `pnpm db:studio` - Open Prisma Studio

## Core Features

### MVP Features
- ✅ Search + typeahead with fuzzy matching
- ✅ Product pages with details, dosage, alternatives
- ✅ Two ordering flows: Nearby vs Cheapest
- ✅ Cart & checkout with prescription upload
- ✅ User accounts with order history
- ✅ Real-time order tracking
- ✅ Basic partner dashboard for inventory

### V1 Features (Planned)
- Real-time courier tracking + map
- OCR for prescriptions
- Advanced routing (rules: cheapest within X km)
- PWA + push notifications

### V2 Features (Planned)
- Insurance handling
- Subscription refills
- Teleconsult integration

## Security & Compliance

- HTTPS everywhere (TLS)
- Encrypt prescription files in S3 (server-side + access controls)
- Minimal retention policy for prescription files (configurable)
- Access logs for prescription views
- Partner KYC flows
- Rate-limits and bot-protection on search & auth
- Input validation + server-side dosage checks
- GDPR/Local data protection considerations

## Animation & Motion System

See [MOTION.md](./MOTION.md) for detailed animation specifications and [packages/ui/DESIGN_TOKENS.md](./packages/ui/DESIGN_TOKENS.md) for design tokens.

## API Documentation

The backend API follows REST conventions. Key endpoints:

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/products?q=` - Search products with typeahead
- `GET /api/products/:id` - Get product details
- `GET /api/products/:id/price-comparison` - Price comparison across pharmacies
- `GET /api/pharmacies?lat=&lng=&radius=` - Find nearby pharmacies
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order details
- `POST /api/prescriptions` - Upload prescription

See OpenAPI spec (coming soon) for complete documentation.

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint` and `pnpm format`
4. Submit a pull request

### Commit Message Conventions

- `feat:` - New feature
- `fix:` - Bug fix
- `chore:` - Tooling, dependencies
- `docs:` - Documentation
- `perf:` - Performance improvements
- `style:` - Formatting, no code change
- `refactor:` - Code changes without feature/bug

## License

Proprietary - All rights reserved

# pharmacure
