---
stepsCompleted: [1, 2, 3, 4, 5, 6]
inputDocuments: []
date: 2026-02-03
author: Aki
projectName: Business Research Portal
---

# Product Brief: Business Research Portal

## Executive Summary

**Business Research Portal** on visuaalinen AI-agentti-portaali, jossa käyttäjä näkee reaaliajassa miten agentti tutkii yrityksiä. Palvelu ratkaisee myynti-, markkinointi- ja sijoitusammattilaisten keskeisen ongelman: yritystiedon kerääminen useista lähteistä on hidasta, työlästä ja virhealtista.

Hyödyntämällä AG-UI/CopilotKit-teknologiaa ja suomalaisia virallisia lähteitä (YTJ, PRH), Business Research Portal muuttaa tuntien manuaalisen työn minuuttien interaktiiviseksi ja läpinäkyväksi tiedonhauksi. Käyttäjä näkee agentin työskentelyprosessin reaaliajassa, mikä luo luottamusta tuloksiin. MVP sisältää yrityksen perustiedot, taloustiedot ja uutiset – kolme keskeisintä tietotarvetta nopeaan päätöksentekoon.

---

## Core Vision

### Problem Statement

Yritystiedon tutkiminen on työlästä, koska tieto on hajallaan useissa eri lähteissä (Google, LinkedIn, YTJ, PRH, Finder, tilinpäätökset). Tiedon koostaminen yhteen vie tunteja tai päiviä manuaalista työtä, ja lopputulos on usein epätarkka tai vanhentunut.

### Problem Impact

- **Huonot päätökset:** Väärät prospektit, kumppanit tai sijoitukset puutteellisen tiedon vuoksi
- **Ajan hukkaaminen:** Ammattilaiset käyttävät merkittävän osan työajastaan tiedon etsimiseen ja koostamiseen
- **Menetetyt mahdollisuudet:** Hitaus johtaa menetettyihin kauppoihin ja liiketoimintamahdollisuuksiin

### Why Existing Solutions Fall Short

| Ratkaisu | Heikkous |
|----------|----------|
| **Vainu, ZoomInfo** | Korkeat kustannukset, rajallinen paikallinen data |
| **Leadfeeder** | Vain inbound-kävijät, ei aktiivista listarakennusta |
| **Manuaalinen haku** | Hidas, työläs, virhealtis |
| **Crunchbase** | Heikko suomalainen kattavuus |

Kaikki nykyiset ratkaisut vaativat edelleen merkittävää manuaalista työtä tietojen yhdistämiseen ja päivittämiseen.

### Proposed Solution

**Business Research Portal** on visuaalinen AI-agentti-portaali, jossa käyttäjä:
1. Syöttää yrityksen nimen
2. **Näkee reaaliajassa miten AI-agentti tutkii yritystä** – "Haen YTJ:stä...", "Analysoin taloustietoja...", "Etsin uutisia..."
3. Saa koostetut perustiedot, taloustiedot ja uutiset yhteen näkymään
4. Voi suodattaa, vertailla ja seurata muutoksia interaktiivisesti

AG-UI/CopilotKit-teknologia mahdollistaa läpinäkyvän, visuaalisen agentin työskentelyprosessin seurannan – käyttäjä ymmärtää mitä tapahtuu ja luottaa tuloksiin.

### Key Differentiators

- **Läpinäkyvä AI-agentti:** Käyttäjä näkee reaaliajassa agentin työskentelyprosessin – mitä lähteitä agentti tutkii, mitä tietoja se löytää ja miten se koostaa tulokset. Tämä luo luottamusta ja ymmärrystä.
- **AG-UI/CopilotKit + reaaliaikaisuus:** Interaktiivinen, välitön käyttökokemus modernilla agentti-UI-teknologialla
- **Suomalaiset viralliset lähteet:** Suora integraatio YTJ:hin ja PRH:hon
- **Visualisointi:** Tieto esitetään ymmärrettävästi, ei taulukkoviidakkona
- **Ajoitus:** AI-teknologian kypsyys mahdollistaa luotettavat automaattiset haut juuri nyt

---

## Target Users

### Primary Users

#### Mikko – B2B-myyjä teknologiayrityksessä

**Profiili:**
- Rooli: B2B-myyjä, myy ohjelmistoratkaisuja pk-yrityksille
- Ympäristö: Keskisuuri yritys (~150 työntekijää), myyntitiimissä sekä inbound- että outbound-prosessit
- Työkalut: CRM käytössä, mutta yritystiedon keruu hajanaista

**Tyypillinen päivä:**
- Aamulla käy läpi liidit CRM:ssä ja sähköpostissa
- Suunnittelee soittolistoja ja tapaamisia
- Etsii tietoa prospekteista ennen puheluita ja tapaamisia
- Kuluttaa tunteja tiedon etsimiseen eri lähteistä

**Turhautumiset:**
- Tieto hajallaan (YTJ, LinkedIn, Google, PRH)
- Raporttien koostaminen vaatii copy-pastea
- Vaikea saada nopeaa kokonaiskuvaa prospektista

**Onnistuminen:**
- Näkee kaiken olennaisen tiedon yhdestä näkymästä
- Voi tehdä päätöksen seuraavista askeleista välittömästi
- Säästää aikaa: 3 tuntia → 5 minuuttia per prospekti

