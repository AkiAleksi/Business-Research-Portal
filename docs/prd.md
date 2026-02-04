---
stepsCompleted: [step-01-init, step-02-discovery, step-03-success, step-04-journeys, step-05-domain, step-06-innovation, step-07-project-type, step-08-scoping, step-09-functional, step-10-nonfunctional, step-11-polish, step-12-complete]
inputDocuments: [docs/project-brief.md]
workflowType: 'prd'
date: 2026-02-03
author: Aki
projectName: Business Research Portal
classification:
  projectType: Web Application / SaaS
  domain: Business Intelligence / Sales Tech
  complexity: Medium-High
  projectContext: Greenfield
techStack:
  frontend: Next.js 14+, React 18+, TypeScript, Tailwind CSS
  ai: CopilotKit SDK, Claude API, Tool definitions
  method: BMAD Method, Claude Code
  integrations: YTJ API, PRH API, Claude Web Search
  deployment: Vercel tai Firebase Hosting
targetUsers:
  - Myyntitiimit
  - Sijoittajat
  - Konsultit
  - M&A-tiimit
  - Hankinta
---

# Product Requirements Document - Business Research Portal

**Author:** Aki
**Date:** 2026-02-03

---

## Executive Summary

**Business Research Portal** on visuaalinen AI-agentti-portaali, jossa käyttäjä näkee reaaliajassa miten agentti tutkii yrityksiä. Toteutetaan AG-UI/CopilotKit-teknologialla ja BMAD-metodilla.

### Ongelma

Yritystiedon tutkiminen on työlästä: tieto on hajallaan (YTJ, PRH, Google, LinkedIn), kerääminen vie tunteja ja lopputulos on usein epätarkka.

### Ratkaisu

Yksi interaktiivinen näkymä, jossa AI-agentti hakee ja koostaa yritystiedon reaaliajassa. Käyttäjä näkee agentin työskentelyprosessin läpinäkyvästi.

### Kohderyhmä

Myyntitiimit, sijoittajat, konsultit, M&A-tiimit, hankinta – ammattilaiset jotka tarvitsevat nopeaa yritystietoa päätöksentekoon.

### MVP (Phase 1)

| Ominaisuus | Teknologia |
|------------|------------|
| Yrityksen haku | Hakukenttä + AI-agentti |
| Perustiedot | YTJ API |
| Taloustiedot | PRH API |
| Uutiset | Claude Web Search |
| Agentin visualisointi | CopilotKit streaming UI |
| Kirjautuminen | NextAuth/Clerk |

### Onnistumisen mittarit

- **North Star:** Ajansäästö 3h → 5min per prospekti
- **3kk:** 50–100 aktiivista käyttäjää
- **12kk:** 500+ käyttäjää, ≥70% viikoittain aktiivisia

### Tech Stack

Next.js 14+ | React 18+ | TypeScript | Tailwind CSS | CopilotKit SDK | Claude API | Vercel

---

## Success Criteria

### User Success

| Mittari | Tavoite | Mittaustapa |
|---------|---------|-------------|
| **Ajansäästö** | 3h → 5min per prospekti | Käyttäjähaastattelut |
| **Agentin seuranta** | Käyttäjä näkee reaaliajassa mitä agentti tekee | UX-testaus |
| **Luottamus tuloksiin** | Läpinäkyvyys luo ymmärrystä ja luottamusta | NPS, palaute |
| **Hakujen määrä** | ≥3 hakua / käyttäjä / päivä | Analytics |

**Onnistumisen hetki:** Käyttäjä syöttää yrityksen nimen → **näkee reaaliajassa agentin työskentelyprosessin** ("Haen YTJ:stä...", "Analysoin taloustietoja...", "Etsin uutisia...") → saa koostetut tiedot → "Tämä toimii!"

### Business Success

| Aikajänne | Tavoite |
|-----------|---------|
| **3kk** | 50–100 aktiivista käyttäjää, pilotti käynnissä |
| **12kk** | 500+ käyttäjää, ≥70% viikoittain aktiivisia, kasvava MRR |
| **NPS** | ≥30 (3kk) → ≥50 (12kk) |

### Technical Success (AG-UI/CopilotKit)

| Mittari | Tavoite |
|---------|---------|
| **Agentin visualisointi** | Reaaliaikainen streaming UI (CopilotKit) |
| **Tool-kutsujen näkyvyys** | Käyttäjä näkee jokaisen vaiheen |
| **Vasteaika** | Ensimmäinen tulos < 1s, kokonaisuus < 3s |
| **Uptime** | 99% (pilotti) → 99,9% (tuotanto) |
| **API-luotettavuus** | ≥95% (YTJ, PRH, uutiset) |

### Measurable Outcomes

