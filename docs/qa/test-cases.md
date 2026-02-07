# Testitapaukset — Business Research Portal

**Versio:** 1.0 (MVP)
**Päivämäärä:** 2026-02-06

---

## Epic 0: Projektin perusta

### TC-0.1: Build onnistuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 0.1, 0.2 |
| **Prioriteetti** | P0 |
| **Esiehdot** | Node.js 18+, riippuvuudet asennettu |

**Vaiheet:**
1. Aja `npm run build`

**Odotettu tulos:**
- Build valmistuu ilman virheitä
- Kaikki sivut generoituvat (/, /login, /register)

---

### TC-0.2: Dev-palvelin käynnistyy

| Kenttä | Arvo |
|--------|------|
| **Story** | 0.1 |
| **Prioriteetti** | P0 |
| **Esiehdot** | .env.local konfiguroitu |

**Vaiheet:**
1. Aja `npm run dev`
2. Avaa `http://localhost:3000`

**Odotettu tulos:**
- Palvelin käynnistyy portissa 3000
- Sivu latautuu selaimessa

---

### TC-0.3: UI-komponentit renderöityvät

| Kenttä | Arvo |
|--------|------|
| **Story** | 0.2 |
| **Prioriteetti** | P0 |

**Vaiheet:**
1. Avaa etusivu
2. Tarkista visuaaliset elementit

**Odotettu tulos:**
- Header näkyy: logo, "Business Research Portal" -teksti, "Portal" sinisellä
- Hero-osio: pill-badge, otsikko gradient-tekstillä, feature-pillerit
- Glass-efektit näkyvät (header, chat-kontti)
- Inter-fontti käytössä

---

## Epic 1: Autentikointi

### TC-1.1: Dev-kirjautuminen onnistuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 1.1, 1.2 |
| **Prioriteetti** | P0 |
| **Covers** | FR12, FR13 |

**Vaiheet:**
1. Avaa `/login`
2. Syötä sähköposti: `dev@example.com`
3. Syötä salasana: `dev`
4. Klikkaa "Kirjaudu kehitystilillä"

**Odotettu tulos:**
- Ohjataan etusivulle (`/`)
- Header näyttää käyttäjän nimen ja avatarin
- "Kirjaudu ulos" -nappi näkyy

---

### TC-1.2: Login-sivun ulkoasu

| Kenttä | Arvo |
|--------|------|
| **Story** | 1.2 |
| **Prioriteetti** | P1 |

**Vaiheet:**
1. Avaa `/login` (kirjautumattomana)

**Odotettu tulos:**
- Card: `glass-strong shadow-xl` -efekti
- Ikoni: sininen gradient-taustalaatikko (16x16, rounded-2xl)
- "Kirjaudu kehitystilillä" -nappi: sininen varjo
- Google-nappi näkyy
- Tausta: `gradient from-primary/5 to-accent/5`

---

### TC-1.3: Virheellinen kirjautuminen (Google OAuth-virhe)

| Kenttä | Arvo |
|--------|------|
| **Story** | 1.2 |
| **Prioriteetti** | P1 |
| **Covers** | FR12 |

**Vaiheet:**
1. Avaa `/login?error=CredentialsSignin`

**Odotettu tulos:**
- Punainen Alert näkyy: "Virheellinen sähköposti tai salasana."

---

### TC-1.4: Uloskirjautuminen

| Kenttä | Arvo |
|--------|------|
| **Story** | 1.3 |
| **Prioriteetti** | P0 |
| **Covers** | FR14 |

**Vaiheet:**
1. Kirjaudu sisään
2. Klikkaa "Kirjaudu ulos"

**Odotettu tulos:**
- Sessio tuhotaan
- Ohjataan login-sivulle

---

### TC-1.5: Suojattu reitti ilman kirjautumista

| Kenttä | Arvo |
|--------|------|
| **Story** | 1.3 |
| **Prioriteetti** | P0 |
| **Covers** | NFR8 |

**Vaiheet:**
1. Avaa etusivu (`/`) kirjautumattomana (pyyhi cookies)

