import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  EmptyAdapter,
} from "@copilotkit/runtime";
import { BuiltInAgent } from "@copilotkitnext/agent";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { searchYTJ } from "@/lib/services/ytj";
import { searchPRH } from "@/lib/services/prh";
import { searchNews } from "@/lib/services/news";

const anthropic = createAnthropic({
  fetch: (url, init) =>
    fetch(url, { ...init, signal: AbortSignal.timeout(60_000) }),
});

const agent = new BuiltInAgent({
  model: anthropic("claude-sonnet-4-20250514"),
  maxSteps: 10,
  prompt: `Olet yritystutkimusagentti. Kun käyttäjä pyytää tietoja yrityksestä, hae AINA automaattisesti kaikki kolme tietolähdettä:
1. Perustiedot YTJ:stä (searchYTJ)
2. Taloustiedot (searchPRH) - käytä YTJ:stä saatua Y-tunnusta ja nimeä
3. Uutiset (searchNews)

Älä kysy käyttäjältä haluaako hän lisätietoja - hae kaikki tiedot kerralla.
Vastaa aina suomeksi. Esitä yhteenveto löydetyistä tiedoista.`,
  tools: [
    {
      name: "searchYTJ",
      description:
        "Hae yrityksen perustiedot YTJ:stä (Yritys- ja yhteisötietojärjestelmä). Palauttaa yrityksen nimen, Y-tunnuksen, toimialan, osoitteen ja rekisteröintipäivän. Tukee hakua sekä nimellä että Y-tunnuksella (esim. 0728786-8).",
      parameters: z.object({
        companyName: z.string().trim().max(200).describe("Yrityksen nimi tai Y-tunnus (esim. 0728786-8)"),
      }),
      execute: async ({ companyName }: { companyName: string }) => {
        const result = await searchYTJ(companyName);
        if (!result) {
          return JSON.stringify({ found: false, message: "Yritystä ei löytynyt YTJ:stä." });
        }
        return JSON.stringify({ found: true, data: result, source: "YTJ" });
      },
    },
    {
      name: "searchPRH",
      description:
        "Hae yrityksen taloustiedot (liikevaihto, tulos, henkilöstömäärä). Käyttää Tavily-hakua ja Claude AI:ta tietojen analysointiin.",
      parameters: z.object({
        businessId: z.string().trim().max(20).describe("Yrityksen Y-tunnus (esim. 0112038-9)"),
        companyName: z.string().trim().max(200).describe("Yrityksen nimi (tarvitaan hakuun)"),
      }),
      execute: async ({ businessId, companyName }: { businessId: string; companyName: string }) => {
        const result = await searchPRH(businessId, companyName);
        return JSON.stringify({ data: result, source: "Tavily + Claude" });
      },
    },
    {
      name: "searchNews",
      description:
        "Hae yritystä koskevat viimeisimmät uutiset. Palauttaa uutisotsikot, lähteet ja linkit.",
      parameters: z.object({
        companyName: z.string().trim().max(200).describe("Yrityksen nimi, jonka uutisia haetaan"),
      }),
      execute: async ({ companyName }: { companyName: string }) => {
        const result = await searchNews(companyName);
        return JSON.stringify({ data: result, source: "News" });
      },
    },
  ],
});

// CopilotKit:n agents-tyyppi ei ole suoraan yhteensopiva BuiltInAgent:n kanssa
const runtime = new CopilotRuntime({
  agents: { default: agent } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
});

export const POST = async (req: Request) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    endpoint: "/api/copilotkit",
    serviceAdapter: new EmptyAdapter(),
  });

  return handleRequest(req);
};
