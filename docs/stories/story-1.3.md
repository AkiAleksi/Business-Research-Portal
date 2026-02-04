---
id: story-1.3
epic: epic-1
title: Session Management & Logout
status: completed
priority: 5
dependencies: [story-1.1, story-1.2]
covers: [FR14, FR15, NFR8]
---

# Story 1.3: Session Management & Logout

## User Story

As a **user**,
I want **to log out and manage my session**,
So that **I can secure my account**.

## Acceptance Criteria

**Given** an authenticated user
**When** they click "Log out"
**Then** their session is destroyed
**And** they are redirected to the login page

**Given** an inactive session (>24h)
**When** the user tries to access protected content
**Then** they are automatically logged out
**And** redirected to login with a message

## Technical Notes

- Add logout button to Header component
- Configure session maxAge in NextAuth (24 hours)
- Protect routes with middleware

## Tasks

- [x] Add logout button to Header (done in 1.1)
- [x] Configure session maxAge (24h) (done in 1.1)
- [x] Create middleware.ts for route protection
- [x] Define protected routes (/, /research/*)
- [x] Add session expiry message (SessionRequired error)
- [ ] Test automatic logout after inactivity (requires Google OAuth credentials)
