// News Search Service using Tavily API
// https://tavily.com

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

export interface NewsSearchResult {
  companyName: string;
  items: NewsItem[];
  error?: string;
}

interface TavilyResult {
  title: string;
  url: string;
  content: string;
  published_date?: string;
}

interface TavilyResponse {
  results: TavilyResult[];
}

function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace("www.", "");
  } catch {
    return "Tuntematon lähde";
  }
}

export async function searchNews(companyName: string): Promise<NewsSearchResult> {
  const apiKey = process.env.TAVILY_API_KEY;

  if (!apiKey) {
    console.warn("TAVILY_API_KEY not set, returning empty results");
    return { companyName, items: [] };
  }

  try {
    const query = `${companyName} uutiset yritys`;

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(15_000),
      body: JSON.stringify({
        api_key: apiKey,
        query,
        search_depth: "basic",
        include_domains: [
          "kauppalehti.fi",
          "hs.fi",
          "yle.fi",
          "talouselama.fi",
          "arvopaperi.fi",
          "tekniikkatalous.fi",
          "taloussanomat.fi",
          "is.fi",
          "iltalehti.fi",
        ],
        max_results: 5,
      }),
    });

    if (!response.ok) {
      console.error("Tavily API error:", response.status);
      return { companyName, items: [], error: "Uutishaku epäonnistui" };
    }

    const data: TavilyResponse = await response.json();

    const items: NewsItem[] = data.results.map((result, index) => ({
      id: String(index + 1),
      title: result.title,
      description: result.content.slice(0, 200) + (result.content.length > 200 ? "..." : ""),
      source: extractDomain(result.url),
      url: result.url,
      publishedAt: result.published_date || new Date().toISOString().split("T")[0],
    }));

    return { companyName, items };
  } catch (error) {
    console.error("News search error:", error);
    return { companyName, items: [], error: "Uutishaku epäonnistui" };
  }
}
