# QA-arviointi — Business Research Portal MVP

**Versio:** 1.0
**Päivämäärä:** 2026-02-07
**Arvioija:** QA (Claude Code)
**Kohde:** MVP-julkaisuvalmius

---

## Yhteenveto

| Kategoria | Tulos |
|-----------|-------|
| **Build** | PASS |
| **Lint** | FAIL (1 virhe, 1 varoitus) |
| **Sivut generoituvat** | PASS (/, /login, /register, API-reitit) |
| **TypeScript** | PASS (build läpi) |
| **Tietoturva** | FAIL — 3 kriittistä, 7 korkeaa |
| **Kokonaisarvio** | **NO-GO tuotantoon** — MVP-pilotointi OK lokaalisti |

---

## 1. Smoke-testit

### TC-0.1: Build onnistuu

| Kenttä | Tulos |
|--------|-------|
| **Tulos** | **PASS** |
| **Komento** | `npm run build` |
| **Kesto** | 6.7s (Turbopack) |
| **Next.js** | 16.1.6 |

```
Route (app)
├ ○ /              (Static)
├ ○ /login         (Static)
├ ○ /register      (Static)
├ ƒ /api/auth/*    (Dynamic)
└ ƒ /api/copilotkit (Dynamic)
```

**Huomio:** Varoitus "middleware" → "proxy" -deprecaatio (Next.js 16).

---

### TC-0.2: Lint

| Kenttä | Tulos |
|--------|-------|
| **Tulos** | **FAIL** |
| **Virheitä** | 1 |
| **Varoituksia** | 1 |

| Tiedosto | Rivi | Taso | Kuvaus |
|----------|------|------|--------|
| `src/app/api/copilotkit/route.ts` | 74 | error | `@typescript-eslint/no-explicit-any` — `as any` -tyyppipakoitus |
| `src/app/api/copilotkit/route.ts` | 72 | warn | Käyttämätön eslint-disable-direktiivi |

---

## 2. Testitapausten arviointi (koodikatselmus)

Alla testitapausten arvioitu tila koodikatselmuksen perusteella. Manuaalinen selaintestaus vaaditaan lopulliseen vahvistukseen.

### Epic 0: Projektin perusta

| TC | Nimi | Arvio | Huomiot |
|----|------|-------|---------|
| TC-0.1 | Build onnistuu | **PASS** | Kaikki sivut generoituvat |
| TC-0.2 | Dev-palvelin käynnistyy | **PASS** | Edellyttää .env.local |
| TC-0.3 | UI-komponentit renderöityvät | **TARKISTETTAVA** | Glass-efektit, Inter-fontti — vaatii visuaalisen tarkistuksen |

### Epic 1: Autentikointi

| TC | Nimi | Arvio | Huomiot |
|----|------|-------|---------|
| TC-1.1 | Dev-kirjautuminen | **PASS*** | Toimii, mutta hyväksyy minkä tahansa salasanan |
| TC-1.2 | Login-sivun ulkoasu | **TARKISTETTAVA** | Visuaalinen tarkistus vaaditaan |
| TC-1.3 | Virheellinen kirjautuminen | **FAIL** | Dev-tilassa kaikki kirjautumiset onnistuvat — virhetilanteita ei voi testata credentials-providerilla |
| TC-1.4 | Uloskirjautuminen | **PASS** | NextAuth signOut + redirect |
| TC-1.5 | Suojattu reitti | **PASS** | Middleware ohjaa /login-sivulle |

### Epic 2: Yritystutkimus

| TC | Nimi | Arvio | Huomiot |
|----|------|-------|---------|
| TC-2.1 | CopilotChat latautuu | **TARKISTETTAVA** | Vaatii selaintestin |
| TC-2.2 | Send-nappi toimii | **TARKISTETTAVA** | Vaatii interaktiivisen testin |
| TC-2.3 | YTJ-haku | **PASS*** | Koodi toimiva, mutta ei timeout-käsittelyä |
| TC-2.4 | Taloustiedot | **PASS*** | PRH XBRL + Tavily fallback, mutta ei retry-logiikkaa |
| TC-2.5 | Taloustietoja ei saatavilla | **TARKISTETTAVA** | Vaatii testin pienellä yrityksellä |
| TC-2.6 | Uutishaku | **PASS*** | Tavily-integraatio toimiva |
| TC-2.7 | Ei uutisia saatavilla | **TARKISTETTAVA** | Vaatii testin tuntemattomalla yrityksellä |
| TC-2.8 | Agentin askeleet | **TARKISTETTAVA** | Vaatii visuaalisen testin |
| TC-2.9 | Yritystä ei löydy | **TARKISTETTAVA** | Agentti käsittelee, mutta vaatii E2E-testin |
| TC-2.10 | E2E hakuflow | **TARKISTETTAVA** | Vaatii täyden manuaalisen testin |

