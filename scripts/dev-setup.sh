#!/usr/bin/env bash
set -euo pipefail

# dev-setup.sh — automated dev environment bootstrap for Pharmacure
# - Starts Postgres via Homebrew (if available)
# - Creates DB role and database (idempotent)
# - Runs Prisma migrate and seed
# - Starts API and Web dev servers in background (logs to /tmp)

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
echo "Root: $ROOT_DIR"

function command_exists() { command -v "$1" >/dev/null 2>&1; }

cd "$ROOT_DIR"

echo "1) Ensure pnpm available (using npx pnpm if not installed)"
if command_exists pnpm; then
  PNPM_CMD="pnpm"
else
  PNPM_CMD="npx --yes pnpm@latest"
fi

echo "2) Ensure Postgres is running (Homebrew)"
if command_exists brew; then
  if ! pgrep -x "postgres" >/dev/null 2>&1; then
    echo "Starting postgresql@14 via brew services..."
    brew services start postgresql@14 || true
  else
    echo "Postgres appears to be running"
  fi
else
  echo "Homebrew not found — ensure a Postgres instance is available and set DATABASE_URL"
fi

echo "3) Create DB role & database (idempotent)"
psql_cmd="psql -d postgres -c"
${psql_cmd} "CREATE ROLE pharmify WITH LOGIN PASSWORD 'pharmify';" || true
${psql_cmd} "ALTER ROLE pharmify CREATEDB;" || true
${psql_cmd} "CREATE DATABASE pharmify OWNER pharmify;" || true

echo "4) Write local API .env"
mkdir -p apps/api
cat > apps/api/.env <<'EOF'
DATABASE_URL="postgresql://pharmify:pharmify@localhost:5432/pharmify"
FRONTEND_URL="http://localhost:3001"
PORT=4000
EOF

echo "5) Install workspace dependencies (fast check)"
${PNPM_CMD} install --no-frozen-lockfile || true

echo "6) Generate Prisma client & migrate"
pushd packages/db >/dev/null
export DATABASE_URL="postgresql://pharmify:pharmify@localhost:5432/pharmify"
if command_exists pnpm; then
  pnpm prisma generate
else
  npx --yes prisma generate
fi

if [ -d migrations ]; then
  echo "Migrations folder exists — running migrate dev"
fi

if command_exists pnpm; then
  pnpm prisma migrate dev --name init || true
else
  npx --yes prisma migrate dev --name init || true
fi

echo "Seeding DB"
if command_exists pnpm; then
  pnpm tsx seed.ts || npx --yes tsx seed.ts
else
  npx --yes tsx seed.ts
fi
popd >/dev/null

echo "7) Start API and Web dev servers in background"

echo "Starting API (ts-node) — logs -> /tmp/pharmify-api.log"
cd apps/api
nohup npx --yes ts-node -r tsconfig-paths/register src/main.ts > /tmp/pharmify-api.log 2>&1 &
API_PID=$!
echo "API PID: $API_PID"

echo "Starting Web (Next) on port 3001 — logs -> /tmp/pharmify-web.log"
cd ../web
nohup npx --yes next dev -p 3001 > /tmp/pharmify-web.log 2>&1 &
WEB_PID=$!
echo "Web PID: $WEB_PID"

echo "Setup complete. Check logs: /tmp/pharmify-api.log /tmp/pharmify-web.log"
echo "API: http://localhost:4000/api/health"
echo "Web: http://localhost:3001"

exit 0
#!/bin/bash

# Development setup script for Pharmify

set -e

echo "🚀 Setting up Pharmify development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check if PostgreSQL is running (optional check)
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client not found. Make sure PostgreSQL is installed and running."
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
pnpm db:generate

# Check for .env files
if [ ! -f "apps/web/.env.local" ]; then
    echo "⚠️  apps/web/.env.local not found. Copy from apps/web/.env.example"
fi

if [ ! -f "apps/api/.env" ]; then
    echo "⚠️  apps/api/.env not found. Copy from apps/api/.env.example"
fi

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your .env files (see .env.example files)"
echo "2. Run database migrations: pnpm db:migrate"
echo "3. Seed the database: pnpm db:seed"
echo "4. Start development servers: pnpm dev"

