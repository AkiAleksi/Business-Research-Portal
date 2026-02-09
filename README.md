# Business Research Portal

An AI-powered company research platform built on **AG-UI (Agent User Interface)** principles, where users observe an autonomous agent researching companies in real time. The agent queries official Finnish business registries, analyzes financial data, and aggregates news — all visible as a transparent, streaming workflow.

**Live:** [business-research-portal.vercel.app](https://business-research-portal.vercel.app)

### Demo

https://github.com/user-attachments/assets/business-research-portal-demo.mp4

[Watch the demo video](./business-research-portal-demo.mp4)

---

## Why AG-UI?

Traditional search tools return static results. AG-UI flips the paradigm: instead of a black-box query, the user watches the agent work — seeing which sources it queries, what data it finds, and how it synthesizes results. This transparency builds trust and gives users confidence in AI-generated outputs.

This project demonstrates a production-grade implementation of that pattern using **CopilotKit** as the AG-UI framework.

---

## Architecture

```
                          ┌──────────────────────────────┐
                          │      User Interface          │
                          │  CopilotChat + Tool Renders  │
                          └──────────┬───────────────────┘
                                     │ streaming
                          ┌──────────▼───────────────────┐
                          │   CopilotKit Runtime         │
                          │   Claude Sonnet 4 Agent      │
                          │   (autonomous tool calling)  │
                          └──┬──────────┬──────────┬─────┘
                             │          │          │
                    ┌────────▼──┐ ┌─────▼────┐ ┌──▼──────────┐
                    │  YTJ API  │ │ PRH/     │ │ Tavily News │
                    │ (Company  │ │ Tavily + │ │   Search    │
                    │  Registry)│ │ Claude   │ │             │
                    └───────────┘ └──────────┘ └─────────────┘
```

### Agent Workflow

When a user enters a company name, the agent autonomously executes a three-phase research pipeline:

1. **Company lookup** — Queries the YTJ (Finnish Trade Register) API for business ID, industry, address, legal form, and registration date
2. **Financial analysis** — Fetches financial statements via PRH XBRL API with intelligent fallback to Tavily search + Claude parsing for revenue, profit, equity, and headcount
3. **News aggregation** — Searches Finnish news sources via Tavily API for recent coverage

Each phase streams to the UI in real time through CopilotKit's `useRenderToolCall` hooks, rendering structured result cards as the agent progresses.

### Tool Call Rendering

The AG-UI pattern materializes through custom tool renderers that intercept each agent action:

```tsx
useRenderToolCall({
  name: "searchYTJ",
  render: ({ status, result }) =>
    status !== "complete"
      ? <AgentStep name="YTJ" status="loading" />
      : <CompanyCard data={result.data} />
});
```

This creates a live, progressive disclosure UI where loading states transition to data cards as each tool completes.

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 16, React 19, TypeScript | Full-stack application |
| **AG-UI Runtime** | CopilotKit SDK | Agent orchestration and streaming UI |
| **AI Model** | Claude Sonnet 4 (Anthropic) | Autonomous reasoning and tool calling |
| **Database** | Neon Postgres + Prisma ORM | Serverless user persistence |
| **Auth** | NextAuth.js (Credentials + Google OAuth) | JWT-based session management |
| **Data Sources** | YTJ API, PRH API, Tavily API | Finnish business data and news |
| **UI** | Tailwind CSS 4, shadcn/ui, Radix | Component library with glassmorphism design |
| **Deployment** | Vercel | Edge-optimized hosting |
| **Methodology** | BMAD Method | AI-assisted product development lifecycle |

---

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── copilotkit/[[...copilotkit]]/   # AG-UI runtime endpoint
│   │   └── auth/                            # NextAuth + registration
│   ├── (auth)/                              # Login / Register pages
│   ├── layout.tsx                           # Root layout
│   └── page.tsx                             # Main research interface
├── components/
│   ├── agent/                               # AG-UI visualization layer
│   │   ├── tool-renderers.tsx               # useRenderToolCall hooks
│   │   ├── agent-step.tsx                   # Tool execution step UI
│   │   └── agent-progress.tsx               # Progress container
│   ├── results/                             # Structured data cards
│   │   ├── company-card.tsx                 # YTJ company data
│   │   ├── financials-card.tsx              # Financial metrics
│   │   └── news-card.tsx                    # News articles
│   ├── layout/                              # Header, Providers
│   └── ui/                                  # shadcn/ui primitives
├── lib/
│   ├── services/                            # External API integrations
│   │   ├── ytj.ts                           # Finnish Trade Register
│   │   ├── prh.ts                           # Financial data (PRH + Tavily + Claude)
│   │   └── news.ts                          # News search (Tavily)
│   ├── auth.ts                              # NextAuth configuration
│   └── prisma.ts                            # Database client (Neon adapter)
└── proxy.ts                                 # Route protection (Next.js 16 convention)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Neon Postgres database
- API keys: Anthropic, Tavily

### Setup

```bash
git clone https://github.com/AkiAleksi/Business-Research-Portal.git
cd Business-Research-Portal
npm install
```

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=           # openssl rand -hex 32
DATABASE_URL=              # Neon Postgres connection string
ANTHROPIC_API_KEY=         # Anthropic API key
TAVILY_API_KEY=            # Tavily API key
```

Optional (Google OAuth):

```env
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Initialize the database and start the development server:

```bash
npx prisma db push
npm run dev
```

---

## Development Methodology: BMAD

This project was developed using the **BMAD Method** (Business Mindset, AI-assisted Design) — a structured product development framework where specialized AI agents handle different lifecycle phases:

| Agent | Role | Output |
|-------|------|--------|
| **Analyst** | Strategic research and problem framing | Project Brief |
| **PM** | Requirements and roadmap definition | PRD, Epics |
| **Architect** | Technical design and stack decisions | Architecture Document |
| **Dev** | Implementation and sprint execution | Production code |
| **QA (Quinn)** | Test strategy and quality validation | Test Plan, Test Cases |

BMAD artifacts are in the [`docs/`](./docs) directory. The methodology provided structured handoffs between planning and implementation phases, ensuring architectural decisions were documented before code was written.

---

## License

MIT
