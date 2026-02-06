"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { ToolRenderers } from "@/components/agent/tool-renderers";

export function CompanyResearch() {
  return (
    <div className="space-y-6">
      <ToolRenderers />
      <CopilotChat
        className="min-h-[500px] rounded-xl glass shadow-lg ring-1 ring-border/50"
        instructions={`Olet suomalaisten yritysten tutkija-agentti. Kun käyttäjä antaa yrityksen nimen:
1. Hae ensin yrityksen perustiedot YTJ:stä (searchYTJ).
2. Jos YTJ palauttaa Y-tunnuksen, hae taloustiedot (searchPRH) käyttäen Y-tunnusta ja yrityksen nimeä.
3. Hae myös viimeisimmät uutiset (searchNews).
4. Lopuksi anna lyhyt suomenkielinen yhteenveto löydöksistä.
Vastaa aina suomeksi.`}
        labels={{
          title: "Yritystutkimus",
          placeholder: "Syötä yrityksen nimi, esim. Nokia, Kone, Nordea...",
          initial: "Tervetuloa! Kirjoita yrityksen nimi aloittaaksesi tutkimuksen.",
          stopGenerating: "Pysäytä",
        }}
      />
    </div>
  );
}
