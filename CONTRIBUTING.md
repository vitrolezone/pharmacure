# Contributing to Pharmify

Thank you for your interest in contributing to Pharmify! This document provides guidelines and instructions for contributing.

## Development Setup

1. Follow the [Quick Start Guide](./QUICKSTART.md) to set up your development environment
2. Make sure all tests pass: `pnpm test` (when tests are added)
3. Ensure code is properly formatted: `pnpm format`
4. Run linting: `pnpm lint`

## Code Style

- Use TypeScript for all new code
- Follow the existing code style (enforced by Prettier)
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

## Commit Messages

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add price comparison animation to product cards
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all checks pass (lint, type-check, tests)
4. Update documentation if needed
5. Submit a pull request with a clear description

## Project Structure

- `apps/web/` - Next.js frontend application
- `apps/api/` - NestJS backend API
- `packages/ui/` - Shared UI components and design tokens
- `packages/db/` - Prisma schema and database utilities
- `packages/auth/` - Authentication types and utilities
- `packages/lib/` - Shared utilities and validators

## Animation Guidelines

When adding animations, refer to [MOTION.md](./MOTION.md) for:
- Duration guidelines
- Easing functions
- Accessibility considerations
- Performance best practices

## Design System

Follow the design tokens in `packages/ui/`:
- Use Tailwind classes when possible
- Import design tokens for programmatic use
- Maintain consistency with existing components

## Database Changes

When modifying the database schema:
1. Update `packages/db/prisma/schema.prisma`
2. Create a migration: `pnpm db:migrate`
3. Update seed script if needed
4. Test migrations on a fresh database

## API Changes

- Follow REST conventions
- Add validation using class-validator
- Document endpoints (consider OpenAPI/Swagger)
- Update API documentation

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage

## Questions?

Feel free to open an issue for questions or discussions about the project.

