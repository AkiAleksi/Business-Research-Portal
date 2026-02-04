---
stepsCompleted: [step-01-init, step-02-context, step-03-starter, step-04-decisions, step-05-patterns, step-06-structure, step-07-validation, step-08-complete]
inputDocuments: [docs/prd.md, docs/project-brief.md, docs/ux-design.md]
workflowType: 'architecture'
project_name: 'Business Research Portal'
user_name: 'Aki'
date: '2026-02-04'
---

# Architecture Decision Document - Business Research Portal

_This document builds collaboratively through step-by-step discovery._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (22 kpl):**

| Kategoria | Vaatimukset | Arkkitehtuurivaikutus |
|-----------|-------------|----------------------|
| Yritystutkimus | FR1-FR6 | API-integraatiot (YTJ, PRH), data aggregation layer |
| AI-visualisointi | FR7-FR10 | CopilotKit streaming, WebSocket/SSE, real-time UI updates |
| Käyttäjähallinta | FR11-FR15 | Authentication provider, session management, JWT |
| Virheenkäsittely | FR16-FR19 | Error boundaries, retry logic, graceful degradation |
| Käyttöliittymä | FR20-FR22 | Responsive design, loading states, progressive enhancement |

**Non-Functional Requirements:**

| NFR | Tavoite | Arkkitehtuuripäätös |
|-----|---------|---------------------|
| Vasteaika | < 3s kokonaisuus, < 1s ensimmäinen vastaus | Streaming architecture, edge optimization |
| Turvallisuus | JWT, HTTPS, secure env vars | NextAuth/Clerk + Vercel environment |
| Skaalautuvuus | 100 → 1000 samanaikaista | Vercel auto-scaling, stateless design |
| Integraatiot | ≥95% luotettavuus | Retry patterns, circuit breakers, caching |
| Uptime | 99% (MVP) → 99.9% (prod) | Vercel infrastructure, health checks |

### Scale & Complexity

| Mittari | Arvio |
|---------|-------|
| **Kompleksisuustaso** | Medium |
| **Tekninen domain** | Full-stack web + AI integration |
| **Arkkitehtuurikomponentit** | ~8-10 |
| **Ulkoiset integraatiot** | 3 (YTJ API, PRH API, Claude API) |
| **Real-time vaatimukset** | Kyllä (streaming tool calls) |

### Technical Constraints & Dependencies

| Rajoite | Lähde | Arkkitehtuurivaikutus |
|---------|-------|----------------------|
| Next.js 14+ App Router | PRD | Server Components, Route Handlers, Streaming |
| CopilotKit SDK | PRD | Spesifinen provider/hook pattern |
| Claude API | PRD | Anthropic SDK, tool definitions |
| Vercel deployment | PRD | Edge Functions, Environment Variables |
| Suomalaiset API:t | PRD | YTJ/PRH spesifiset endpointit ja dataformaatit |

### Cross-Cutting Concerns

1. **Error Handling** - Yhtenäinen virheenkäsittely kaikissa kerroksissa
2. **Loading States** - Streaming UI, skeleton loaders, progress indicators
3. **Source Attribution** - Jokainen datakenttä linkittyy lähteeseen
4. **Authentication** - Suojatut API-reitit, session validation
5. **Logging & Monitoring** - Strukturoitu logging, error tracking

## Starter Template Decision

### Tech Stack (from PRD)

| Teknologia | Versio | Rooli |
|------------|--------|-------|
| **Next.js** | 14+ | Framework (App Router) |
| **React** | 18+ | UI Library |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Tailwind CSS** | 3.x | Utility-first CSS |
| **CopilotKit** | Latest | AI Agent streaming UI |
| **shadcn/ui** | Latest | UI komponenttikirjasto |
| **Claude API** | claude-3-opus | AI-malli |

### Starter Evaluation

| Vaihtoehto | Arvio | Valinta |
|------------|-------|---------|
| `create-next-app` + manual | Täysi kontrolli, selkeä rakenne | ✅ **Valittu** |
| `npx copilotkit create` | Nopea, mutta rajoitettu | ❌ |
| shadcn/ui starter | Ei CopilotKit-integraatiota | ❌ |

