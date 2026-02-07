# QA Test Plan — Business Research Portal

**Versio:** 1.0 (MVP)
**Päivämäärä:** 2026-02-06
**Kohde:** MVP-julkaisu

---

## 1. Testauksen laajuus

### Testattavat ominaisuudet

| Epic | Ominaisuus | Prioriteetti |
|------|------------|--------------|
| Epic 0 | Projektin perusta (build, layout, UI-komponentit) | P0 |
| Epic 1 | Autentikointi (login, logout, sessio, Google OAuth) | P0 |
| Epic 2 | Yritystutkimus (YTJ, PRH, uutiset, agentin visualisointi) | P0 |
| - | Responsiivisuus (desktop, tablet, mobiili) | P1 |
| - | Dark mode | P2 |

### Testauksen ulkopuolelle jäävät

- Suorituskykytestaus (kuormitus, vasteajat) — tehdään myöhemmin
- Penetration testing — tehdään ennen tuotantojulkaisua
- Selainyhteensopivuus (vain Chrome/Safari/Firefox manuaalisesti)

---

## 2. Testiympäristö

| Osa | Konfiguraatio |
|-----|---------------|
| **OS** | macOS / Linux |
| **Node.js** | 18+ |
| **Selaimet** | Chrome (latest), Safari (latest), Firefox (latest) |
| **Näyttökoot** | 375px (mobiili), 768px (tablet), 1440px (desktop) |
| **Ympäristö** | Lokaali (`localhost:3000`) + Vercel preview |
| **API-avaimet** | `ANTHROPIC_API_KEY`, `TAVILY_API_KEY` vaaditaan |
| **Auth** | Dev-credentials (`dev@example.com` / `dev`) |

---

## 3. Testityypit

### 3.1 Smoke-testit (jokainen deploy)

Nopea tarkistus että perusasiat toimivat:

1. `npm run build` onnistuu ilman virheitä
2. Sovellus latautuu selaimessa
3. Login-sivu näkyy
4. Dev-kirjautuminen onnistuu
5. Etusivu renderöityy (hero, chat-komponentti)
6. CopilotChat avautuu ja hyväksyy syötteen

### 3.2 Toiminnalliset testit

Kattavat acceptance criteria kaikista storyista — ks. `test-cases.md`.

### 3.3 Visuaaliset testit

- Glassmorphism-efektit näkyvät (glass, glass-strong)
- Animaatiot toimivat (fade-in-up, pulse-ring)
- Gradient-taustat renderöityvät
- Accent-palkit näkyvät korteissa (sininen, oranssi, vihreä)
- CopilotKit send-nappi näkyy ja reagoi hoveriin
- Dark mode: värit, kontrastit, glass-efektit

### 3.4 Responsiivisuustestit

| Elementti | Mobiili (375px) | Tablet (768px) | Desktop (1440px) |
|-----------|-----------------|-----------------|-------------------|
| Hero-otsikko | text-5xl | text-6xl | text-7xl |
| Tuloskortit | 1 sarake | 1-2 saraketta | Grid-layout |
| Header | Kompakti | Normaali | Normaali |
| Chat-komponentti | Täysleveä | Täysleveä | max-w-5xl |
| Feature-pillerit | Wrap | Rivi | Rivi |

---

## 4. Hyväksymiskriteerit (Go/No-Go)

### Go (julkaistaan)

- [x] Build onnistuu
- [ ] Kaikki P0-testitapaukset PASS
- [ ] Ei yhtään P0/P1 -bugia avoimena
- [ ] Login ja logout toimivat
- [ ] Yritystutkimus palauttaa tuloksia (vähintään YTJ)
- [ ] Mobiili-layout ei ole rikki
- [ ] CopilotChat-komponentti toimii

### No-Go (ei julkaista)

- Build failaa
- Kirjautuminen ei toimi
- CopilotChat ei lataudu tai ei vastaa
- Kriittinen regressio aiempaan toiminnallisuuteen

---

## 5. Tunnetut rajoitukset (MVP)

| Rajoitus | Kuvaus | Vaikutus |
|----------|--------|----------|
| Dev-auth | Kehitystilassa mikä tahansa sähköposti toimii | Ei tuotantovalmis auth |
| PRH-data | Taloustiedot haetaan Tavily + Claude -parsinnalla | Luotettavuus vaihtelee |
| Rate limits | Ei rate limiting -suojaa API-kutsuille | Mahdollinen API-esto |
| Google OAuth | Vaatii oikeat credentials tuotannossa | Dev-tilassa vain credentials-login |
| Retry | Ei automaattista retry-painiketta virhetilanteissa | Käyttäjä aloittaa uuden haun |