**PASS*** = Koodikatselmuksen perusteella toimiva, mutta sisältää huomioita.

---

## 3. Tietoturva-arviointi

### Kriittiset havainnot (P0)

| # | Havainto | Tiedosto | Rivi |
|---|----------|----------|------|
| **BUG-001** | `/api/copilotkit` ei vaadi autentikointia — kuka tahansa voi kuluttaa Anthropic/Tavily API-krediittejä | `middleware.ts:25` + `route.ts:77` | Middleware päästää API-reitit läpi |
| **BUG-002** | Oikeat API-avaimet .env.local-tiedostossa levyllä | `.env.local:10,16` | Avaimet vuotavat jos repo/backup jaetaan |
| **BUG-003** | Tavily API-avaimen väärinkäyttö mahdollista suojaamattoman endpointin kautta | `prh.ts:160`, `news.ts:57` | Yhdessä BUG-001 kanssa |

### Korkeat havainnot (P1)

| # | Havainto | Tiedosto | Rivi |
|---|----------|----------|------|
| **BUG-004** | Heikko NEXTAUTH_SECRET (`development-secret-change-in-production`) | `.env.local:3` | JWT voidaan väärentää |
| **BUG-005** | Dev-credentials hyväksyy minkä tahansa sähköpostin/salasanan | `auth.ts:18-29` | NODE_ENV-riippuvainen suojaus |
| **BUG-006** | Ei rate limiting -suojaa millään reitillä | Koko sovellus | API-kulut voivat karkaa |
| **BUG-007** | Ulkoisilla API-kutsuilla ei timeout-käsittelyä | `ytj.ts`, `prh.ts`, `news.ts` | Kutsu voi jäädä roikkumaan |
| **BUG-008** | `as never` tyyppipakoitukset — TypeScript-suoja ohitettu | `tool-renderers.tsx:59,105,148` | Runtime-crash mahdollinen |
| **BUG-009** | `as any` tyyppipakoitus CopilotKit-agenttikonfiguraatiossa | `route.ts:74` | Tyyppi-inkompatibiliteetti piilotettu |
| **BUG-010** | Ei security-headereita (CSP, X-Frame-Options, HSTS) | `next.config.ts` | XSS/clickjacking-riski |

### Keskitason havainnot (P2)

| # | Havainto | Tiedosto |
|---|----------|----------|
| **BUG-011** | Login-sivu näyttää dev-credentials tuotannossa | `login/page.tsx:18-19` |
| **BUG-012** | Dev-kirjautumislomake renderöidään aina | `login/page.tsx:67-88` |
| **BUG-013** | PRH-parsinnassa greedy JSON-regex | `prh.ts:97` |
| **BUG-014** | CopilotKit-työkalujen parametreilla ei pituusrajoitusta | `route.ts:33-67` |
| **BUG-015** | Console.log vuotaa tietoja tuotantologeihin | `ytj.ts`, `prh.ts`, `news.ts` |
| **BUG-016** | callbackUrl open redirect -mahdollisuus | `login/page.tsx:17` |
| **BUG-017** | Ei Error Boundary -komponenttia | `layout.tsx`, `page.tsx` |
| **BUG-018** | `setIsLoading(false)` ei koskaan suoriteta | `login/page.tsx:38-43` |
| **BUG-019** | Ei CSRF-suojaa CopilotKit-endpointissa | `route.ts` |
| **BUG-020** | `suppressHydrationWarning` ilman selitystä | `layout.tsx:24` |
| **BUG-021** | Ei retry-logiikkaa ulkoisille API-kutsuille | Palvelut |