- **North Star Metric:** Ajansäästö per prospekti (3h → 5min)
- **Leading Indicator:** Päivittäisten hakujen määrä
- **Lagging Indicator:** Viikoittain aktiivisten osuus

---

## Product Scope

### MVP - Minimum Viable Product

**Valmis kun:**
- ✅ Käyttäjä syöttää yrityksen nimen
- ✅ **AG-UI näyttää reaaliajassa agentin työskentelyprosessin**
- ✅ Agentti hakee: perustiedot, taloustiedot, uutiset
- ✅ Tiedot yhdessä visuaalisessa näkymässä
- ✅ CopilotKit streaming toimii sujuvasti
- ✅ Vasteaika < 3s

**Pilotti:** 5–10 myyjää / tiimi testaa ja antaa palautetta

### Growth Features (Post-MVP)

- CRM-integraatio (Salesforce, HubSpot)
- Kilpailijavertailu
- Tallennetut haut ja seuranta
- Tiimikäyttö ja jaetut näkymät

### Vision (Future)

- Riskianalyysi ja ennakoivat suositukset
- Kansainväliset yritykset
- Automatisoidut raportit
- Ekosysteemi ja yhteistyöominaisuudet

---

## User Journeys

### Journey 1: Mikko – Prospektin tutkiminen (Happy Path)

**Avauskohtaus:**
Mikko aloittaa aamunsa CRM:ssä. Huomiseen on sovittu tapaaminen Acme Oy:n kanssa, mutta hänellä ei ole kunnollista kuvaa yrityksestä.

**Nouseva toiminta:**
1. Mikko avaa Business Research Portalin
2. Kirjoittaa hakukenttään "Acme Oy"
3. **Näkee reaaliajassa miten AI-agentti työskentelee:**
   - "🔍 Haen perustietoja YTJ:stä..."
   - "📊 Analysoin taloustietoja PRH:sta..."
   - "📰 Etsin viimeisimpiä uutisia..."

**Huippukohta:**
Muutamassa sekunnissa Mikko näkee yhden visuaalisen näkymän:
- Perustiedot: toimiala, koko, sijainti, yhteystiedot
- Taloustiedot: liikevaihto, tulos, trendit
- Uutiset: viimeisimmät maininnat, yrityskaupat, yt:t

**Ratkaisu:**
Mikko on valmistautunut tapaamiseen 5 minuutissa. Hän tietää mitä kysyä ja voi keskittyä arvon tuottamiseen.

> *"Ennen käytin tunteja. Nyt saan kaiken yhdestä paikasta. Tämä on juuri mitä tarvitsin!"*

---

### Journey 2: Mikko – Kilpailijan tutkiminen

**Tilanne:** Asiakas mainitsee käyttävänsä kilpailijaa. Mikko haluaa ymmärtää kilpailijan tilanteen.

**Matka:**
1. Kirjoittaa kilpailijan nimen
2. Näkee taloustiedot, uutiset, mahdolliset ongelmat
3. Löytää argumentteja omalle ratkaisulleen

> *"Nyt tiedän miten erottua kilpailijasta."*

---

### Journey 3: Mikko – Kumppanin/alihankkijan arviointi

**Tilanne:** Tiimi harkitsee yhteistyötä uuden kumppanin kanssa.

**Matka:**
1. Tutkii potentiaalisen kumppanin taustat
2. Tarkistaa taloudellisen vakauden ja uutiset
3. Tekee perustellun suosituksen tiimille

> *"Voimme luottaa tähän kumppaniin – tai ei."*

---

### Journey 4: Edge Case – Virhetilanteet

| Tilanne | Käyttäjälle näytetään |
|---------|----------------------|
| **Ei tuloksia** | "Ei tuloksia. Tarkista kirjoitusasu tai kokeile toista yritystä." |
| **Osittaiset tiedot** | Näytetään mitä löytyi, merkitään puuttuvat |
| **API-virhe** | "Lataus epäonnistui. [Yritä uudelleen]" |

Kaikki virheet kirjataan sisäiseen lokiin seurantaa varten.

---

### Journey Requirements Summary

| Käyttötapaus | Vaatimukset |
|--------------|-------------|
| **Prospektin tutkiminen** | Perustiedot, talous, uutiset, nopeus |
| **Kilpailijan tutkiminen** | Sama data, fokus heikkouksiin/uutisiin |
| **Kumppanin arviointi** | Taloudellinen vakaus, riskit |
| **Virhetilanteet** | Selkeät viestit, retry, osittaiset tulokset |

### Tulevat matkat (Post-MVP)

| Käyttäjä | Tarve | Vaihe |
|----------|-------|-------|
| **Admin/Tiimin vetäjä** | Käyttäjien hallinta, tilastot | V2 |
| **Sijoittaja/Analyytikko** | Taloustiedot, riskit, trendit | V2 |

---

## Innovation & Novel Patterns

### Detected Innovation Areas