### Initialization Commands

```bash
# 1. Create Next.js app
npx create-next-app@latest business-research-portal \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

# 2. Initialize shadcn/ui
npx shadcn@latest init

# 3. Install CopilotKit
npm install @copilotkit/react-core @copilotkit/react-ui @copilotkit/runtime

# 4. Install additional dependencies
npm install @anthropic-ai/sdk lucide-react
```

### Rationale

- **Puhdas pohja:** Täysi kontrolli arkkitehtuurista
- **Selkeä rakenne:** Helppo debugata ja ylläpitää
- **Modulaarinen:** Jokainen riippuvuus lisätään tarpeen mukaan
- **Dokumentoitu:** Kaikki valinnat perusteltuja

## Core Architectural Decisions

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│   Next.js App Router + React Server Components              │
│   CopilotKit UI + shadcn/ui Components                      │
├─────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                         │
│   CopilotKit Runtime (API Route Handler)                    │
│   Tool Definitions + Execution Logic                        │
├─────────────────────────────────────────────────────────────┤
│                     SERVICE LAYER                            │
│   YTJService │ PRHService │ NewsService │ AIService         │
│   Error handling, retries, caching                          │
├─────────────────────────────────────────────────────────────┤
│                    EXTERNAL APIS                             │
│   YTJ API (REST) │ PRH API (REST) │ Claude API (Streaming)  │
└─────────────────────────────────────────────────────────────┘
```

### Key Decisions

| Päätös | Valinta | Perustelu |
|--------|---------|-----------|
| **Rendering** | Server Components + Client Islands | Optimaalinen suorituskyky |
| **API Style** | Route Handlers + Server Actions | Next.js 14 native patterns |
| **AI Runtime** | `/api/copilotkit` single endpoint | CopilotKit SDK requirement |
| **Authentication** | NextAuth.js v5 | Google OAuth, JWT sessions, Vercel-yhteensopiva |
| **State Management** | React hooks + URL state | Yksinkertainen, ei tarvetta Reduxille |
| **Styling** | Tailwind CSS + shadcn/ui | Design system -yhteensopiva |

### CopilotKit Integration Pattern

```typescript
// src/app/api/copilotkit/route.ts
import { CopilotRuntime, AnthropicAdapter } from "@copilotkit/runtime";

const tools = [
  {
    name: "searchYTJ",
    description: "Hae yrityksen perustiedot YTJ:stä",
    parameters: z.object({ companyName: z.string() }),
    execute: async ({ companyName }) => ytjService.search(companyName)
  },
  {
    name: "searchPRH",
    description: "Hae yrityksen taloustiedot PRH:sta",
    parameters: z.object({ businessId: z.string() }),
    execute: async ({ businessId }) => prhService.getFinancials(businessId)
  },
  {
    name: "searchNews",
    description: "Hae yrityksen viimeisimmät uutiset",
    parameters: z.object({ companyName: z.string() }),
    execute: async ({ companyName }) => newsService.search(companyName)
  }
];

export const POST = async (req: Request) => {
  const runtime = new CopilotRuntime({ tools });
  const adapter = new AnthropicAdapter({ model: "claude-sonnet-4-20250514" });
  return runtime.handle(req, adapter);
};
```

### Error Handling Strategy

| Taso | Strategia | Toteutus |
|------|-----------|----------|
| **API-kutsu** | Retry with backoff | 3 yritystä, 1s → 2s → 4s |
| **Tool failure** | Graceful degradation | Näytä onnistuneet, merkitse epäonnistuneet |
| **Network error** | Auto-retry | Detect offline, retry kun online |
| **UI error** | Error boundaries | Komponenttikohtainen recovery |

### Environment Variables

```env
# Authentication
NEXTAUTH_SECRET=<random-32-chars>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<from-google-console>
GOOGLE_CLIENT_SECRET=<from-google-console>

# AI
ANTHROPIC_API_KEY=sk-ant-<key>