### Secondary Users

| Käyttäjätyyppi | Tarve | MVP-prioriteetti |
|----------------|-------|------------------|
| **Sijoittaja / analyytikko** | Taloustiedot, riskit, yrityksen vakaus | Matala |
| **Konsultti** | Kokonaiskuva, markkinadata, kilpailijat | Matala |
| **Esimiehet** | Raportointi, seuranta | Matala |
| **Assistentit** | Tiedon koostaminen | Matala |

*Toissijaiset käyttäjät hyötyvät työkalusta, mutta MVP keskittyy myyjien tarpeisiin.*

### User Journey: Mikko

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  LÖYTÄMINEN │───▶│ ENSIKOSKETUS│───▶│  YDINKÄYTTÖ │───▶│ ARVO-OIVALLUS│
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
│                  │                  │                  │
│ Kuulee           │ Syöttää          │ Päivittäinen     │ "3h → 5min"
│ kollegalta       │ ensimmäisen      │ prospektihaku,   │ Aha-hetki
│ tai LinkedIn-    │ yrityksen,       │ suodatus,        │ ensimmäisen
│ mainoksesta      │ näkee kaiken     │ vertailu,        │ päivän
│                  │ yhdellä          │ CRM-vienti       │ lopussa
│                  │ silmäyksellä     │                  │
└──────────────────┴──────────────────┴──────────────────┴──────────────────
```

---

## Success Metrics

### User Success Metrics

**Onnistumisen määritelmä:**
Mikko löytää kaiken olennaisen tiedon yhdellä haulla, säästää aikaa merkittävästi ja pystyy valmistautumaan prospekteihin nopeammin kuin ennen.

**Onnistumisen hetki:**
Käyttäjä syöttää yrityksen nimen → saa kaikki tiedot yhdestä näkymästä muutamassa minuutissa → "Tämä toimii!"

**Käyttäytymismittarit:**
| Mittari | Kuvaus |
|---------|--------|
| Hakujen määrä / päivä | Osoittaa aktiivista käyttöä |
| Tallennetut profiilit | Osoittaa arvon löytymistä |
| CRM-integraation käyttö | Osoittaa työnkulkuun sulautumista |

### Business Objectives

**3 kuukauden tavoitteet:**
- 50–100 aktiivista käyttäjää
- Korkea hakujen määrä per käyttäjä
- Positiivinen käyttäjäpalaute

**12 kuukauden tavoitteet:**
- 500+ käyttäjää (laajennus tiimeihin)
- Lisenssimyynti ja liikevaihdon kasvu
- ≥70% käyttäjistä aktiivisia viikoittain

### Key Performance Indicators

| KPI | Tavoite (3kk) | Tavoite (12kk) |
|-----|---------------|----------------|
| **Aktiiviset käyttäjät / viikko** | 50–100 | 500+ |
| **Hakuja / käyttäjä / päivä** | ≥3 | ≥5 |
| **Viikoittain aktiivisten osuus** | ≥50% | ≥70% |
| **Maksavat asiakkaat** | Pilotti | Kasvava MRR |
| **NPS-pisteet** | ≥30 | ≥50 |

**North Star Metric:** *Ajansäästö per prospekti (3h → 5min)*

---

## MVP Scope

### Core Features

**MVP:n kolme ydintoimintoa:**

| # | Ominaisuus | Sisältö |
|---|------------|---------|
| 1 | **Perustiedot** | Yrityksen nimi, toimiala, koko, sijainti |
| 2 | **Taloustiedot** | Liikevaihto, tulos, velat |
| 3 | **Uutiset** | Yrityskaupat, yt-neuvottelut, markkinauutiset |

**MVP:n arvolupaus:**
> Käyttäjä syöttää yrityksen nimen → saa kaiken olennaisen tiedon yhdestä näkymästä → säästää aikaa välittömästi.

### Out of Scope for MVP

| Ominaisuus | Syy rajaukseen |
|------------|----------------|
| **CRM-integraatio** | Lisäarvoa, mutta ei välttämätön ydinongelman ratkaisemiseksi |
| **Kilpailijavertailu** | Vaatii laajempaa dataa ja logiikkaa |
| **Riskianalyysi** | Edellyttää kehittyneempiä malleja |
| **Ennakoivat suositukset** | V2-ominaisuus |

*Nämä ominaisuudet lisätään kun käyttäjät ovat sitoutuneet MVP:hen.*

### MVP Success Criteria

MVP on onnistunut kun:
- ✅ Käyttäjä löytää yrityksen perustiedot, taloustiedot ja uutiset yhdellä haulla
- ✅ Hakuaika: < 1 minuutti (vs. aiemmin tunteja)
- ✅ 50–100 aktiivista käyttäjää 3kk sisällä
- ✅ Positiivinen käyttäjäpalaute ja toistuva käyttö

### Future Vision

**2–3 vuoden päästä Business Research Portal on:**

- **Laajempi markkina:** Kansainväliset yritykset, uudet toimialat ja segmentit
- **Lisäominaisuudet:** Kilpailija-analyysi, riskiarviot, CRM-integraatiot (Salesforce, HubSpot), automatisoidut raportit
- **Ekosysteemi:** Jaetut näkemykset ja yhteistyö, edistynyt suodatus ja vertailu, interaktiivinen AG-UI