| Innovaatio | Kuvaus | Miksi merkittävä |
|------------|--------|------------------|
| **Visuaalinen AI-agentti** | Käyttäjä näkee reaaliajassa agentin työskentelyprosessin | Luo luottamusta, ymmärrystä ja läpinäkyvyyttä AI:n toimintaan |
| **AG-UI/CopilotKit** | Reaaliaikainen streaming UI agentin tool-kutsuille | Moderni agentti-UI-teknologia, ei "black box" |
| **Prosessin näkyvyys** | "Haen YTJ:stä...", "Analysoin taloustietoja..." | Käyttäjä ymmärtää mistä tieto tulee |

### Erottautuminen kilpailijoista

| Perinteinen työkalu | Business Research Portal |
|---------------------|--------------------------|
| "Odota... tässä tulokset" | "Katso miten tutkin yritystä..." |
| Black box -haku | Läpinäkyvä agentin työskentely |
| Staattiset tulokset | Reaaliaikainen streaming |
| Epäselvä lähde | Selkeät lähdemerkinnät (YTJ, PRH, uutiset) |

### Validation Approach

- **Pilottitestaus:** 5–10 myyjää arvioivat luottamuksen ja ymmärryksen kasvua
- **A/B-testaus:** Streaming UI vs. perinteinen "loading" – kumpi luo enemmän luottamusta?
- **NPS-mittaus:** Koetaanko läpinäkyvyys arvokkaana?

### Risk Mitigation

| Riski | Mitigaatio |
|-------|------------|
| Streaming liian hidas | Optimoitu CopilotKit-konfiguraatio, edge-palvelimet |
| Liikaa informaatiota | Selkeä visuaalinen hierarkia, progress-indikaattorit |
| Käyttäjät eivät välitä prosessista | Vaihtoehto: "näytä vain tulokset" |

---

## Web Application / SaaS Specific Requirements

### Project-Type Overview

| Kategoria | Teknologia |
|-----------|------------|
| **Frontend** | Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS |
| **AI/Agentti** | CopilotKit SDK, Claude API, Tool definitions |
| **Autentikointi** | NextAuth tai Clerk (yksinkertainen kirjautuminen) |
| **Integraatiot** | YTJ API, PRH API, Claude Web Search |
| **Deployment** | Vercel |

### Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│              Next.js 14+ (App Router)                       │
│         React 18+ / TypeScript / Tailwind CSS               │
├─────────────────────────────────────────────────────────────┤
│                     COPILOTKIT UI                           │
│         Streaming UI / Agent Visualization                  │
│              Tool Progress Indicators                       │
├─────────────────────────────────────────────────────────────┤
│                      AI AGENT                               │
│                   Claude API (Opus)                         │
│                                                             │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │ searchYTJ   │  │ searchPRH   │  │ searchNews  │        │
│   │ Tool        │  │ Tool        │  │ Tool        │        │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
│          │                │                │                │
│          ▼                ▼                ▼                │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│   │   YTJ API   │  │   PRH API   │  │ Claude Web  │        │
│   │  (perus)    │  │  (talous)   │  │  Search     │        │
│   └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Tool Definitions (CopilotKit)

| Tool | Kuvaus | Input | Output |
|------|--------|-------|--------|
| `searchYTJ` | Hakee yrityksen perustiedot | `companyName: string` | Nimi, Y-tunnus, toimiala, osoite |
| `searchPRH` | Hakee taloustiedot | `businessId: string` | Liikevaihto, tulos, velat |
| `searchNews` | Hakee viimeisimmät uutiset | `companyName: string` | Uutisotsikot, päivämäärät, linkit |

### Authentication (MVP)

| Ominaisuus | Toteutus |
|------------|----------|
| **Kirjautuminen** | NextAuth tai Clerk |
| **Metodit** | Email/salasana, Google OAuth |
| **Sessio** | JWT-token |
| **Roolit** | MVP: vain "user" (admin V2:ssa) |

### Implementation Considerations

| Huomio | Ratkaisu |
|--------|----------|
| **API Rate Limits** | Caching, request queuing |
| **Error Handling** | Graceful degradation, retry-logiikka |
| **Streaming** | CopilotKit SSE, edge runtime |
| **Environment** | API-avaimet Vercel env variables |

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP – ratkaistaan ydinongelma (hajallaan oleva yritystieto) mahdollisimman nopeasti ja yksinkertaisesti.

**Resource Requirements:** 1 full-stack kehittäjä + Claude Code (BMAD Method)

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Prospektin tutkiminen (Happy Path)
- Kilpailijan tutkiminen
- Kumppanin arviointi
- Virhetilanteiden käsittely

**Must-Have Capabilities:**