# External APIs (if keys needed)
YTJ_API_KEY=<optional>
PRH_API_KEY=<optional>
```

## Project Structure

```
business-research-portal/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout + CopilotKit provider
│   │   ├── page.tsx                  # Homepage (search UI)
│   │   ├── globals.css               # Tailwind + custom styles
│   │   ├── api/
│   │   │   ├── copilotkit/
│   │   │   │   └── route.ts          # CopilotKit runtime endpoint
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           └── route.ts      # NextAuth handlers
│   │   └── (protected)/
│   │       └── layout.tsx            # Auth-protected layout
│   │
│   ├── components/
│   │   ├── ui/                       # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── alert.tsx
│   │   │   └── progress.tsx
│   │   ├── search/
│   │   │   └── search-input.tsx      # Enhanced search with shortcuts
│   │   ├── agent/
│   │   │   ├── agent-progress.tsx    # Streaming progress container
│   │   │   ├── agent-step.tsx        # Individual tool step
│   │   │   └── tool-renderers.tsx    # useRenderToolCall hooks
│   │   ├── results/
│   │   │   ├── results-grid.tsx      # 3-column responsive grid
│   │   │   ├── company-card.tsx      # YTJ data display
│   │   │   ├── financials-card.tsx   # PRH data display
│   │   │   ├── news-card.tsx         # News list
│   │   │   └── source-badge.tsx      # Clickable source ref
│   │   └── layout/
│   │       ├── header.tsx
│   │       └── providers.tsx         # All context providers
│   │
│   ├── lib/
│   │   ├── services/
│   │   │   ├── ytj.ts                # YTJ API client + types
│   │   │   ├── prh.ts                # PRH API client + types
│   │   │   └── news.ts               # Claude web search wrapper
│   │   ├── tools/
│   │   │   ├── definitions.ts        # CopilotKit tool definitions
│   │   │   └── handlers.ts           # Tool execution logic
│   │   ├── auth.ts                   # NextAuth configuration
│   │   └── utils.ts                  # Shared utilities
│   │
│   └── types/
│       ├── company.ts                # Company-related types
│       ├── api.ts                    # API response types
│       └── index.ts                  # Re-exports
│
├── public/
│   └── favicon.ico
├── .env.local                        # Environment variables
├── .env.example                      # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── components.json                   # shadcn/ui config
├── tsconfig.json
└── package.json
```

## Implementation Patterns

### Naming Conventions

| Tyyppi | Konventio | Esimerkki |
|--------|-----------|-----------|
| **Komponentit** | PascalCase, .tsx | `SearchInput.tsx` |
| **Utilityt** | camelCase, .ts | `formatCurrency.ts` |
| **Hookit** | use-prefix | `useCompanySearch.ts` |
| **Tyypit** | PascalCase | `CompanyInfo`, `ApiResponse` |
| **API routes** | kebab-case folders | `api/copilotkit/route.ts` |
| **CSS** | Tailwind utilities | `className="flex items-center"` |

### Component Patterns

```typescript
// Server Component (default) - data fetching
export default async function Page() {
  return <ClientComponent />;
}

// Client Component - interactivity
"use client";
export function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState("");
  // ...
}

// Tool Renderer - CopilotKit pattern
"use client";
export function ToolRenderers() {
  useRenderToolCall({
    name: "searchYTJ",
    render: ({ status, result }) => (
      status === "loading"
        ? <Skeleton />
        : <CompanyCard data={result} />
    )
  });
  return null;
}
```

### Service Pattern

```typescript
// lib/services/ytj.ts
class YTJService {
  private baseUrl = "https://avoindata.prh.fi/bis/v1";

  async search(name: string): Promise<CompanyBasicInfo[]> {
    const res = await fetch(`${this.baseUrl}?name=${encodeURIComponent(name)}`);
    if (!res.ok) throw new ServiceError("YTJ", res.status);
    return this.transformResponse(await res.json());
  }
}

