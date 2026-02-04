---
id: story-2.3
epic: epic-2
title: YTJ Integration & Company Card
status: completed
priority: 8
dependencies: [story-2.1, story-2.2]
covers: [FR3, FR6, FR16]
---

# Story 2.3: YTJ Integration & Company Card

## User Story

As a **user**,
I want **to see basic company information from YTJ**,
So that **I can learn about the company's identity and contact details**.

## Acceptance Criteria

**Given** a company search
**When** the YTJ tool completes
**Then** a Company Card is displayed with:
- Company name
- Business ID (Y-tunnus)
- Industry/business line
- Address
- Registration date

**And** each data point shows its source [YTJ]
**And** the card has loading skeleton while fetching

**Given** no company found
**When** YTJ returns empty results
**Then** a clear message is shown: "Yritystä ei löytynyt"

## Technical Notes

- Create `src/lib/services/ytj.ts`
- YTJ API: `https://avoindata.prh.fi/bis/v1`
- Create `src/components/results/company-card.tsx`
- Create `src/components/results/source-badge.tsx`

## Tasks

- [ ] Implement YTJ service with API integration
- [ ] Create CompanyCard component
- [ ] Create SourceBadge component
- [ ] Add loading skeleton state
- [ ] Add "not found" state
- [ ] Format data for Finnish locale
- [ ] Test with real YTJ API
