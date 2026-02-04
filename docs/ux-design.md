---
stepsCompleted: [step-01-init, step-02-discovery, step-03-core-experience, step-04-emotional-response, step-05-inspiration, step-06-design-system, step-07-defining-experience, step-08-visual-foundation, step-09-design-directions, step-10-user-journeys, step-11-component-strategy, step-12-ux-patterns, step-13-responsive-accessibility, step-14-complete]
inputDocuments: [docs/prd.md, docs/project-brief.md]
workflowType: 'ux-design'
date: 2026-02-04
author: Aki
projectName: Business Research Portal
---

# UX Design Specification - Business Research Portal

**Author:** Aki
**Date:** 2026-02-04

---

## Executive Summary

### Project Vision

Visuaalinen AI-agentti-portaali jossa käyttäjä näkee reaaliajassa miten agentti tutkii yrityksiä. Muuttaa 3 tunnin manuaalisen prospektitutkimuksen 5 minuutin interaktiiviseksi kokemukseksi. Erottautuu kilpailijoista läpinäkyvällä agentin työskentelyprosessilla.

### Target Users

**Pääkäyttäjä: Mikko - B2B-myyjä**
- Tutkii prospekteja ennen tapaamisia ja puheluita
- Turhautuu hajallaan olevaan tietoon (YTJ, LinkedIn, PRH, Google)
- Teknisesti keskitasoa, käyttää CRM:ää päivittäin
- Desktop-painotteinen työpöytäkäyttö, mobiilitarve kentällä

**Toissijaiset käyttäjät:** Sijoittajat, konsultit, M&A-tiimit, hankinta

### Key Design Challenges

| Haaste | Kuvaus |
|--------|--------|
| **Läpinäkyvyys vs. infoähky** | Miten näyttää AI:n työskentelyprosessi selkeästi ilman kognitiivista ylikuormitusta? |
| **Luottamuksen rakentaminen** | Miten käyttäjä luottaa AI:n tuloksiin? Lähdemerkinnät ja prosessin näkyvyys kriittisiä |
| **Nopeus vs. syvyys** | Käyttäjä haluaa nopeita tuloksia, mutta myös kattavia tietoja |
| **Graceful degradation** | API:t voivat epäonnistua - miten näyttää osittaiset tulokset ja virheet selkeästi? |

### Design Opportunities

| Mahdollisuus | Kuvaus |
|--------------|--------|
| **"Katso kun tutkin"** | Uniikki kilpailuetu: kukaan muu ei näytä agentin prosessia näin visuaalisesti |
| **Streaming delight** | Reaaliaikainen UI luo "taikuuden" ja välittömyyden tunteen |
| **Radikaali yksinkertaisuus** | Yksi hakukenttä → kaikki tieto = voimakas, selkeä arvolupaus |

## Core User Experience

### Defining Experience

**Ydininteraktio:** Käyttäjä syöttää yrityksen nimen → näkee agentin työskentelyprosessin reaaliajassa → saa koostetut tulokset sekunneissa.

**Kriittinen flow:**
```
[Hakukenttä] → [Streaming-prosessi] → [Tulokset korteissa]
```

Tämä on sovelluksen "make or break" -hetki. Jos tämä toimii sujuvasti, kaikki muu seuraa.

### Platform Strategy

| Alusta | Prioriteetti | Huomiot |
|--------|--------------|---------|
| **Desktop web** | P0 (MVP) | Pääkäyttöympäristö, laaja näyttö tuloksille |
| **Tablet web** | P1 | Responsiivinen, sama koodi |
| **Mobile web** | P1 | Kenttäkäyttö, yksinkertaistettu näkymä |
| **Native app** | P3 (tulevaisuus) | Ei MVP:ssä |

### Effortless Interactions

| Interaktio | Miten tehdään vaivattomaksi |
|------------|------------------------------|
| **Haku** | Yksi kenttä, Enter käynnistää, autocomplete |
| **Tulosten selaus** | Progressiivinen lataus, ei sivutusta |
| **Lähteen tarkistus** | Hover/click näyttää lähteen inline |
| **Uusi haku** | Kenttä aina näkyvissä, yksi click tyhjentää |