export const ytjService = new YTJService();
```

## Architecture Validation

### Requirements Coverage

| Vaatimus | Arkkitehtuuriratkaisu | Status |
|----------|----------------------|--------|
| FR1-FR6: Yritystutkimus | YTJ/PRH/News Services + CopilotKit Tools | ✅ Katettu |
| FR7-FR10: AI-visualisointi | CopilotKit streaming + useRenderToolCall | ✅ Katettu |
| FR11-FR15: Käyttäjähallinta | NextAuth.js + Google OAuth + JWT | ✅ Katettu |
| FR16-FR19: Virheenkäsittely | Error boundaries + retry + graceful degradation | ✅ Katettu |
| FR20-FR22: Käyttöliittymä | Responsive Tailwind + shadcn/ui | ✅ Katettu |
| NFR1-2: Vasteaika (<3s, <1s) | Streaming + Edge Functions | ✅ Katettu |
| NFR5-8: Turvallisuus | JWT + HTTPS + env vars + secure cookies | ✅ Katettu |
| NFR9-11: Skaalautuvuus | Vercel auto-scaling + stateless design | ✅ Katettu |
| NFR12-14: Integraatiot | Retry + caching + circuit breaker pattern | ✅ Katettu |

### Architecture Quality Checklist

| Kriteerit | Status |
|-----------|--------|
| Kaikki FR:t katettu | ✅ |
| Kaikki NFR:t katettu | ✅ |
| Selkeä kerrosarkkitehtuuri | ✅ |
| Nimeämiskonventiot määritelty | ✅ |
| Projektirakenne dokumentoitu | ✅ |
| Error handling -strategia | ✅ |
| Ympäristömuuttujat listattu | ✅ |
| Deployment-strategia | ✅ |

## Summary & Next Steps

### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│              BUSINESS RESEARCH PORTAL                        │
│                   Architecture v1.0                          │
├─────────────────────────────────────────────────────────────┤
│  FRONTEND                                                    │
│  • Next.js 14+ (App Router, Server Components)              │
│  • React 18+ with TypeScript                                │
│  • Tailwind CSS + shadcn/ui                                 │
│  • CopilotKit React (streaming UI)                          │
├─────────────────────────────────────────────────────────────┤
│  BACKEND                                                     │
│  • Next.js API Routes (Edge Runtime)                        │
│  • CopilotKit Runtime                                       │
│  • NextAuth.js (authentication)                             │
├─────────────────────────────────────────────────────────────┤
│  INTEGRATIONS                                                │
│  • Claude API (Anthropic) - AI reasoning                    │
│  • YTJ API - Company basic info                             │
│  • PRH API - Financial data                                 │
│  • Claude Web Search - News                                 │
├─────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE                                              │
│  • Vercel (hosting, edge, auto-scaling)                     │
│  • Environment-based configuration                          │
└─────────────────────────────────────────────────────────────┘
```

### Implementation Sequence

| Vaihe | Tehtävä | Riippuvuudet |
|-------|---------|--------------|
| 1 | Projektin alustus (`create-next-app` + deps) | - |
| 2 | shadcn/ui setup + base components | Vaihe 1 |
| 3 | NextAuth.js + Google OAuth | Vaihe 1 |
| 4 | CopilotKit runtime + tool definitions | Vaihe 1 |
| 5 | YTJ/PRH/News services | Vaihe 4 |
| 6 | Search UI + Agent progress components | Vaihe 2, 4 |
| 7 | Result cards + tool renderers | Vaihe 5, 6 |
| 8 | Error handling + polish | Vaihe 7 |
| 9 | Testing + Vercel deployment | Vaihe 8 |

### Handoff to Development

Arkkitehtuuri on valmis toteutukseen. Seuraavat dokumentit ovat käytettävissä:

- **PRD** (`docs/prd.md`) - Vaatimukset ja user stories
- **UX Design** (`docs/ux-design.md`) - Visuaalinen suunnittelu
- **Architecture** (`docs/architecture.md`) - Tekninen arkkitehtuuri

**Suositus:** Aloita Epic 1 / Story 1.1 (Project Setup) PRD:n mukaisesti.