**Odotettu tulos:**
- Ohjataan automaattisesti `/login`-sivulle

---

## Epic 2: Yritystutkimus

### TC-2.1: CopilotChat latautuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.1, 2.2 |
| **Prioriteetti** | P0 |
| **Covers** | FR1 |

**Vaiheet:**
1. Kirjaudu sisään
2. Tarkista etusivu

**Odotettu tulos:**
- CopilotChat-komponentti näkyy
- Tervetuloviesti: "Tervetuloa! Kirjoita yrityksen nimi aloittaaksesi tutkimuksen."
- Placeholder: "Syötä yrityksen nimi, esim. Nokia, Kone, Nordea..."
- Glass-efekti chatissa (rounded-xl, shadow-lg, ring)

---

### TC-2.2: Send-nappi toimii

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.2 |
| **Prioriteetti** | P0 |
| **Covers** | FR2 |

**Vaiheet:**
1. Tyhjä kenttä: tarkista send-nappi
2. Kirjoita "Nokia" kenttään
3. Tarkista send-nappi
4. Vie hiiri napin päälle
5. Klikkaa nappia

**Odotettu tulos:**
1. Tyhjä: nappi on himmeä (opacity 0.5), normaali kursori
2. Tekstin jälkeen: nappi muuttuu siniseksi (bg-primary), valkoinen ikoni
3. Nappi on aktiivinen: `cursor: pointer`
4. Hover: nappi kasvaa, nousee ylös, varjo vahvistuu
5. Klikkaus: haku käynnistyy

---

### TC-2.3: YTJ-haku onnistuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.3 |
| **Prioriteetti** | P0 |
| **Covers** | FR3, FR6, FR7, FR8, FR9, FR10 |

**Vaiheet:**
1. Kirjoita "Nokia" ja lähetä
2. Seuraa agentin toimintaa

**Odotettu tulos:**
- Agentti näyttää "Haen YTJ:stä..." -vaihe (loading-animaatio)
- CompanyCard ilmestyy:
  - Sininen accent-palkki yläreunassa
  - Yrityksen nimi (text-xl, font-bold)
  - Y-tunnus chip-tyylillä (sininen tausta, rounded)
  - YTJ-badge (filled, ei outline)
  - Yhtiömuoto, toimiala, osoite, rekisteröintipäivä
- Card on glass-efektillä, hover:shadow-lg

---

### TC-2.4: Taloustietojen haku onnistuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.4 |
| **Prioriteetti** | P0 |
| **Covers** | FR4, FR6 |

**Vaiheet:**
1. Hae tunnettu yritys (esim. "Nokia")
2. Odota taloustietojen latautumista

**Odotettu tulos:**
- FinancialsCard ilmestyy:
  - Oranssi accent-palkki yläreunassa
  - Tilikausi näkyy otsikossa
  - Metriikat sub-korteissa (bg-muted/40, rounded-lg)
  - Luvut: text-2xl, font-bold, tabular-nums
  - PRH-badge variant="secondary"
  - Suomalaiset numeroformaatit (1 000,0 €)

---

### TC-2.5: Taloustietoja ei saatavilla

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.4 |
| **Prioriteetti** | P1 |

**Vaiheet:**
1. Hae pieni/tuntematon yritys jolla ei ole julkisia taloustietoja

**Odotettu tulos:**
- FinancialsCard näkyy, mutta sisältää viestin: "Taloustietoja ei ole saatavilla tästä yrityksestä."
- Kortti näyttää silti siistiltä (glass, accent-palkki)

---

### TC-2.6: Uutishaku onnistuu

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.5 |
| **Prioriteetti** | P0 |
| **Covers** | FR5, FR6 |

**Vaiheet:**
1. Hae tunnettu yritys (esim. "Nokia")
2. Odota uutistulosten latautumista

**Odotettu tulos:**
- NewsCard ilmestyy:
  - Vihreä accent-palkki yläreunassa
  - 1-5 uutisotsikkoa
  - Julkaisupäivä ja lähde näkyvissä
  - Linkit toimivat (avautuvat uudessa välilehdessä)
  - Hover: bg-muted/60 + translate-x-1
  - Uutiset eroteltuna: divide-y divide-border/50