### Critical Success Moments

1. **"Tämä toimii!"** - Ensimmäinen onnistunut haku, tulokset sekunneissa
2. **"Näen mitä tapahtuu"** - Agentin streaming-prosessi näkyy selkeästi
3. **"Voin luottaa tähän"** - Lähteet näkyvissä, tieto ajantasaista
4. **"Säästin aikaa"** - Kaikki tieto yhdessä paikassa, ei manuaalista etsintää

### Experience Principles

| Periaate | Kuvaus |
|----------|--------|
| **"Näe työ"** | Agentin prosessi on aina näkyvissä - ei black boxia |
| **"Yksi syöte"** | Minimoi käyttäjän vaivannäkö - yksi hakukenttä riittää |
| **"Progressiivinen paljastus"** | Tulokset ilmestyvät sitä mukaa kun valmistuvat |
| **"Luotettavuus ensin"** | Jokainen tieto näyttää lähteensä ja aikaleiman |

## Desired Emotional Response

### Primary Emotional Goals

**Päätunne: "Voimaantunut ja tehokas"**

Käyttäjän pitäisi tuntea, että hänellä on superkyvyt - hän näkee kaiken mitä tarvitsee hetkessä. Tämä tunne erottaa Business Research Portalin kilpailijoista.

### Emotional Journey Mapping

| Vaihe | Tunne | Kuvaus |
|-------|-------|--------|
| **Aloitus** | Uteliaisuus | "Toimiikohan tämä?" - matala kynnys kokeilla |
| **Haku käynnissä** | Ihmetys/Jännitys | "Vau, se tekee työtä puolestani!" - streaming luo taikuutta |
| **Tulokset** | Tyytyväisyys | "Just näin! Kaikki mitä tarvitsin" - arvolupaus lunastettu |
| **Paluu** | Luottamus | "Käytän tätä taas" - toistuvuus rakentuu |

### Micro-Emotions

| Tavoitetunne | Vältettävä tunne | Miten UX tukee |
|--------------|------------------|----------------|
| **Luottamus** | Epäluottamus | Lähteet näkyvissä, prosessi läpinäkyvä |
| **Hallinta** | Epävarmuus | Selkeät tilaindikaattorit, ei "black boxia" |
| **Ilo/Delight** | Tylsyys | Streaming-animaatiot, progressiivinen lataus |
| **Tyytyväisyys** | Turhautuminen | Nopea vastaus, selkeät virheviestit |
| **Fokus** | Ylikuormitus | Siisti layout, yksi asia kerrallaan |

### Design Implications

| Tunnetavoite | UX-ratkaisu |
|--------------|-------------|
| Luottamus → | Jokaisessa tiedossa lähdemerkintä ja aikaleima |
| Ihmetys → | Animoitu streaming-prosessi, tool-visualisoinnit |
| Hallinta → | Progress-indikaattorit, selkeät tilat (loading/complete/error) |
| Tyytyväisyys → | Kaikki tieto yhdessä näkymässä, ei navigointia |

### Emotional Design Principles

1. **"Läpinäkyvyys luo luottamusta"** - Näytä aina mitä tapahtuu ja mistä tieto tulee
2. **"Nopeus luo iloa"** - Ensimmäinen tulos < 1s, streaming pitää käyttäjän engaged
3. **"Yksinkertaisuus luo hallinnan tunnetta"** - Yksi fokus kerrallaan, ei häiriötekijöitä
4. **"Onnistuminen luo tyytyväisyyttä"** - Varmista että käyttäjä saa aina jotain hyödyllistä

## UX Pattern Analysis & Inspiration

### Inspiring Products Analysis

