"use client";

import { useRenderToolCall } from "@copilotkit/react-core";
import { AgentStep } from "./agent-step";
import { CompanyCard } from "@/components/results/company-card";
import { FinancialsCard } from "@/components/results/financials-card";
import { NewsCard } from "@/components/results/news-card";

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

      return <CompanyCard data={result.data as never} />;
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

      return <FinancialsCard data={result.data as never} />;
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
          items={data.items as never}
          companyName={args.companyName}
        />
      );
    },
  });

  return null;
}
