# Quick Start Guide

Get Pharmify up and running in 5 minutes.

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL (local or remote)
- Redis (optional, for sessions and caching)

## Installation

1. **Clone and install:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   # Frontend
   cp apps/web/.env.example apps/web/.env.local
   
   # Backend
   cp apps/api/.env.example apps/api/.env
   ```

3. **Configure database:**
   Edit `apps/api/.env` and set your `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/pharmify?schema=public"
   ```

4. **Set up database:**
   ```bash
   # Generate Prisma client
   pnpm db:generate
   
   # Run migrations
   pnpm db:migrate
   
   # Seed with sample data
   pnpm db:seed
   ```

5. **Start development servers:**
   ```bash
   # Start both frontend and backend
   pnpm dev
   
   # Or start individually:
   pnpm dev:web    # Frontend: http://localhost:3000
   pnpm dev:api    # Backend: http://localhost:4000/api
   ```

6. **Open the app:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000/api](http://localhost:4000/api)
   - Health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)

## Testing the API

```bash
# Health check
curl http://localhost:4000/api/health

# Search products
curl "http://localhost:4000/api/products?q=paracetamol"

# Get nearby pharmacies
curl "http://localhost:4000/api/pharmacies?lat=19.0760&lng=72.8777&radius=10"
```

## Project Structure

```
pharmify/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── packages/
│   ├── ui/           # Shared components & design tokens
│   ├── db/           # Prisma schema & migrations
│   ├── auth/         # Auth types & utilities
│   └── lib/          # Shared utilities & validators
└── scripts/          # Development scripts
```

## Common Commands

```bash
# Development
pnpm dev              # Start all apps
pnpm dev:web          # Start frontend only
pnpm dev:api          # Start backend only

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio

# Code quality
pnpm lint             # Lint all packages
pnpm format           # Format code
pnpm type-check       # Type check all packages

# Build
pnpm build            # Build all apps
```

## Troubleshooting

### Database connection errors
- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `apps/api/.env`
- Verify database exists: `createdb pharmify`

### Port already in use
- Change ports in `.env` files
- Frontend: `PORT=3001` in `apps/web/.env.local`
- Backend: `PORT=4001` in `apps/api/.env`

### Prisma client not found
- Run `pnpm db:generate`
- Ensure `packages/db` is built

## Next Steps

1. Read [README.md](./README.md) for full documentation
2. Check [MOTION.md](./MOTION.md) for animation specs
3. Review [packages/ui/DESIGN_TOKENS.md](./packages/ui/DESIGN_TOKENS.md) for design system

## Need Help?

- Check the main [README.md](./README.md)
- Review the API endpoints in `apps/api/src/modules/`
- See example components in `apps/web/src/app/`

