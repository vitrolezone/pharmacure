# Copilot instructions for Pharmacure (pharmify)

This file gives AI coding agents concise, actionable guidance to be productive in this repository.

Project overview
- Monorepo managed with `pnpm` and workspaces. Top-level scripts in `package.json` use `pnpm -r` to run tasks across packages.
- Backend: NestJS app in `apps/api` (API uses a global prefix of `/api` and enables CORS in `apps/api/src/main.ts`).
- Frontend: Next.js app in `apps/web` (React + Tailwind + `@pharmify/ui`).
- Database: Prisma schema and client live in `packages/db` and are re-exported as `@pharmify/db` (used by the API and web packages).

Quick start (developer commands)
- Install deps: `pnpm install` (run from repo root).
- Start everything: `pnpm dev` (runs `pnpm -r --parallel dev`).
- Start API only: `pnpm dev:api` (runs `cd apps/api && pnpm start:dev`).
- Start Web only: `pnpm dev:web` (runs `cd apps/web && pnpm dev`).

Database and Prisma
- Prisma lives in `packages/db`. Use the package scripts in `package.json` root or from that package:
  - Generate client: `pnpm db:generate` (root) or `pnpm --filter @pharmify/db db:generate`.
  - Run migrations: `pnpm db:migrate` (root) — this runs `prisma migrate dev` in `packages/db`.
  - Seed data: `pnpm db:seed` (root) runs `packages/db/seed.ts` via `tsx`.
  - Open Studio: `pnpm db:studio`.

Important env vars
- `DATABASE_URL`: PostgreSQL connection used by Prisma (`packages/db/prisma/schema.prisma`).
- `FRONTEND_URL`: allowed origin used by the API CORS config (`apps/api/src/main.ts`).
- `PORT`: API server port (defaults to `4000`).

Monorepo and package patterns
- Packages use `workspace:*` dependencies (e.g., `@pharmify/db`) so changes in workspace packages are linked locally.
- Use `pnpm -r`, `pnpm -w`, or `pnpm --filter` to target packages precisely when building/testing.

Backend patterns (NestJS)
- API modules live under `apps/api/src/modules/*`. Each module typically exports a `Controller` and a `Service`.
- The code uses `prisma` via the exported `prisma` instance from `@pharmify/db` (`packages/db/src/index.ts`) — import as `import { prisma } from '@pharmify/db'`.
- Global validation is applied in `apps/api/src/main.ts` with `ValidationPipe` and the global route prefix `api` is set there.
- Tests: run `pnpm --filter @pharmify/api test` or `pnpm -r test` from root.

Frontend patterns (Next.js)
- The Next app imports shared UI tokens/components from `@pharmify/ui`.
- `apps/web` uses Next 14 and `next-auth` for auth flows; server components are possible — look at `apps/web/src/app` for routing and layout patterns.

Conventions and expectations for AI agents
- Keep changes minimal and local to the package unless a cross-cutting change is necessary (update shared package versions or types in `packages/*`).
- When modifying API endpoints, update the corresponding module in `apps/api/src/modules/<name>` and ensure Prisma queries use the `prisma` instance exported from `@pharmify/db`.
- Follow existing code style: Prettier + ESLint are configured; prefer the repo's formatting (run `pnpm format` and `pnpm lint`).
- For DB schema changes, update `packages/db/prisma/schema.prisma`, then run `pnpm db:migrate` and `pnpm db:generate`. Add/adjust seed data in `packages/db/seed.ts` if necessary.

Useful file references
- Root package.json: repository scripts and engines (`node>=18`, `pnpm>=8`).
- `apps/api/src/main.ts`: CORS, validation, global prefix, server port.
- `apps/api/src/app.module.ts` and `apps/api/src/modules/*`: module layout and DI patterns.
- `packages/db/src/index.ts`: Prisma client singleton pattern and how services import `prisma`.
- `packages/db/prisma/schema.prisma`: canonical data model and relations — use it to understand data shapes.

When in doubt
- Run `pnpm dev` to reproduce locally; use `pnpm db:studio` to inspect DB contents.
- Prefer making focused pull requests with a single responsibility and include migration steps when DB schema changes.

Please review and tell me if you'd like additional project-specific snippets (e.g., examples of typical PR descriptions, local debug tips, or common quick fixes to test failures).
