---
stepsCompleted: [step-01-validate-prerequisites, step-02-design-epics, step-03-create-stories]
inputDocuments: [docs/prd.md, docs/architecture.md, docs/ux-design.md]
---

# Business Research Portal - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Business Research Portal, decomposing the requirements from the PRD, UX Design, and Architecture into implementable stories.

## Requirements Inventory

### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR1 | Käyttäjä voi syöttää yrityksen nimen hakukenttään |
| FR2 | Käyttäjä voi käynnistää haun painikkeella tai Enterillä |
| FR3 | Käyttäjä voi nähdä yrityksen perustiedot (nimi, Y-tunnus, toimiala, osoite) |
| FR4 | Käyttäjä voi nähdä yrityksen taloustiedot (liikevaihto, tulos, velat) |
| FR5 | Käyttäjä voi nähdä yrityksen viimeisimmät uutiset |
| FR6 | Käyttäjä voi nähdä tietojen lähteet ja aikaleiman |
| FR7 | Käyttäjä voi nähdä reaaliajassa agentin työskentelyprosessin |
| FR8 | Käyttäjä voi nähdä mitä tietolähdettä agentti kulloinkin käyttää |
| FR9 | Käyttäjä voi nähdä agentin tool-kutsujen edistymisen visuaalisesti |
| FR10 | Käyttäjä voi nähdä milloin haku on valmis |
| FR11 | Käyttäjä voi rekisteröityä palveluun |
| FR12 | Käyttäjä voi kirjautua sisään sähköpostilla ja salasanalla |
| FR13 | Käyttäjä voi kirjautua sisään Google-tilillä |
| FR14 | Käyttäjä voi kirjautua ulos |
| FR15 | Käyttäjä voi palauttaa salasanansa |
| FR16 | Käyttäjä voi nähdä selkeän viestin jos yritystä ei löydy |
| FR17 | Käyttäjä voi nähdä selkeän viestin jos haku epäonnistuu |
| FR18 | Käyttäjä voi yrittää hakua uudelleen virheen jälkeen |
| FR19 | Käyttäjä voi nähdä osittaiset tulokset jos jokin tietolähde epäonnistuu |
| FR20 | Käyttäjä voi käyttää palvelua desktop-selaimella |
| FR21 | Käyttäjä voi käyttää palvelua mobiiliselaimella (responsiivinen) |
| FR22 | Käyttäjä voi nähdä lataustilanteen haun aikana |

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR1 | Haun kokonaisvasteaika < 3 sekuntia |
| NFR2 | Ensimmäinen streaming-vastaus < 1 sekunti |
| NFR3 | UI-renderöinti < 100ms interaktioille |
| NFR4 | Sivun latausaika < 2 sekuntia (LCP) |
| NFR5 | Autentikointi JWT-tokenilla ja secure cookies |
| NFR6 | API-avaimet ympäristömuuttujissa, ei koskaan clientissa |
| NFR7 | Kaikki liikenne HTTPS-salattua |
| NFR8 | Automaattinen uloskirjaus 24h inaktiivisuuden jälkeen |
| NFR9 | MVP tukee 100 samanaikaista käyttäjää |
| NFR10 | 12kk kohdalla tuki 1000 samanaikaiselle käyttäjälle |
| NFR11 | Vercel auto-scaling käytössä |
| NFR12 | API-integraatioiden luotettavuus ≥95% |
| NFR13 | Graceful degradation – osittaiset tulokset jos API epäonnistuu |
| NFR14 | Rate limiting – jonoutus ja retry-logiikka |
| NFR15 | Uptime MVP/pilotti ≥99% |
| NFR16 | Uptime tuotanto ≥99.9% |
| NFR17 | Kaikki virheet lokitetaan seurantaa varten |

### Additional Requirements (from Architecture & UX)

**Architecture:**
- Starter template: `create-next-app` + manual setup
- CopilotKit integration with 3 tools (searchYTJ, searchPRH, searchNews)
- NextAuth.js for authentication (Google OAuth + credentials)
- Vercel deployment with Edge Functions
- Error handling with retry pattern (3 attempts, exponential backoff)

