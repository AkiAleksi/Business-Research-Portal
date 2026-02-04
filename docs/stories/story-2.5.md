---
id: story-2.5
epic: epic-2
title: News Search & Error Handling
status: completed
priority: 10
dependencies: [story-2.1, story-2.2]
covers: [FR5, FR6, FR16, FR17, FR18, FR19, FR20, FR21]
---

# Story 2.5: News Search & Error Handling

## User Story

As a **user**,
I want **to see recent news about the company**,
So that **I can understand recent developments and events**.

## Acceptance Criteria

**Given** a company search
**When** the news tool completes
**Then** a News Card is displayed with:
- 3-5 recent news headlines
- Publication date
- Source name
- Link to full article

**And** each news item is clickable

**Given** any tool fails
**When** an error occurs
**Then** the user sees a friendly error message
**And** a "Retry" button is available
**And** other successful results are still shown

**Given** partial success
**When** some tools succeed and some fail
**Then** successful results are displayed
**And** failed sections show error state

## Technical Notes

- Create `src/lib/services/news.ts` (using Claude web search)
- Create `src/components/results/news-card.tsx`
- Implement error boundary for each card
- Add retry mechanism

## Tasks

- [ ] Implement news service with Claude web search
- [ ] Create NewsCard component
- [ ] Create NewsItem component
- [ ] Add error boundary wrapper
- [ ] Add retry button functionality
- [ ] Implement graceful degradation
- [ ] Test error scenarios
- [ ] Test partial success scenarios