### Matalan tason havainnot (P3)

| # | Havainto | Tiedosto |
|---|----------|----------|
| **BUG-022** | `new Date()` renderissä | `agent-thinking.tsx:90` |
| **BUG-023** | Google SVG:stä puuttuu saavutettavuusteksti | `login/page.tsx:104` |
| **BUG-024** | Nav ilman `aria-label` | `header.tsx:19` |
| **BUG-025** | Loading skeleton ei ilmoita ruudunlukijalle | `header.tsx:21` |
| **BUG-026** | Ei `aria-live` agentti-viesteihin | `agent-thinking.tsx` |
| **BUG-027** | Duplikaatti `TavilyResult`-interface | `prh.ts`, `news.ts` |
| **BUG-028** | Käyttämätön `@langchain/core`-riippuvuus | `package.json:16` |

---

## 4. Arkkitehtuurihuomiot

| Huomio | Kuvaus | Prioriteetti |
|--------|--------|-------------|
| Ei tietokantaa | Ei hakuhistoriaa, ei välimuistia — jokainen haku kutsuu API:a | Tulevaisuus |
| Ei API-vastausten välimuistia | YTJ/PRH-data haetaan aina tuoreena, vaikka harvoin muuttuu | P2 |
| Ei `error.tsx` | Virhetilanteissa käyttäjä näkee Next.js:n oletusnäkymän | P2 |
| Ei `loading.tsx` | Sivusiirtymissä ei Suspense-latausindikaattoria | P3 |
| Rekisteröintisivu on kuollut pää | Tarjoaa vain Google OAuth:n — ei eroa login-sivusta | P3 |

---

## 5. Go/No-Go arviointi

### Hyväksymiskriteerit

| Kriteeri | Tila | Huomio |
|----------|------|--------|
| Build onnistuu | **PASS** | Turbopack 6.7s |
| Kaikki P0-testitapaukset PASS | **OSIN** | Vaatii manuaalisen selaintestin |
| Ei P0/P1 -bugeja avoimena | **FAIL** | 3 P0 + 7 P1 avointa |
| Login ja logout toimivat | **PASS** | Dev-tilassa |
| Yritystutkimus palauttaa tuloksia | **TARKISTETTAVA** | Vaatii selaintestin |
| Mobiili-layout ei rikki | **TARKISTETTAVA** | Vaatii responsiivisuustestin |
| CopilotChat toimii | **TARKISTETTAVA** | Vaatii selaintestin |

### Päätös

| Ympäristö | Päätös | Perustelu |
|-----------|--------|-----------|
| **Lokaali kehitys** | **GO** | Toiminnallisuus kunnossa kehityskäyttöön |
| **MVP-pilotointi (sisäinen)** | **EHDOLLINEN GO** | Korjattava BUG-001 (API-autentikointi) ennen pilotointia |
| **Tuotanto** | **NO-GO** | 3 P0 + 7 P1 bugia avoimena, tietoturva-audit vaaditaan |

---

## 6. Suositellut toimenpiteet (tärkeysjärjestyksessä)

### Välittömästi (ennen pilotointia)

1. **Suojaa `/api/copilotkit` autentikoinnilla** (BUG-001)
2. **Vaihda API-avaimet** (BUG-002) — nykyiset saattavat olla kompromissoituneet
3. **Lisää AbortSignal.timeout() kaikkiin fetch-kutsuihin** (BUG-007)
4. **Korjaa lint-virhe** (`as any` route.ts:74)

### Ennen tuotantoa

5. Vahva NEXTAUTH_SECRET tuotannossa (BUG-004)
6. Poista/piilota dev-credentials tuotannosta (BUG-005, BUG-011, BUG-012)
7. Lisää rate limiting (BUG-006)
8. Lisää security headers (BUG-010)
9. Lisää Error Boundary (BUG-017)
10. Poista console.log-lauseet tai käytä oikeaa logitasoa (BUG-015)

### Tekninen velka (backlog)

11. Korjaa `as never` tyyppipakoitukset (BUG-008)
12. Lisää retry-logiikka (BUG-021)
13. Saavutettavuuskorjaukset (BUG-023–026)
14. Poista käyttämätön `@langchain/core` (BUG-028)
