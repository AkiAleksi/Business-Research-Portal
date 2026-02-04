---
id: story-1.2
epic: epic-1
title: Login & Register Pages
status: completed
priority: 4
dependencies: [story-0.2, story-1.1]
covers: [FR11, FR12]
---

# Story 1.2: Login & Register Pages

## User Story

As a **user**,
I want **login and registration pages**,
So that **I can create an account or sign in with email/password**.

## Acceptance Criteria

**Given** an unauthenticated user on the login page
**When** they enter valid credentials
**Then** they are logged in and redirected to the main page

**Given** a new user on the register page
**When** they fill in email and password
**Then** their account is created
**And** they are automatically logged in

**Given** invalid credentials
**When** the user submits the form
**Then** they see a clear error message

## Technical Notes

- Create `src/app/(auth)/login/page.tsx`
- Create `src/app/(auth)/register/page.tsx`
- Use shadcn/ui form components

## Tasks

- [x] Create (auth) route group
- [x] Create login page with form
- [x] Create register page with form
- [x] Add form validation (via NextAuth error handling)
- [x] Add error message display
- [x] Add Google sign-in button to both pages
- [x] Implement redirect after successful auth (callbackUrl)
