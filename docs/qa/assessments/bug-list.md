# Bugilista — Business Research Portal MVP

**Päivämäärä:** 2026-02-07
**Arvioija:** QA (Claude Code)

---

## Avoimet bugit yhteenveto

| Prioriteetti | Määrä | Kategoria |
|-------------|-------|-----------|
| P0 (Kriittinen) | 3 | Tietoturva |
| P1 (Korkea) | 7 | Tietoturva, virheenkäsittely, tyypit |
| P2 (Keskitaso) | 11 | Tietoturva, UX, koodi |
| P3 (Matala) | 7 | Saavutettavuus, koodi |
| **Yhteensä** | **28** | |

---

## P0 — Kriittiset

### BUG-001: CopilotKit API-reitti ei vaadi autentikointia

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P0 |
| **Vakavuus** | Kriittinen |
| **Komponentti** | Auth / CopilotKit |
| **Tiedosto** | `src/middleware.ts:25` + `src/app/api/copilotkit/route.ts:77` |

**Kuvaus:** Middleware tarkistaa tokenin vain `/` ja `/research`-reiteille. `/api/copilotkit` pääsee läpi ilman autentikointia. Kuka tahansa voi tehdä POST-kutsuja, jotka kuluttavat Anthropic- ja Tavily-API-krediittejä.

**Korjausehdotus:** Lisää `/api/copilotkit` suojattuihin reitteihin middlewaressa tai lisää `getServerSession()` -tarkistus route handleriin.

---

### BUG-002: Todelliset API-avaimet .env.local-tiedostossa

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P0 |
| **Vakavuus** | Kriittinen |
| **Komponentti** | Infrastruktuuri |
| **Tiedosto** | `.env.local:10,16` |

**Kuvaus:** `ANTHROPIC_API_KEY` ja `TAVILY_API_KEY` ovat oikeita avaimia levyllä. Vaikka `.gitignore` estää commitin, avaimet voivat vuotaa backup-kopioiden, repo-jakamisen tai levykuvien kautta.

**Korjausehdotus:** Vaihda molemmat avaimet. Käytä secrets manageria (Vercel env vars, 1Password CLI).

---

### BUG-003: Tavily API-avaimen väärinkäyttö suojaamattoman endpointin kautta

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P0 |
| **Vakavuus** | Kriittinen |
| **Komponentti** | CopilotKit / Tavily |
| **Tiedosto** | `src/lib/services/prh.ts:160`, `src/lib/services/news.ts:57` |

**Kuvaus:** Yhdessä BUG-001 kanssa: Tavily API-avain lähetetään request bodyssa, ja koska endpoint on suojaamaton, kuka tahansa voi laukaista Tavily-hakuja.

**Korjausehdotus:** Korjaa BUG-001 ensin. API-avaimen bodyssa lähettäminen on Tavilyn suunnitteluvalinta.

---

## P1 — Korkeat

### BUG-004: Heikko NEXTAUTH_SECRET

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | Auth |
| **Tiedosto** | `.env.local:3` |

**Kuvaus:** `NEXTAUTH_SECRET=development-secret-change-in-production` on arvattava. JWT:t voidaan väärentää.

**Korjausehdotus:** `openssl rand -base64 32` tuotannossa.

---

### BUG-005: Dev-credentials hyväksyy minkä tahansa tunnukset

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | Auth |
| **Tiedosto** | `src/lib/auth.ts:18-29` |

**Kuvaus:** Credentials provider hyväksyy minkä tahansa sähköposti/salasana-yhdistelmän kehitystilassa. Riippuu `NODE_ENV`-muuttujasta, joka voi olla väärin asetettu tuotannossa.

**Korjausehdotus:** Erillinen `ENABLE_DEV_AUTH` ympäristömuuttuja. Uniikki user ID per sähköposti.

---

### BUG-006: Ei rate limiting -suojaa

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | Infrastruktuuri |
| **Tiedosto** | Koko sovellus |

**Kuvaus:** Yhtään API-reittiä ei ole suojattu rate limitingillä. Automaattiset kyselyt voivat aiheuttaa suuria API-kuluja.

**Korjausehdotus:** `@upstash/ratelimit` tai vastaava. Per-IP ja per-user rajoitukset.

---

### BUG-007: Ulkoiset API-kutsut ilman timeout-käsittelyä

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | YTJ / PRH / Uutiset |
| **Tiedosto** | `src/lib/services/ytj.ts`, `prh.ts`, `news.ts` |

**Kuvaus:** Kaikki `fetch()`-kutsut ulkoisiin API:hin eivät sisällä timeout-arvoa. Jos API ei vastaa, kutsu roikkuu loputtomiin.

**Korjausehdotus:** `signal: AbortSignal.timeout(15_000)` kaikkiin fetch-kutsuihin.

---

### BUG-008: `as never` tyyppipakoitukset komponenteissa

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | UI / CopilotKit |
| **Tiedosto** | `src/components/agent/tool-renderers.tsx:59,105,148` |

