import {
  CopilotRuntime,
  AnthropicAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import Anthropic from "@anthropic-ai/sdk";
import { searchYTJ } from "@/lib/services/ytj";
import { searchPRH } from "@/lib/services/prh";
import { searchNews } from "@/lib/services/news";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const serviceAdapter = new AnthropicAdapter({
  anthropic,
  model: "claude-sonnet-4-20250514",
});

const runtime = new CopilotRuntime({
  actions: [
    {
      name: "searchYTJ",
      description:
        "Hae yrityksen perustiedot YTJ:stä (Yritys- ja yhteisötietojärjestelmä). Palauttaa yrityksen nimen, Y-tunnuksen, toimialan, osoitteen ja rekisteröintipäivän.",
      parameters: [
        {
          name: "companyName",
          type: "string",
          description: "Yrityksen nimi, jota haetaan",
          required: true,
        },
      ],
      handler: async ({ companyName }: { companyName: string }) => {
        const result = await searchYTJ(companyName);
        if (!result) {
          return { found: false, message: "Yritystä ei löytynyt YTJ:stä." };
        }
        return { found: true, data: result, source: "YTJ" };
      },
    },
    {
      name: "searchPRH",
      description:
        "Hae yrityksen taloustiedot PRH:sta (Patentti- ja rekisterihallitus). Palauttaa liikevaihdon, tuloksen, oman pääoman ja henkilöstömäärän.",
      parameters: [
        {
          name: "businessId",
          type: "string",
          description: "Yrityksen Y-tunnus (esim. 0112038-9)",
          required: true,
        },
      ],
      handler: async ({ businessId }: { businessId: string }) => {
        const result = await searchPRH(businessId);
        return { data: result, source: "PRH" };
      },
    },
    {
      name: "searchNews",
      description:
        "Hae yritystä koskevat viimeisimmät uutiset. Palauttaa uutisotsikot, lähteet ja linkit.",
      parameters: [
        {
          name: "companyName",
          type: "string",
          description: "Yrityksen nimi, jonka uutisia haetaan",
          required: true,
        },
      ],
      handler: async ({ companyName }: { companyName: string }) => {
        const result = await searchNews(companyName);
        return { data: result, source: "News" };
      },
    },
  ],
});

export const POST = async (req: Request) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter,
    endpoint: "/api/copilotkit",
  });

  return handleRequest(req);
};