| Tuote | Mitä tekee hyvin | Opittavaa Business Research Portaliin |
|-------|------------------|---------------------------------------|
| **Perplexity AI** | Näyttää lähteet inline hakutulosten seassa, streaming-vastaukset reaaliajassa | Läpinäkyvyys ja lähdemerkinnät - jokainen tieto viittaa lähteeseen |
| **Linear** | Minimalistinen UI, äärimmäinen nopeus, keyboard-first lähestyminen | Radikaali yksinkertaisuus - yksi fokus, ei häiriötekijöitä |
| **Vercel** | Deployment-prosessin visualisointi reaaliajassa, selkeät tilat | Prosessin näyttäminen - käyttäjä näkee mitä tapahtuu |
| **Notion AI** | AI-avustaja integroituna suoraan työhön, ei erillinen chat | AI osana flowia - ei "mene chattiin" -mallia |

### Transferable UX Patterns

**Prosessin visualisointi (Vercel-inspiratio):**
- Selkeät tilaindikaattorit: ✓ valmis, ● käynnissä, ○ odottaa
- Progress bar tai prosentti näkyvissä
- Streaming-teksti kertoo mitä tapahtuu

**Lähteet inline (Perplexity-inspiratio):**
- Numeroidut lähdeviitteet tiedon perässä [1], [2]
- Hover/click näyttää lähteen tiedot
- Lähdelista näkymän lopussa

**Hakukenttä (Linear-inspiratio):**
- Cmd+K / Ctrl+K pikakäynnistys
- Autocomplete-ehdotukset kirjoittaessa
- Viimeisimmät haut helposti saatavilla
- Enter käynnistää haun välittömästi

### Anti-Patterns to Avoid

| Anti-pattern | Miksi välttää | Miten vältetään |
|--------------|---------------|-----------------|
| **Chat-first UI** | Liikaa vaiheita, käyttäjä haluaa vastauksen heti | Suora haku → tulokset, ei keskustelua |
| **Modaalit tuloksille** | Katkaisee flown, ei skaalaudu isolle datalle | Tulokset samassa näkymässä, scrollattava |
| **"Loading..." ilman kontekstia** | Luo epävarmuutta, ei kerro edistymisestä | Streaming-prosessi näkyvissä aina |
| **Liikaa konfiguraatiota etukäteen** | Käyttäjä haluaa tuloksia, ei asetuksia | Oletusarvot toimivat, lisäasetukset piilossa |
| **Raskaat dashboardit** | Kognitiivinen ylikuorma, hidas lataus | Yksi yritys kerrallaan, minimalistinen UI |

### Design Inspiration Strategy

| Strategia | Toteutus |
|-----------|----------|
| **Omaksutaan sellaisenaan** | Perplexity: inline-lähdemerkinnät numeroituina |
| **Omaksutaan sellaisenaan** | Vercel: prosessin visualisointi tilaindikaattoreilla |
| **Mukautetaan** | Linear-tyylinen minimalismi, mutta lämpimämpi värimaailma (sininen/oranssi) |
| **Mukautetaan** | Keyboard shortcuts, mutta myös selkeät painikkeet ei-power-usereille |
| **Vältetään** | ChatGPT-tyylinen chat-first lähestyminen |
| **Vältetään** | Vainu/ZoomInfo-tyylinen raskas dashboard |

## Design System Foundation

### Design System Choice

**Valittu: shadcn/ui + Tailwind CSS**

shadcn/ui on kokoelma uudelleenkäytettäviä komponentteja, jotka perustuvat Radix UI -primitiiveihin ja Tailwind CSS -tyylitykseen. Komponentit kopioidaan suoraan projektiin, mikä antaa täyden kontrollin.

### Rationale for Selection

| Peruste | Kuvaus |
|---------|--------|
| **Tailwind-natiivi** | Sopii suoraan PRD:ssä määriteltyyn tech stackiin |
| **Copy-paste malli** | Komponentit omassa koodissa, ei ulkoista riippuvuutta versioihin |
| **Radix-pohja** | Saavutettavuus (a11y) ja toiminnallisuus sisäänrakennettuna |
| **Minimalistinen estetiikka** | Linear-tyylinen siisti ulkoasu tukee projektin tavoitteita |
| **CopilotKit-yhteensopivuus** | Helppo integroida streaming-komponentteihin ja custom renderöintiin |
| **Aktiivinen kehitys** | Laaja yhteisö, hyvä dokumentaatio, jatkuva päivitys |

