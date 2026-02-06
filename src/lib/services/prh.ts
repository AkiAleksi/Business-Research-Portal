// Financial Data Service using Tavily search + Claude AI parsing
// Searches for real financial data and uses Claude to extract structured information

import Anthropic from "@anthropic-ai/sdk";

export interface PRHFinancialData {
  businessId: string;
  companyName?: string;
  fiscalYear: string;
  revenue: number | null;
  profit: number | null;
  equity: number | null;
  employees: number | null;
  dataAvailable: boolean;
  source?: string;
  sourceUrl?: string;
  summary?: string;
  confidence?: "high" | "medium" | "low";
}

interface TavilyResult {
  title: string;
  url: string;
  content: string;
}

interface ClaudeFinancialData {
  fiscalYear: string | null;
  revenue: number | null;
  profit: number | null;
  equity: number | null;
  employees: number | null;
  summary: string;
  confidence: "high" | "medium" | "low";
  sourceUrl: string | null;
}

async function parseWithClaude(
  companyName: string,
  searchResults: TavilyResult[]
): Promise<ClaudeFinancialData | null> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    console.log("ANTHROPIC_API_KEY not set, skipping Claude parsing");
    return null;
  }

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  const resultsText = searchResults
    .map((r, i) => `[Lähde ${i + 1}: ${r.url}]\n${r.title}\n${r.content}`)
    .join("\n\n---\n\n");

  const prompt = `Analysoi seuraavat hakutulokset yrityksestä "${companyName}" ja poimi taloustiedot.

HAKUTULOKSET:
${resultsText}

Poimi tiedot JSON-muodossa. Anna luvut euroina (ei miljoonina/miljardeina). Jos tietoa ei löydy, käytä null.

Vastaa VAIN tällä JSON-rakenteella:
{
  "fiscalYear": "2024 tai 2023 tms",
  "revenue": 1234567890,
  "profit": 123456789,
  "equity": 123456789,
  "employees": 1234,
  "summary": "Lyhyt yhteenveto yrityksen taloudellisesta tilanteesta (max 200 merkkiä)",
  "confidence": "high/medium/low",
  "sourceUrl": "url mistä tieto löytyi"
}

Confidence:
- "high" = tiedot löytyivät luotettavasta lähteestä (asiakastieto, kauppalehti, virallinen tilinpäätös)
- "medium" = tiedot löytyivät mutta lähde epävarma tai tiedot voivat olla vanhoja
- "low" = tiedot epävarmoja tai puutteellisia

TÄRKEÄÄ:
- Varmista että tiedot koskevat oikeaa yritystä (${companyName})
- Muunna "1,7 miljardia" → 1700000000, "29,8 miljoonaa" → 29800000
- Anna vain JSON, ei muuta tekstiä`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.content[0];
    if (content.type !== "text") return null;

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]) as ClaudeFinancialData;
    console.log("Claude parsed financial data:", parsed);
    return parsed;
  } catch (error) {
    console.error("Claude parsing error:", error);
    return null;
  }
}

export async function searchPRH(
  businessId: string,
  companyName?: string
): Promise<PRHFinancialData> {
  const tavilyKey = process.env.TAVILY_API_KEY;

  // First try PRH XBRL API for official data
  try {
    const prhResponse = await fetch(
      `https://avoindata.prh.fi/opendata-xbrl-api/v3/financials?businessId=${businessId}`
    );

    if (prhResponse.ok) {
      const prhData = await prhResponse.json();
      if (prhData.financials && prhData.financials.length > 0) {
        const latest = prhData.financials[0];
        console.log("PRH XBRL data found for:", businessId);
        return {
          businessId,
          fiscalYear: latest.fiscalYear || new Date().getFullYear().toString(),
          revenue: latest.revenue || null,
          profit: latest.profit || null,
          equity: latest.equity || null,
          employees: latest.employees || null,
          dataAvailable: true,
          source: "PRH",
          confidence: "high",
        };
      }
    }
  } catch (error) {
    console.log("PRH XBRL API not available:", error);
  }

  // Fall back to Tavily + Claude for financial info
  if (!tavilyKey || !companyName) {
    return {
      businessId,
      fiscalYear: new Date().getFullYear().toString(),
      revenue: null,
      profit: null,
      equity: null,
      employees: null,
      dataAvailable: false,
    };
  }

  try {
    const query = `${companyName} liikevaihto tulos tilinpäätös 2024`;
    console.log("Tavily financial search:", query);

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: tavilyKey,
        query,
        search_depth: "advanced",
        include_domains: [
          "asiakastieto.fi",
          "finder.fi",
          "kauppalehti.fi",
          "hs.fi",
          "talouselama.fi",
          "arvopaperi.fi",
          "yle.fi",
        ],
        max_results: 5,
      }),
    });

    if (!response.ok) {
      console.error("Tavily financial search error:", response.status);
      return {
        businessId,
        fiscalYear: new Date().getFullYear().toString(),
        revenue: null,
        profit: null,
        equity: null,
        employees: null,
        dataAvailable: false,
      };
    }

    const data = await response.json();
    const results: TavilyResult[] = data.results || [];

    if (results.length === 0) {
      return {
        businessId,
        companyName,
        fiscalYear: new Date().getFullYear().toString(),
        revenue: null,
        profit: null,
        equity: null,
        employees: null,
        dataAvailable: false,
      };
    }

    // Use Claude to intelligently parse the results
    const claudeData = await parseWithClaude(companyName, results);

    if (claudeData) {
      return {
        businessId,
        companyName,
        fiscalYear: claudeData.fiscalYear || "2024",
        revenue: claudeData.revenue,
        profit: claudeData.profit,
        equity: claudeData.equity,
        employees: claudeData.employees,
        dataAvailable: true,
        source: "Tavily + Claude",
        sourceUrl: claudeData.sourceUrl || undefined,
        summary: claudeData.summary,
        confidence: claudeData.confidence,
      };
    }

    // Fallback if Claude fails
    return {
      businessId,
      companyName,
      fiscalYear: "2024",
      revenue: null,
      profit: null,
      equity: null,
      employees: null,
      dataAvailable: false,
      summary: "Taloustietoja ei voitu analysoida",
    };
  } catch (error) {
    console.error("Financial search error:", error);
    return {
      businessId,
      fiscalYear: new Date().getFullYear().toString(),
      revenue: null,
      profit: null,
      equity: null,
      employees: null,
      dataAvailable: false,
    };
  }
}