**Kuvaus:** `as never` ohittaa TypeScript-tyyppijärjestelmän kokonaan. Jos API palauttaa odottamattoman rakenteen, komponentti kaatuu runtime-virheeseen ilman käännösaikaista varoitusta.

**Korjausehdotus:** Käytä oikeita tyyppejä tai Zod-validointia runtime-datalle.

---

### BUG-009: `as any` CopilotKit-konfiguraatiossa

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Keskitaso |
| **Komponentti** | CopilotKit |
| **Tiedosto** | `src/app/api/copilotkit/route.ts:74` |

**Kuvaus:** `agents: { default: agent } as any` piilottaa tyyppi-inkompatibiliteetit. Myös eslint-disable käytössä.

**Korjausehdotus:** Tutki CopilotRuntime:n odottama tyyppi ja tyypitä oikein.

---

### BUG-010: Puuttuvat security-headerit

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |
| **Vakavuus** | Korkea |
| **Komponentti** | Infrastruktuuri |
| **Tiedosto** | `next.config.ts` |

**Kuvaus:** Puuttuvat: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy, Permissions-Policy.

**Korjausehdotus:** Lisää `headers()` next.config.ts:iin tai middlewareen.

---

## P2 — Keskitason

### BUG-011: Login-sivu näyttää dev-credentials tuotannossa

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/(auth)/login/page.tsx:18-19` |

Lomake esitäytetty `dev@example.com` / `dev` ilman ympäristötarkistusta.

---

### BUG-012: Dev-kirjautumislomake renderöidään aina

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/(auth)/login/page.tsx:67-88` |

"Kehitystila"-teksti ja lomake näkyvät myös tuotannossa.

---

### BUG-013: Greedy JSON-regex PRH-parsinnassa

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/lib/services/prh.ts:97` |

`/\{[\s\S]*\}/` voi poimia ylimääräistä sisältöä Claude-vastauksesta.

---

### BUG-014: Ei pituusrajoitusta CopilotKit-parametreille

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/api/copilotkit/route.ts:33-67` |

Zod-skeema vaatii vain `z.string()` ilman `.max()` rajoitusta.

---

### BUG-015: Console.log vuotaa tietoja tuotantologeihin

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `ytj.ts:62,75`, `prh.ts:98,155`, `news.ts:49` |

API-URL:t ja talousdata logitetaan.

---

### BUG-016: callbackUrl open redirect -mahdollisuus

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/(auth)/login/page.tsx:17` |

`callbackUrl` luetaan query-parametrista ilman validointia.

---

### BUG-017: Ei Error Boundary -komponenttia

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/layout.tsx`, `src/app/page.tsx` |

Komponenttien virheet aiheuttavat valkoisen näytön.

---

### BUG-018: setIsLoading(false) ei suoriteta koskaan

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/(auth)/login/page.tsx:38-43` |

signIn() aiheuttaa redirectin → setIsLoading(false) on saavuttamaton.

---

### BUG-019: Ei CSRF-suojaa CopilotKit-endpointissa

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/api/copilotkit/route.ts` |

POST-endpoint ei tarkista Origin-headeria eikä CSRF-tokenia.

---

### BUG-020: suppressHydrationWarning ilman selitystä

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | `src/app/layout.tsx:24` |

Piilottaa mahdolliset oikeat hydraatio-ongelmat.

---

### BUG-021: Ei retry-logiikkaa ulkoisille API-kutsuille

| Kenttä | Arvo |
|--------|------|
| **Tiedosto** | Kaikki palvelut (`ytj.ts`, `prh.ts`, `news.ts`) |

Yksi epäonnistunut kutsu → käyttäjä saa "ei tuloksia".

---

## P3 — Matala

| ID | Kuvaus | Tiedosto |
|----|--------|----------|
| BUG-022 | `new Date()` renderissä | `agent-thinking.tsx:90` |
| BUG-023 | Google SVG puuttuu saavutettavuusteksti | `login/page.tsx:104` |
| BUG-024 | Nav ilman `aria-label` | `header.tsx:19` |
| BUG-025 | Loading skeleton ei ilmoita ruudunlukijalle | `header.tsx:21` |
| BUG-026 | Ei `aria-live` agentti-viesteihin | `agent-thinking.tsx` |
| BUG-027 | Duplikaatti `TavilyResult`-interface | `prh.ts`, `news.ts` |
| BUG-028 | Käyttämätön `@langchain/core` | `package.json:16` |

---

## Seuraavat askeleet

1. **Korjaa P0-bugit** — erityisesti BUG-001 (API-autentikointi)
2. **Suorita manuaalinen selaintesti** — TC-2.1 – TC-2.10 vaativat interaktiivisen testauksen
3. **Responsiivisuustestaus** — 375px, 768px, 1440px
4. **Dark mode -testaus** — P2, mutta tarkistettava ennen julkaisua
