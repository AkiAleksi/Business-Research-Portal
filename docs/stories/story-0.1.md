---
id: story-0.1
epic: epic-0
title: Project Initialization
status: pending
priority: 1
dependencies: []
covers: []
---

# Story 0.1: Project Initialization

## User Story

As a **developer**,
I want **a properly configured Next.js project with all dependencies**,
So that **I have a solid foundation to build the application**.

## Acceptance Criteria

**Given** a new development environment
**When** the project is initialized
**Then** the following are configured:
- Next.js 14+ with App Router
- TypeScript configuration
- Tailwind CSS setup
- ESLint and Prettier
- Environment variables template (.env.example)

**And** `npm run dev` starts the development server successfully
**And** `npm run build` completes without errors

## Technical Notes

- Use `create-next-app` with `--typescript --tailwind --app --src-dir`
- Install: `@copilotkit/react-core`, `@copilotkit/react-ui`, `@copilotkit/runtime`
- Install: `lucide-react`, `next-auth`

## Tasks

- [ ] Run create-next-app with correct flags
- [ ] Install CopilotKit packages
- [ ] Install lucide-react and next-auth
- [ ] Create .env.example template
- [ ] Verify npm run dev works
- [ ] Verify npm run build works
