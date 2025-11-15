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