**UX Design:**
- shadcn/ui component library
- Inter font family
- Blue (#3B82F6) primary, Orange (#F97316) accent colors
- Streaming progress visualization
- Inline source badges with tooltips
- Responsive design (mobile-first)

## FR Coverage Map

| Epic | Stories | Covered FRs |
|------|---------|-------------|
| Epic 0 | 0.1, 0.2 | Infrastructure (no FRs) |
| Epic 1 | 1.1, 1.2, 1.3 | FR11, FR12, FR13, FR14, FR15 |
| Epic 2 | 2.1, 2.2, 2.3, 2.4, 2.5 | FR1-FR10, FR16-FR22 |

## Epic List

| Epic | Title | Goal |
|------|-------|------|
| Epic 0 | Project Setup | Establish technical foundation |
| Epic 1 | Authentication | User management and access control |
| Epic 2 | Company Research | Core AI-powered company research feature |

---

## Epic 0: Project Setup

**Goal:** Establish the technical foundation for the application including project initialization, base dependencies, and core UI components.

### Story 0.1: Project Initialization

As a **developer**,
I want **a properly configured Next.js project with all dependencies**,
So that **I have a solid foundation to build the application**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Use `create-next-app` with `--typescript --tailwind --app --src-dir`
- Install: `@copilotkit/react-core`, `@copilotkit/react-ui`, `@copilotkit/runtime`
- Install: `lucide-react`, `next-auth`

---

### Story 0.2: Base Layout & UI Components

As a **developer**,
I want **shadcn/ui configured with base layout components**,
So that **I can build consistent UI following the design system**.

**Acceptance Criteria:**

**Given** the initialized project
**When** shadcn/ui is configured
**Then** the following components are available:
- Button, Input, Card, Badge, Skeleton, Alert, Progress
**And** the color theme matches UX spec (blue primary, orange accent)
**And** Inter font is configured
**And** Header component with logo placeholder exists
**And** the layout is responsive (mobile-first)

**Technical Notes:**
- Run `npx shadcn@latest init`
- Configure `tailwind.config.ts` with custom colors
- Create `src/components/layout/header.tsx`
- Create `src/components/layout/providers.tsx` for context providers

---

## Epic 1: Authentication

**Goal:** Enable users to register, login, and manage their sessions securely.

### Story 1.1: NextAuth.js Setup with Google OAuth

As a **user**,
I want **to sign in with my Google account**,
So that **I can quickly access the application without creating a new password**.

**Acceptance Criteria:**

**Given** an unauthenticated user
**When** they click "Sign in with Google"
**Then** they are redirected to Google OAuth
**And** after successful authentication, they are redirected back to the app
**And** their session is created with JWT
**And** the session persists across page refreshes

**Given** an authenticated user
**When** they visit the app
**Then** they see their profile info (name, avatar)

**Technical Notes:**
- Configure NextAuth.js in `src/lib/auth.ts`
- Create `src/app/api/auth/[...nextauth]/route.ts`
- Environment variables: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`

**Covers:** FR13

---

### Story 1.2: Login & Register Pages

As a **user**,
I want **login and registration pages**,
So that **I can create an account or sign in with email/password**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Create `src/app/(auth)/login/page.tsx`
- Create `src/app/(auth)/register/page.tsx`
- Use shadcn/ui form components

**Covers:** FR11, FR12

---

### Story 1.3: Session Management & Logout

As a **user**,
I want **to log out and manage my session**,
So that **I can secure my account**.

**Acceptance Criteria:**

**Given** an authenticated user
**When** they click "Log out"
**Then** their session is destroyed
**And** they are redirected to the login page

**Given** an inactive session (>24h)
**When** the user tries to access protected content
**Then** they are automatically logged out
**And** redirected to login with a message

**Technical Notes:**
- Add logout button to Header component
- Configure session maxAge in NextAuth
- Protect routes with middleware

**Covers:** FR14, FR15, NFR8

---

## Epic 2: Company Research

**Goal:** Enable users to research companies using AI-powered agent that fetches data from YTJ, PRH, and news sources with real-time streaming visualization.

### Story 2.1: CopilotKit Runtime & Tools Setup

As a **developer**,
I want **CopilotKit configured with tool definitions**,
So that **the AI agent can fetch company data from external sources**.

**Acceptance Criteria:**

**Given** the CopilotKit runtime
**When** a tool is invoked
**Then** it executes the corresponding service function
**And** returns structured data

**Given** the frontend
**When** CopilotKitProvider is configured
**Then** streaming responses are received
**And** tool calls are visible to the UI

**Tools to implement:**
1. `searchYTJ` - fetches basic company info
2. `searchPRH` - fetches financial data
3. `searchNews` - fetches recent news

**Technical Notes:**
- Create `src/app/api/copilotkit/route.ts`
- Create `src/lib/tools/definitions.ts`
- Create service stubs in `src/lib/services/`
- Wrap app with `<CopilotKitProvider>`

**Covers:** FR7, FR8, FR9, FR10

---

### Story 2.2: Search UI & Agent Progress

As a **user**,
I want **a search interface that shows the AI agent's progress**,
So that **I can see what the agent is doing in real-time**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Create `src/components/search/search-input.tsx`
- Create `src/components/agent/agent-progress.tsx`
- Create `src/components/agent/agent-step.tsx`
- Use `useRenderToolCall` for tool visualization

**Covers:** FR1, FR2, FR7, FR8, FR9, FR10, FR22

---

### Story 2.3: YTJ Integration & Company Card

As a **user**,
I want **to see basic company information from YTJ**,
So that **I can learn about the company's identity and contact details**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Create `src/lib/services/ytj.ts`
- YTJ API: `https://avoindata.prh.fi/bis/v1`
- Create `src/components/results/company-card.tsx`
- Create `src/components/results/source-badge.tsx`

**Covers:** FR3, FR6, FR16

---

### Story 2.4: PRH Integration & Financials Card

As a **user**,
I want **to see financial information from PRH**,
So that **I can evaluate the company's financial health**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Create `src/lib/services/prh.ts`
- PRH tilinpäätös API integration
- Create `src/components/results/financials-card.tsx`

**Covers:** FR4, FR6

---

### Story 2.5: News Search & Error Handling

As a **user**,
I want **to see recent news about the company**,
So that **I can understand recent developments and events**.

**Acceptance Criteria:**

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

**Technical Notes:**
- Create `src/lib/services/news.ts` (using Claude web search)
- Create `src/components/results/news-card.tsx`
- Implement error boundary for each card
- Add retry mechanism

**Covers:** FR5, FR6, FR16, FR17, FR18, FR19, FR20, FR21

---

## Implementation Order

| Order | Story | Dependencies |
|-------|-------|--------------|
| 1 | 0.1 Project Initialization | None |
| 2 | 0.2 Base Layout & UI | 0.1 |
| 3 | 1.1 NextAuth Setup | 0.1 |
| 4 | 1.2 Login/Register Pages | 0.2, 1.1 |
| 5 | 1.3 Session Management | 1.1, 1.2 |
| 6 | 2.1 CopilotKit Setup | 0.1 |
| 7 | 2.2 Search UI & Progress | 0.2, 2.1 |
| 8 | 2.3 YTJ Integration | 2.1, 2.2 |
| 9 | 2.4 PRH Integration | 2.1, 2.2 |
| 10 | 2.5 News & Error Handling | 2.1, 2.2 |

