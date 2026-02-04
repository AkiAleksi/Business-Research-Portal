---
id: story-1.1
epic: epic-1
title: NextAuth.js Setup with Google OAuth
status: completed
priority: 3
dependencies: [story-0.1]
covers: [FR13]
---

# Story 1.1: NextAuth.js Setup with Google OAuth

## User Story

As a **user**,
I want **to sign in with my Google account**,
So that **I can quickly access the application without creating a new password**.

## Acceptance Criteria

**Given** an unauthenticated user
**When** they click "Sign in with Google"
**Then** they are redirected to Google OAuth
**And** after successful authentication, they are redirected back to the app
**And** their session is created with JWT
**And** the session persists across page refreshes

**Given** an authenticated user
**When** they visit the app
**Then** they see their profile info (name, avatar)

## Technical Notes

- Configure NextAuth.js in `src/lib/auth.ts`
- Create `src/app/api/auth/[...nextauth]/route.ts`
- Environment variables: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`

## Tasks

- [x] Create auth configuration in src/lib/auth.ts
- [x] Create NextAuth API route
- [x] Configure Google OAuth provider
- [x] Configure JWT session strategy
- [x] Add auth environment variables to .env.example
- [ ] Test Google sign-in flow (requires Google OAuth credentials)
