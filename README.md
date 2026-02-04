# Business Research Portal

AI-agentti-portaali yritysten tutkimiseen. Käyttäjä näkee reaaliajassa miten agentti tutkii yrityksiä.

## Tech Stack

- **Frontend:** Next.js 14+, React 18+, TypeScript, Tailwind CSS
- **AI/Agentti:** CopilotKit SDK, Claude API
- **Kehitysmetodi:** BMAD Method
- **Integraatiot:** YTJ API, PRH API, Claude Web Search
- **Deployment:** Vercel

## Kehitys

Projekti toteutetaan BMAD-metodilla. Dokumentaatio löytyy `docs/`-kansiosta.

### BMAD-agentit

- **Analyst** - Project Brief
- **PM** - PRD (Product Requirements Document)
- **UX-designer** - UX Design
- **Architect** - Technical Architecture
- **SM** - Scrum Master, storyn valinta
- **Dev** - Toteutus
- **Quinn** - QA Review

### Aloitus

```bash
# Asenna riippuvuudet (kun Next.js-projekti luotu)
npm install

# Käynnistä kehityspalvelin
npm run dev
```

## Dokumentaatio

```
docs/
├── project-brief.md    # Analyst
├── prd.md              # PM
├── ux-design.md        # UX-designer
├── architecture.md     # Architect
├── epics/              # PO shardaus
├── stories/            # User stories
└── qa/                 # QA reviews
```

## Lisenssi

MIT License