---

### TC-2.7: Ei uutisia saatavilla

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.5 |
| **Prioriteetti** | P1 |

**Vaiheet:**
1. Hae yritys, josta ei löydy uutisia

**Odotettu tulos:**
- NewsCard näyttää: "Ei uutisia saatavilla yrityksestä [nimi]."

---

### TC-2.8: Agentin askeleet näkyvät oikein

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.2 |
| **Prioriteetti** | P0 |
| **Covers** | FR7, FR8, FR9, FR10, FR22 |

**Vaiheet:**
1. Käynnistä haku ja seuraa AgentStep-komponentteja

**Odotettu tulos:**
- **Pending**: harmaa tausta, Clock-ikoni
- **Loading**: sininen kehys (border-primary/30), spinner-animaatio, pulse-ring ikonilla
- **Complete**: vihreä kehys (border-green-200), Check-ikoni
- **Error**: punainen kehys, AlertCircle-ikoni

---

### TC-2.9: Yritystä ei löydy

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.3 |
| **Prioriteetti** | P1 |
| **Covers** | FR16 |

**Vaiheet:**
1. Kirjoita olematon yrityksen nimi (esim. "asdfghjk1234oy")
2. Lähetä haku

**Odotettu tulos:**
- Agentti vastaa suomeksi, kertoo ettei yritystä löytynyt
- Ei crashia, ei tyhjää näkymää

---

### TC-2.10: Kokonainen hakuflow (E2E)

| Kenttä | Arvo |
|--------|------|
| **Story** | 2.1–2.5 |
| **Prioriteetti** | P0 |
| **Covers** | FR1–FR10, FR22 |

**Vaiheet:**
1. Kirjaudu sisään
2. Kirjoita "Kone" ja lähetä
3. Odota kaikkien vaiheiden valmistumista
4. Tarkista kaikki tuloskortit

**Odotettu tulos:**
- Kaikki kolme korttia ilmestyvät (CompanyCard, FinancialsCard, NewsCard)
- Agentti antaa suomenkielisen yhteenvedon
- Mikään kortti ei ole tyhjä (vähintään "ei saatavilla" -viesti)
- Sovellus pysyy responsiivisena koko haun ajan

---

## Visuaalinen tarkistus

### TC-V.1: Light mode

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |

**Tarkistettavat:**
- [ ] Body gradient-tausta (sininen/oranssi radial)
- [ ] Glass-efektit näkyvät (header, chat, kortit)
- [ ] Gradient-teksti hero-otsikossa ("tekoälyllä")
- [ ] Accent-palkit korteissa (sininen, oranssi, vihreä)
- [ ] Send-nappi: sininen, hover/active efektit
- [ ] Animaatiot: fade-in-up, pulse-ring

### TC-V.2: Dark mode

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P2 |

**Tarkistettavat:**
- [ ] Glass-efektit tumma tausta (background 60% opacity)
- [ ] Teksti luettavissa (kontrasti riittävä)
- [ ] Accent-palkit näkyvät myös tummalla
- [ ] Send-nappi disabled: tumma muted-tausta

### TC-V.3: Mobiili-layout (375px)

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P1 |

**Tarkistettavat:**
- [ ] Hero-otsikko: text-5xl (ei liian iso)
- [ ] Feature-pillerit: wrappaa riviltä
- [ ] Chat-komponentti: täysleveä
- [ ] Tuloskortit: pinottu (1 sarake)
- [ ] Header: logo + teksti mahtuvat

---

## Regressiotestit

### TC-R.1: Design-muutokset eivät riko toiminnallisuutta

| Kenttä | Arvo |
|--------|------|
| **Prioriteetti** | P0 |

**Tarkistettavat:**
- [ ] CopilotChat toimii edelleen (viesti lähetetään ja vastaus tulee)
- [ ] Login-lomake toimii (dev-credentials)
- [ ] Logout-nappi toimii
- [ ] Middleware suojaa reitit
- [ ] Navigointi toimii (header-logo → etusivu)
