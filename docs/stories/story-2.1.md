---
id: story-2.1
epic: epic-2
title: CopilotKit Runtime & Tools Setup
status: completed
priority: 6
dependencies: [story-0.1]
covers: [FR7, FR8, FR9, FR10]
---

# Story 2.1: CopilotKit Runtime & Tools Setup

## User Story

As a **developer**,
I want **CopilotKit configured with tool definitions**,
So that **the AI agent can fetch company data from external sources**.

## Acceptance Criteria

**Given** the CopilotKit runtime
**When** a tool is invoked
**Then** it executes the corresponding service function
**And** returns structured data

**Given** the frontend
**When** CopilotKitProvider is configured
**Then** streaming responses are received
**And** tool calls are visible to the UI

## Tools to Implement

1. `searchYTJ` - fetches basic company info
2. `searchPRH` - fetches financial data
3. `searchNews` - fetches recent news

## Technical Notes

- Create `src/app/api/copilotkit/route.ts`
- Create `src/lib/tools/definitions.ts`
- Create service stubs in `src/lib/services/`
- Wrap app with `<CopilotKitProvider>`

## Tasks

- [x] Create CopilotKit API route
- [x] Define tool schemas (searchYTJ, searchPRH, searchNews)
- [x] Create service stub files
- [x] Add CopilotKitProvider to providers.tsx
- [x] Configure runtime with Claude API (Anthropic Adapter)
- [ ] Test basic tool invocation (requires ANTHROPIC_API_KEY)