| Ominaisuus | Prioriteetti |
|------------|--------------|
| Hakukenttä (yrityksen nimi) | P0 |
| AI-agentin visualisointi (CopilotKit streaming) | P0 |
| Perustiedot (YTJ API) | P0 |
| Taloustiedot (PRH API) | P0 |
| Uutiset (Claude Web Search) | P0 |
| Yksinkertainen kirjautuminen (NextAuth/Clerk) | P0 |
| Virheenkäsittely ja retry | P0 |

### Post-MVP Features

**Phase 2 (Growth):**
- CRM-integraatio (Salesforce, HubSpot)
- Tallennetut haut ja seuranta
- Kilpailijavertailu
- Tiimikäyttö ja jaetut näkymät

**Phase 3 (Expansion):**
- Riskianalyysi ja ennakoivat suositukset
- Kansainväliset yritykset
- Automatisoidut raportit
- Admin-toiminnot ja käyttäjähallinta

### Risk Mitigation Strategy

| Riski | Tyyppi | Mitigaatio |
|-------|--------|------------|
| API-integraatiot eivät toimi | Tekninen | Mockit kehityksessä, fallback-data |
| CopilotKit streaming hidas | Tekninen | Edge runtime, optimointi |
| Käyttäjät eivät löydä arvoa | Markkina | Pilotti 5-10 myyjällä, nopea iterointi |
| Resurssipula | Resurssi | MVP voidaan rakentaa 1 kehittäjällä |

---

## Functional Requirements

### Yritystutkimus (Core)

- FR1: Käyttäjä voi syöttää yrityksen nimen hakukenttään
- FR2: Käyttäjä voi käynnistää haun painikkeella tai Enterillä
- FR3: Käyttäjä voi nähdä yrityksen perustiedot (nimi, Y-tunnus, toimiala, osoite)
- FR4: Käyttäjä voi nähdä yrityksen taloustiedot (liikevaihto, tulos, velat)
- FR5: Käyttäjä voi nähdä yrityksen viimeisimmät uutiset
- FR6: Käyttäjä voi nähdä tietojen lähteet ja aikaleiman

### AI-agentin visualisointi

- FR7: Käyttäjä voi nähdä reaaliajassa agentin työskentelyprosessin
- FR8: Käyttäjä voi nähdä mitä tietolähdettä agentti kulloinkin käyttää
- FR9: Käyttäjä voi nähdä agentin tool-kutsujen edistymisen visuaalisesti
- FR10: Käyttäjä voi nähdä milloin haku on valmis

### Käyttäjähallinta

- FR11: Käyttäjä voi rekisteröityä palveluun
- FR12: Käyttäjä voi kirjautua sisään sähköpostilla ja salasanalla
- FR13: Käyttäjä voi kirjautua sisään Google-tilillä
- FR14: Käyttäjä voi kirjautua ulos
- FR15: Käyttäjä voi palauttaa salasanansa

### Virheenkäsittely

- FR16: Käyttäjä voi nähdä selkeän viestin jos yritystä ei löydy
- FR17: Käyttäjä voi nähdä selkeän viestin jos haku epäonnistuu
- FR18: Käyttäjä voi yrittää hakua uudelleen virheen jälkeen
- FR19: Käyttäjä voi nähdä osittaiset tulokset jos jokin tietolähde epäonnistuu

### Käyttöliittymä

- FR20: Käyttäjä voi käyttää palvelua desktop-selaimella
- FR21: Käyttäjä voi käyttää palvelua mobiiliselaimella (responsiivinen)
- FR22: Käyttäjä voi nähdä lataustilanteen haun aikana

---

## Non-Functional Requirements

### Performance

- NFR1: Haun kokonaisvasteaika < 3 sekuntia
- NFR2: Ensimmäinen streaming-vastaus < 1 sekunti
- NFR3: UI-renderöinti < 100ms interaktioille
- NFR4: Sivun latausaika < 2 sekuntia (LCP)

### Security

- NFR5: Autentikointi JWT-tokenilla ja secure cookies
- NFR6: API-avaimet ympäristömuuttujissa, ei koskaan clientissa
- NFR7: Kaikki liikenne HTTPS-salattua
- NFR8: Automaattinen uloskirjaus 24h inaktiivisuuden jälkeen

### Scalability

- NFR9: MVP tukee 100 samanaikaista käyttäjää
- NFR10: 12kk kohdalla tuki 1000 samanaikaiselle käyttäjälle
- NFR11: Vercel auto-scaling käytössä

### Integration

- NFR12: API-integraatioiden luotettavuus ≥95% onnistuneita kutsuja
- NFR13: Graceful degradation – osittaiset tulokset jos API epäonnistuu
- NFR14: Rate limiting – jonoutus ja retry-logiikka ulkoisille API:lle

### Reliability

- NFR15: Uptime MVP/pilotti ≥99%
- NFR16: Uptime tuotanto ≥99.9%
- NFR17: Kaikki virheet lokitetaan seurantaa varten

