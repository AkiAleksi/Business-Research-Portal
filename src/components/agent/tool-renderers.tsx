"use client";

import { useRenderToolCall } from "@copilotkit/react-core";
import { AgentStep } from "./agent-step";
import type { SubStep } from "./agent-step";
import { CompanyCard } from "@/components/results/company-card";
import { FinancialsCard } from "@/components/results/financials-card";
import { NewsCard } from "@/components/results/news-card";
import type { YTJCompanyData } from "@/lib/services/ytj";
import type { PRHFinancialData } from "@/lib/services/prh";
import type { NewsItem } from "@/lib/services/news";

function parseResult(result: unknown): Record<string, unknown> | null {
  if (result == null) return null;
  if (typeof result === "object") return result as Record<string, unknown>;
  if (typeof result === "string") {
    try {
      return JSON.parse(result);
    } catch {
      return null;
    }
  }
  return null;
}

const ytjSubSteps: SubStep[] = [
  { label: "Yhdistetään YTJ-rekisteriin...", delayMs: 0 },
  { label: "Haetaan yritystietoja kaupparekisteristä...", delayMs: 1500 },
  { label: "Pisteytetään ja valitaan paras osuma...", delayMs: 3500 },
];

const prhSubSteps: SubStep[] = [
  { label: "Haetaan virallisia tilinpäätöstietoja PRH:sta...", delayMs: 0 },
  { label: "Etsitään taloustietoja uutislähteistä (Tavily)...", delayMs: 3000 },
  { label: "Analysoidaan tuloksia tekoälyllä (Claude AI)...", delayMs: 6000 },
  { label: "Kootaan talousyhteenveto...", delayMs: 10000 },
];

const newsSubSteps: SubStep[] = [
  { label: "Yhdistetään uutispalveluun...", delayMs: 0 },
  { label: "Haetaan: Kauppalehti, HS, YLE, Talouselämä...", delayMs: 1500 },
  { label: "Käsitellään ja järjestetään artikkelit...", delayMs: 3500 },
];

export function ToolRenderers() {
  useRenderToolCall({
    name: "searchYTJ",
    description: "Hae yrityksen perustiedot YTJ:stä",
    parameters: [
      {
        name: "companyName",
        type: "string",
        description: "Yrityksen nimi",
        required: true,
      },
    ],
    render: ({ status, args, result: rawResult }) => {
      if (status !== "complete") {
        return (
          <AgentStep
            name="YTJ-haku"
            description={`Haetaan tietoja: ${args.companyName ?? ""}...`}
            status="loading"
            source="YTJ"
            subSteps={ytjSubSteps}
          />
        );
      }

      const result = parseResult(rawResult);

      if (!result?.found || !result?.data) {
        return (
          <AgentStep
            name="YTJ-haku"
            description={`Yritystä "${args.companyName}" ei löytynyt YTJ:stä`}
            status="complete"
            source="YTJ"
          />
        );
      }

      return <CompanyCard data={result.data as YTJCompanyData} />;
    },
  });

  useRenderToolCall({
    name: "searchPRH",
    description: "Hae yrityksen taloustiedot",
    parameters: [
      {
        name: "businessId",
        type: "string",
        description: "Y-tunnus",
        required: true,
      },
      {
        name: "companyName",
        type: "string",
        description: "Yrityksen nimi",
        required: true,
      },
    ],
    render: ({ status, args, result: rawResult }) => {
      if (status !== "complete") {
        return (
          <AgentStep
            name="Taloustiedot"
            description={`Haetaan taloustietoja: ${args.companyName ?? ""}...`}
            status="loading"
            source="PRH"
            subSteps={prhSubSteps}
          />
        );
      }

      const result = parseResult(rawResult);

      if (!result?.data) {
        return (
          <AgentStep
            name="Taloustiedot"
            description="Taloustietoja ei saatu haettua"
            status="complete"
            source="PRH"
          />
        );
      }

      return <FinancialsCard data={result.data as PRHFinancialData} />;
    },
  });

  useRenderToolCall({
    name: "searchNews",
    description: "Hae yritystä koskevat uutiset",
    parameters: [
      {
        name: "companyName",
        type: "string",
        description: "Yrityksen nimi",
        required: true,
      },
    ],
    render: ({ status, args, result: rawResult }) => {
      if (status !== "complete") {
        return (
          <AgentStep
            name="Uutishaku"
            description={`Haetaan uutisia: ${args.companyName ?? ""}...`}
            status="loading"
            source="Uutiset"
            subSteps={newsSubSteps}
          />
        );
      }

      const result = parseResult(rawResult);
      const data = result?.data as Record<string, unknown> | undefined;

      if (!data?.items) {
        return (
          <AgentStep
            name="Uutishaku"
            description="Uutisia ei saatu haettua"
            status="complete"
            source="Uutiset"
          />
        );
      }

      return (
        <NewsCard
          items={data.items as NewsItem[]}
          companyName={args.companyName}
        />
      );
    },
  });

  return null;
}
