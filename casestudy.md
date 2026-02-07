# Case Study: Building an Agent-Native UI with CopilotKit and Claude

## Overview

**Business Research Portal** is a production application that demonstrates how AG-UI (Agent User Interface) architecture transforms a traditionally static search experience into a transparent, real-time agent workflow. Users enter a company name and watch an AI agent autonomously research the company across three data sources — rendering structured results progressively as each phase completes.

The project was built to explore a core question: **how should user interfaces behave when the backend is an autonomous agent, not a deterministic API?**

| | |
|---|---|
| **Domain** | B2B company intelligence (Finnish market) |
| **Stack** | Next.js 16 / React 19 / CopilotKit / Claude Sonnet 4 |
| **Data Sources** | YTJ (Trade Register), PRH (Financial Statements), Tavily (News) |
| **Timeline** | 1 week from brief to production |
| **Live** | [business-research-portal.vercel.app](https://business-research-portal.vercel.app) |

---

## Problem

Business professionals researching Finnish companies face a fragmented data landscape. Company basics live in YTJ, financial statements in PRH, and news across dozens of outlets. A single prospect research task requires navigating multiple systems, cross-referencing identifiers, and manually synthesizing results — typically taking 1-3 hours per company.

Existing solutions (Vainu, ZoomInfo, Crunchbase) are either expensive, lack Finnish market coverage, or still require significant manual aggregation.

---

## Solution Architecture

### The AG-UI Pattern

Rather than building a traditional search-and-display application, the portal implements the **AG-UI pattern** — the user interface is driven by an autonomous agent whose actions are streamed and rendered in real time.

The key architectural insight: **tool calls are the UI's data source**. Instead of the frontend making API calls and rendering responses, the frontend subscribes to the agent's tool invocations and renders each one as a distinct UI component.

```
User Input: "Nokia"
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│  CopilotKit Runtime                                     │
│                                                         │
│  Claude Sonnet 4 Agent                                  │
│  ┌─────────────────────────────────────────────────┐    │
│  │ System: "You are a company research agent.      │    │
│  │  Always fetch all three sources automatically." │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  Step 1: searchYTJ("Nokia")                             │
│     └─► YTJ API → Company data (Y-tunnus, industry...) │
│                                                         │
│  Step 2: searchPRH("0112038-9", "Nokia")                │
│     └─► PRH XBRL → fallback: Tavily + Claude parse     │
│     └─► Revenue, profit, equity, headcount              │
│                                                         │
│  Step 3: searchNews("Nokia")                            │
│     └─► Tavily API → Recent Finnish news articles       │
│                                                         │
│  Step 4: Agent synthesizes a summary response           │
└─────────────────────────────────────────────────────────┘
     │
     ▼  streaming tool calls
┌─────────────────────────────────────────────────────────┐
│  Frontend: useRenderToolCall hooks                      │
│                                                         │
│  ┌──────────┐  ┌───────────────┐  ┌──────────────┐     │
│  │ Company  │  │  Financials   │  │    News      │     │
│  │  Card    │  │    Card       │  │    Card      │     │
│  │ (YTJ)   │  │ (PRH/Tavily)  │  │  (Tavily)   │     │
│  └──────────┘  └───────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────┘
```

### Why This Matters

In a conventional architecture, the frontend orchestrates API calls and manages state transitions. In AG-UI, the **agent decides** what to call, in what order, and with what parameters. The frontend's role shifts from orchestrator to observer — it renders whatever the agent does, whenever it does it.

This has practical implications:

- **No hardcoded workflow.** The agent adapts its research strategy based on context. If a company name is ambiguous, it may search differently than for a well-known corporation.
- **Progressive disclosure by default.** Results appear as they're ready, not all at once after a loading spinner.
- **Graceful partial failure.** If one data source fails, the agent continues with the others. The UI naturally shows what succeeded.

---

## Technical Implementation

### Agent Configuration

The agent is a CopilotKit `BuiltInAgent` backed by Claude Sonnet 4, configured with three tools and a Finnish-language system prompt that instructs it to always fetch all three data sources without asking the user for confirmation:

```typescript
const agent = new BuiltInAgent({
  model: anthropic("claude-sonnet-4-20250514"),
  maxSteps: 10,
  prompt: `Olet yritystutkimusagentti. Kun käyttäjä pyytää tietoja
    yrityksestä, hae AINA automaattisesti kaikki kolme tietolähdettä...`,
  tools: [searchYTJ, searchPRH, searchNews],
});
```

The `maxSteps: 10` limit prevents runaway agent loops while giving enough headroom for the three-tool pipeline plus retries or clarification steps.

### Tool Rendering Layer

CopilotKit's `useRenderToolCall` hook is the bridge between agent actions and UI. Each tool invocation triggers a render cycle with a `status` field (`"executing"` or `"complete"`) and the tool's arguments and result:

```tsx
useRenderToolCall({
  name: "searchPRH",
  render: ({ status, args, result }) => {
    if (status !== "complete") {
      return <AgentStep name="Taloustiedot" status="loading" />;
    }
    return <FinancialsCard data={result.data} />;
  },
});
```

This pattern cleanly separates agent logic from presentation. The agent knows nothing about cards or spinners — it just calls tools. The frontend knows nothing about YTJ APIs — it just renders what comes back.

### Financial Data Pipeline

The most technically interesting service is the financial data pipeline. Finnish company financials are theoretically available through PRH's XBRL API, but coverage is inconsistent. The solution implements a multi-tier fallback:

1. **PRH XBRL API** — Structured financial statements (when available)
2. **Tavily search + Claude parsing** — Web search for financial data, then Claude extracts structured metrics from unstructured text
3. **Confidence scoring** — Each result carries a confidence level (high/medium/low) based on the data source, displayed to the user

This fallback chain runs server-side within the tool execution, transparent to both the agent and the user — they just see a `FinancialsCard` with a confidence badge.

### Authentication and Security

- **NextAuth.js** with credentials (bcrypt-hashed passwords) and Google OAuth
- **JWT sessions** (24h expiry) with user ID embedded in token
- **Next.js 16 proxy** convention (`proxy.ts`) for route-level protection
- **Security headers** (HSTS, X-Frame-Options, CSP directives) via `next.config.ts`
- **Neon Postgres** via Prisma ORM with the serverless adapter

---

## Development Process: BMAD Method

The project was built using the **BMAD Method** (Business Mindset, AI-assisted Design), where specialized AI agents manage each phase of the product development lifecycle.

### How BMAD Worked in Practice

| Phase | BMAD Agent | Output | Impact |
|-------|-----------|--------|--------|
| **Discovery** | Analyst | Project Brief with persona, problem statement, success metrics | Framed the product around a specific user need (B2B sales prospecting) rather than a generic "company search" |
| **Requirements** | PM | PRD with 22 functional requirements, epics, and user stories | Provided clear acceptance criteria for each feature |
| **Design** | Architect | Architecture Decision Document with stack evaluation | Documented why CopilotKit over LangChain, why Neon over Supabase |
| **QA** | Quinn | Test plan, 40+ test cases, bug report template | Structured testing across auth, agent behavior, and UI |

BMAD's value was in **forcing structured decision-making before code**. The Architecture Decision Document, for example, evaluated three starter templates before selecting `create-next-app` with manual CopilotKit integration — a decision that would have been made ad hoc without the framework.

All BMAD artifacts are version-controlled in `docs/` alongside the application code.

---

## Key Decisions and Trade-offs

### CopilotKit over custom WebSocket implementation

CopilotKit provides the AG-UI primitives (tool call streaming, render hooks, chat interface) out of the box. Building equivalent functionality with raw WebSockets would have added weeks of work for streaming state management, reconnection logic, and UI synchronization. The trade-off is coupling to CopilotKit's API surface, which is acceptable for this use case.

### Single agent over multi-agent orchestration

The current architecture uses one agent with three tools rather than specialized agents for each data source. This is simpler to reason about and debug. Multi-agent orchestration (e.g., a coordinator agent dispatching to specialist agents) would be warranted if the tool count grew significantly or if agents needed to collaborate on analysis.

### Claude for financial data parsing

When PRH's structured API lacks data, Claude parses financial figures from unstructured web content. This introduces non-determinism — the same query might extract slightly different numbers on different runs. The confidence scoring system mitigates this by being transparent about data quality. In production, caching parsed results would reduce both cost and variance.

### Next.js 16 proxy over middleware

Next.js 16 deprecates the `middleware.ts` convention in favor of `proxy.ts`, which runs on the Node.js runtime instead of the Edge runtime. This project uses the new convention, replacing the `next-auth/middleware` wrapper with direct `getToken` calls for route protection.

---

## Results

The portal reduces company research time from hours of manual work across fragmented sources to a single natural-language query with results in under 30 seconds. The AG-UI approach — where users observe the agent's research process in real time — addresses the trust gap that typically exists with AI-generated business intelligence.

### What Worked

- **Tool call rendering** as the primary UI pattern proved intuitive. Users understand what's happening without explanation.
- **CopilotKit's streaming architecture** handled the real-time rendering requirements cleanly.
- **The fallback pipeline** for financial data (PRH XBRL → Tavily + Claude) significantly improved data coverage compared to relying on a single source.
- **BMAD methodology** prevented scope creep and ensured architectural decisions were intentional.

### What I'd Do Differently

- **Add response caching** (Redis or Vercel KV) to reduce API costs and improve latency for repeated queries
- **Implement rate limiting** on the CopilotKit endpoint before scaling beyond MVP
- **Consider multi-agent architecture** if expanding to additional data sources (e.g., LinkedIn, credit ratings, patent databases)
- **Add observability** (structured logging, error tracking) for production monitoring

---

## Stack Summary

```
Next.js 16.1.6          React 19            TypeScript 5
CopilotKit 1.51         Claude Sonnet 4     Anthropic SDK
Neon Postgres           Prisma 6.19         NextAuth 4
Tailwind CSS 4          shadcn/ui           Radix UI
Tavily API              YTJ API             PRH API
Vercel                  BMAD Method
```