### Implementation Approach

```
Komponenttihierarkia:

shadcn/ui (pohja)
├── Peruskomponentit
│   ├── Button, Input, Card, Badge, Alert
│   ├── Skeleton (loading-tilat)
│   └── Progress (streaming-indikaattorit)
├── Layout-komponentit
│   ├── Container, Grid, Stack
│   └── Separator, Tabs
└── Custom-komponentit (projektispesifit)
    ├── AgentProgressIndicator
    ├── SourceBadge
    ├── CompanyInfoCard
    └── SearchInput (enhanced)
```

### Customization Strategy

| Osa-alue | Oletusarvo | Kustomointi |
|----------|------------|-------------|
| **Pääväri (Primary)** | Slate | Sininen (#3B82F6) - luottamus, ammattimaisuus |
| **Aksenttiväri (Accent)** | - | Oranssi (#F97316) - energia, toiminta |
| **Taustavärit** | White/Gray | Lämmin valkoinen, hienovaraiset sävyt |
| **Typografia** | System | Inter tai Geist - selkeys, modernismi |
| **Border radius** | 0.5rem | Pyöristetyt kulmat (0.75rem) - pehmeämpi ilme |
| **Animaatiot** | Subtle | Streaming-tuetut siirtymät, 150-300ms |

## Defining Experience

### The Core Interaction

**"Kirjoitat yrityksen nimen ja katsot kun AI tutkii sen puolestasi"**

Tämä on Business Research Portalin määrittelevä kokemus - se mitä käyttäjä kuvailisi kaverilleen. Kaikki muu UX-suunnittelu palvelee tätä ydininteraktiota.

### User Mental Model

| Nykyinen tapa (manuaalinen) | BRP:n tapa (automaattinen) |
|-----------------------------|----------------------------|
| Avaa YTJ → hae → kopioi tiedot | Yksi haku → kaikki kerralla |
| Avaa PRH → etsi tilinpäätös → lataa PDF | Taloustiedot automaattisesti mukana |
| Googlaa yritys + uutiset → selaa tuloksia | AI etsii ja koostaa uutiset |
| Koosta tiedot dokumenttiin | Valmis näkymä, lähdemerkinnöillä |
| **Kesto: ~3 tuntia** | **Kesto: ~30 sekuntia** |

**Käyttäjän odotus:** "Kerron mitä haluan tietää, järjestelmä hoitaa loput"

### Success Criteria

| Kriteeri | Tavoite | Miksi tärkeä |
|----------|---------|--------------|
| **Ensimmäinen vastaus** | < 1 sekunti | Välitön palaute luo luottamusta |
| **Kokonaisaika** | < 30 sekuntia | Merkittävä ajansäästö vs. manuaalinen |
| **Prosessin näkyvyys** | 100% vaiheista näkyy | Läpinäkyvyys rakentaa luottamusta |
| **Lähdemerkinnät** | Jokainen tieto viittaa lähteeseen | Käyttäjä voi tarkistaa ja luottaa |
| **Virheenkäsittely** | Graceful degradation | Osittaisetkin tulokset ovat hyödyllisiä |

### Experience Mechanics

```
┌─────────────────────────────────────────────────────────────┐
│ 1. ALOITUS                                                  │
│    └─ Käyttäjä kirjoittaa hakukenttään: "Acme Oy"          │
│    └─ Painaa Enter tai klikkaa "Tutki"                      │
├─────────────────────────────────────────────────────────────┤
│ 2. STREAMING-PROSESSI (reaaliajassa)                        │
│    ├─ 🔍 "Haen perustietoja YTJ:stä..."     → ✓ Valmis     │
│    ├─ 📊 "Haen taloustietoja PRH:sta..."    → ● Käynnissä  │
│    └─ 📰 "Etsin viimeisimpiä uutisia..."    → ○ Odottaa    │
├─────────────────────────────────────────────────────────────┤
│ 3. PROGRESSIIVINEN PALAUTE                                  │
│    └─ Tuloskortit ilmestyvät sitä mukaa kun data valmistuu │
│    └─ Käyttäjä voi lukea jo valmiita osia                   │
├─────────────────────────────────────────────────────────────┤
│ 4. VALMIS                                                   │
│    └─ Kaikki kolme korttia näkyvissä                        │
│    └─ Lähteet merkitty [1], [2], [3]                        │
│    └─ Hakukenttä valmis uuteen hakuun                       │
└─────────────────────────────────────────────────────────────┘
```

### Novel UX Pattern

**Innovaatio:** "Transparent AI Agent" -pattern

Tämä yhdistää tutun hakukokemuksen (Google-tyylinen yksi kenttä) uuteen elementtiin (näkyvä AI-prosessi). Käyttäjän ei tarvitse oppia uutta - haku toimii kuten odotettu - mutta hän saa lisäarvoa näkemällä mitä "konepellin alla" tapahtuu.

| Tuttu elementti | Uusi elementti |
|-----------------|----------------|
| Hakukenttä + Enter | Streaming-prosessin visualisointi |
| Tuloskortit | Progressiivinen ilmestyminen |
| Lähdelinkit | Inline-lähdemerkinnät numeroituina |

## Visual Design Foundation

### Color System

**Väripaletti** perustuu tunnetavoitteisiin: luottamus (sininen), energia (oranssi), selkeys (neutraalit).

| Rooli | Värikoodi | Tailwind | Käyttö |
|-------|-----------|----------|--------|
| **Primary** | `#3B82F6` | blue-500 | Pääpainikkeet, linkit, aktiiviset tilat |
| **Primary Dark** | `#2563EB` | blue-600 | Hover-tilat |
| **Accent** | `#F97316` | orange-500 | CTA:t, korostukset |
| **Success** | `#22C55E` | green-500 | ✓ Valmis -tilat, onnistumiset |
| **Warning** | `#EAB308` | yellow-500 | Varoitukset |
| **Error** | `#EF4444` | red-500 | Virhetilat |
| **Background** | `#FAFAFA` | gray-50 | Sivun tausta |
| **Surface** | `#FFFFFF` | white | Kortit, paneelit |
| **Border** | `#E5E7EB` | gray-200 | Reunaviivat |
| **Text Primary** | `#1F2937` | gray-800 | Otsikot, leipäteksti |
| **Text Secondary** | `#6B7280` | gray-500 | Toissijainen teksti, lähteet |
| **Text Muted** | `#9CA3AF` | gray-400 | Placeholder, disabled |

### Typography System

**Fontti:** Inter (Google Fonts) - selkeä, moderni, erinomainen luettavuus

| Elementti | Koko | Paino | Line Height | Käyttö |
|-----------|------|-------|-------------|--------|
| **Display** | 36px | 700 | 1.2 | Hero-otsikot |
| **H1** | 30px | 600 | 1.3 | Sivuotsikot |
| **H2** | 24px | 600 | 1.35 | Osio-otsikot |
| **H3** | 18px | 500 | 1.4 | Korttien otsikot |
| **Body** | 16px | 400 | 1.5 | Leipäteksti |
| **Body Small** | 14px | 400 | 1.5 | Toissijainen teksti |
| **Caption** | 12px | 400 | 1.4 | Lähdemerkinnät, aikaleima |
| **Label** | 14px | 500 | 1.4 | Lomakkeiden labelit |

### Spacing & Layout Foundation

**Spacing-asteikko** (4px pohja):

| Token | Arvo | Käyttö |
|-------|------|--------|
| `space-0.5` | 2px | Minimaalinen |
| `space-1` | 4px | Badge padding, icon gap |
| `space-2` | 8px | Tiukat välit |
| `space-3` | 12px | Komponenttien sisäiset |
| `space-4` | 16px | Oletusväli |
| `space-5` | 20px | Korttien padding |
| `space-6` | 24px | Osioiden välit |
| `space-8` | 32px | Suuret välit |
| `space-12` | 48px | Sivuosioiden välit |

**Layout-tokenit:**

| Token | Arvo | Käyttö |
|-------|------|--------|
| `radius-sm` | 4px | Pienet elementit (badge) |
| `radius` | 8px | Kortit, painikkeet |
| `radius-lg` | 12px | Modaalit, suuret kortit |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Hienovarainen |
| `shadow` | `0 4px 6px rgba(0,0,0,0.1)` | Kortit |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modaalit |

### Accessibility Considerations

| Vaatimus | Toteutus |
|----------|----------|
| **Kontrasti** | WCAG AA (4.5:1 teksti, 3:1 UI) |
| **Fokus** | Näkyvä focus ring (blue-500, 2px offset) |
| **Fonttikoko** | Min 14px, käyttäjä voi skaalata |
| **Värisokeus** | Ei pelkkään väriin perustuvia tiloja |
| **Keyboard** | Kaikki toiminnot saavutettavissa näppäimistöllä |

## User Journeys

### Primary Journey: Prospektin tutkiminen

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   SAAPUU     │───▶│    HAKEE     │───▶│   SEURAA     │───▶│    LUKEE     │
│              │    │              │    │              │    │              │
│ Tyhjä        │    │ Kirjoittaa   │    │ Näkee        │    │ Tuloskortit  │
│ hakukenttä   │    │ yrityksen    │    │ streaming-   │    │ valmiina     │
│ fokuksessa   │    │ nimen        │    │ prosessin    │    │              │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

**Onnistumispolku:**
1. Käyttäjä saapuu → hakukenttä on fokuksessa, valmis kirjoittamaan
2. Kirjoittaa yrityksen nimen → autocomplete ehdottaa (tulevaisuus)
3. Painaa Enter → streaming alkaa välittömästi
4. Seuraa prosessia → näkee mitä agentti tekee
5. Lukee tulokset → kortit ilmestyvät progressiivisesti
6. Valmis → voi aloittaa uuden haun tai sulkea

### Secondary Journeys

| Polku | Laukaisija | Käyttäjän toiminta | Järjestelmän vastaus |
|-------|------------|--------------------|-----------------------|
| **Uusi haku** | Käyttäjä haluaa tutkia toista yritystä | Tyhjentää kentän, kirjoittaa uuden | Vanhat tulokset häviävät, uusi haku alkaa |
| **Peruutus** | Käyttäjä haluaa keskeyttää | Painaa Escape tai X | Streaming pysähtyy, osittaiset tulokset näkyvissä |
| **Kirjautuminen** | Ensimmäinen käyttökerta | Klikkaa "Kirjaudu" | Ohjataan auth-flowiin |

### Error Journeys

| Virhetilanne | Käyttäjälle näytetään | Toimintamahdollisuus |
|--------------|------------------------|----------------------|
| **API-virhe (kaikki)** | "Haku epäonnistui. Palvelu ei vastaa." | [Yritä uudelleen] -painike |
| **Osittainen virhe** | Näytetään onnistuneet + "Taloustietoja ei saatavilla" | Voi jatkaa osittaisilla tiedoilla |
| **Ei tuloksia** | "Yritystä ei löytynyt. Tarkista kirjoitusasu." | Hakukenttä valmiina uuteen hakuun |
| **Verkkovirhe** | "Ei verkkoyhteyttä." | Automaattinen retry kun yhteys palaa |

## Component Strategy

### Component Hierarchy

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation (minimal MVP:ssä)
│   │   └── UserMenu (avatar, logout)
│   └── MainContent
│
├── SearchSection
│   ├── SearchInput
│   │   ├── Input (text)
│   │   ├── SearchButton
│   │   └── ClearButton
│   └── SearchSuggestions (post-MVP)
│
├── AgentSection
│   ├── AgentProgress
│   │   └── AgentStep (repeated)
│   │       ├── StepIcon (emoji/icon)
│   │       ├── StepLabel (mitä tehdään)
│   │       └── StepStatus (loading/done/error)
│   └── AgentSummary (optional)
│
└── ResultsSection
    ├── ResultsGrid
    │   ├── CompanyInfoCard
    │   │   ├── CardHeader (title + source badge)
    │   │   └── CardContent (data rows)
    │   ├── FinancialsCard
    │   │   ├── CardHeader
    │   │   └── CardContent (metrics, charts)
    │   └── NewsCard
    │       ├── CardHeader
    │       └── NewsList (news items)
    └── SourcesFooter (lähdeluettelo)
```

### Shared Components (shadcn/ui)

| Komponentti | Käyttö |
|-------------|--------|
| `Button` | Toimintopainikkeet |
| `Input` | Hakukenttä |
| `Card` | Tuloskortit |
| `Badge` | Lähdemerkinnät, statukset |
| `Skeleton` | Loading-tilat |
| `Alert` | Virheviestit |
| `Progress` | Streaming-indikaattori |

### Custom Components (projektispesifit)

| Komponentti | Vastuu |
|-------------|--------|
| `SearchInput` | Enhanced input with clear, keyboard shortcuts |
| `AgentProgress` | Streaming tool-calls visualization |
| `AgentStep` | Single step with status indicator |
| `CompanyInfoCard` | YTJ data display |
| `FinancialsCard` | PRH financial data |
| `NewsCard` | News list with sources |
| `SourceBadge` | Clickable source reference |

## UX Consistency Patterns

### Button Patterns

| Tyyppi | Käyttö | Tyyli |
|--------|--------|-------|
| **Primary** | Päätoimitno (Tutki) | Sininen, täytetty |
| **Secondary** | Toissijainen (Peruuta) | Outline |
| **Ghost** | Hienovarainen (Clear) | Läpinäkyvä |
| **Destructive** | Varoitus | Punainen |

### Feedback Patterns

| Tila | Visuaalinen | Kesto |
|------|-------------|-------|
| **Loading** | Spinner + skeleton | Kunnes valmis |
| **Success** | Vihreä ✓ + fade in | 300ms animaatio |
| **Error** | Punainen ✗ + alert | Pysyvä, dismissable |
| **Info** | Sininen badge | Pysyvä |

### Form Patterns

| Elementti | Toteutus |
|-----------|----------|
| **Label** | Yläpuolella, 500 weight |
| **Input** | Border, focus ring |
| **Error** | Punainen border + viesti alla |
| **Helper** | Harmaa teksti alla |

## Responsive Design

### Breakpoints

| Breakpoint | Leveys | Layout |
|------------|--------|--------|
| **Mobile** | < 640px | 1 column, stacked cards |
| **Tablet** | 640-1024px | 2 columns |
| **Desktop** | > 1024px | 3 columns, max-w-6xl |

### Mobile Adaptations

| Desktop | Mobile |
|---------|--------|
| 3-column grid | 1-column stack |
| Hover states | Touch targets (min 44px) |
| Keyboard shortcuts | Touch gestures |
| Inline tooltips | Bottom sheets |

## Summary & Next Steps

### UX Design Complete

Tämä dokumentti määrittelee Business Research Portalin käyttökokemuksen:

- **Ydinkokemus:** "Kirjoita yrityksen nimi, katso kun AI tutkii"
- **Tunnetavoite:** Voimaantunut, tehokas, luottavainen
- **Design system:** shadcn/ui + Tailwind CSS
- **Väripaletti:** Sininen (primary) + Oranssi (accent)
- **Typografia:** Inter, selkeä hierarkia
- **Patternit:** Streaming progress, inline sources, progressive disclosure

### Architect Handoff

Seuraava vaihe: **Architecture Document**

UX-dokumentti tarjoaa arkkitehdille:
1. Komponenttihierarkia → tekninen komponenttirakenne
2. User journeys → API-rajapinnat ja tilanhallinta
3. Streaming-vaatimukset → CopilotKit-integraatio
4. Responsive-vaatimukset → Layout-arkkitehtuuri

