---
id: story-2.4
epic: epic-2
title: PRH Integration & Financials Card
status: completed
priority: 9
dependencies: [story-2.1, story-2.2]
covers: [FR4, FR6]
---

# Story 2.4: PRH Integration & Financials Card

## User Story

As a **user**,
I want **to see financial information from PRH**,
So that **I can evaluate the company's financial health**.

## Acceptance Criteria

**Given** a company with a known business ID
**When** the PRH tool completes
**Then** a Financials Card is displayed with:
- Revenue (liikevaihto)
- Profit/loss (tulos)
- Balance sheet highlights
- Latest fiscal year

**And** each data point shows its source [PRH]
**And** numbers are formatted with Finnish locale

**Given** no financial data available
**When** PRH returns no data
**Then** the card shows "Taloustietoja ei saatavilla"

## Technical Notes

- Create `src/lib/services/prh.ts`
- PRH tilinpäätös API integration
- Create `src/components/results/financials-card.tsx`

## Tasks

- [ ] Implement PRH service with API integration
- [ ] Create FinancialsCard component
- [ ] Add Finnish number formatting (€)
- [ ] Add loading skeleton state
- [ ] Add "no data" state
- [ ] Test with real PRH API
