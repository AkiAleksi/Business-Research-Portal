---
id: story-0.2
epic: epic-0
title: Base Layout & UI Components
status: completed
priority: 2
dependencies: [story-0.1]
covers: []
---

# Story 0.2: Base Layout & UI Components

## User Story

As a **developer**,
I want **shadcn/ui configured with base layout components**,
So that **I can build consistent UI following the design system**.

## Acceptance Criteria

**Given** the initialized project
**When** shadcn/ui is configured
**Then** the following components are available:
- Button, Input, Card, Badge, Skeleton, Alert, Progress

**And** the color theme matches UX spec (blue primary #3B82F6, orange accent #F97316)
**And** Inter font is configured
**And** Header component with logo placeholder exists
**And** the layout is responsive (mobile-first)

## Technical Notes

- Run `npx shadcn@latest init`
- Configure `tailwind.config.ts` with custom colors
- Create `src/components/layout/header.tsx`
- Create `src/components/layout/providers.tsx` for context providers

## Tasks

- [x] Initialize shadcn/ui
- [x] Install required components (button, input, card, badge, skeleton, alert, progress)
- [x] Configure custom colors in globals.css (blue primary, orange accent)
- [x] Configure Inter font
- [x] Create Header component
- [x] Create Providers component
- [x] Create base layout in app/layout.tsx
