---
id: story-2.2
epic: epic-2
title: Search UI & Agent Progress
status: completed
priority: 7
dependencies: [story-0.2, story-2.1]
covers: [FR1, FR2, FR7, FR8, FR9, FR10, FR22]
---

# Story 2.2: Search UI & Agent Progress

## User Story

As a **user**,
I want **a search interface that shows the AI agent's progress**,
So that **I can see what the agent is doing in real-time**.

## Acceptance Criteria

**Given** the main page
**When** the user sees the search interface
**Then** there is a prominent search input
**And** the input is focused by default

**Given** a search query
**When** the user presses Enter or clicks Search
**Then** the agent progress indicator appears
**And** each tool call is shown with status (pending/loading/complete)
**And** the user sees "Haen YTJ:stä...", "Haen PRH:sta...", etc.

**Given** an active search
**When** tools complete
**Then** the status updates in real-time (✓ for complete)
**And** results appear progressively

## Technical Notes

- Create `src/components/search/search-input.tsx`
- Create `src/components/agent/agent-progress.tsx`
- Create `src/components/agent/agent-step.tsx`
- Use `useRenderToolCall` for tool visualization

## Tasks

- [x] Create SearchInput component
- [x] Create AgentProgress component
- [x] Create AgentStep component
- [x] Implement research API (simplified from CopilotKit)
- [x] Add Finnish status messages
- [x] Add loading/complete icons
- [x] Create CompanyCard component
- [x] Create FinancialsCard component
