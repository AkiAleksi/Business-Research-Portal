// YTJ (Yritys- ja yhteisötietojärjestelmä) API Service
// API v3: https://avoindata.prh.fi/opendata-ytj-api/v3

export interface YTJCompanyData {
  businessId: string;
  name: string;
  registrationDate: string;
  companyForm: string;
  businessLine: string;
  address: {
    street: string;
    postCode: string;
    city: string;
  } | null;
  status: string;
  website?: string;
}

// API response types
interface ApiCompany {
  businessId: { value: string; registrationDate: string };
  names: Array<{
    name: string;
    type: string;
    registrationDate: string;
    endDate?: string;
  }>;
  mainBusinessLine?: {
    descriptions: Array<{ languageCode: string; description: string }>;
  };
  companyForms?: Array<{
    descriptions: Array<{ languageCode: string; description: string }>;
  }>;
  addresses?: Array<{
    type: number;
    street: string;
    buildingNumber?: string;
    postCode: string;
    postOffices?: Array<{ city: string; languageCode: string }>;
  }>;
  registeredEntries?: Array<{
    type: string;
    descriptions: Array<{ languageCode: string; description: string }>;
  }>;
  website?: { url: string };
  registrationDate: string;
}

// Y-tunnus format: 7 digits, hyphen, 1 check digit (e.g. 0728786-8)
function isBusinessId(input: string): boolean {
  return /^\d{7}-\d$/.test(input.trim());
}

export async function searchYTJ(companyName: string): Promise<YTJCompanyData | null> {
  try {
    const trimmed = companyName.trim();
    const param = isBusinessId(trimmed)
      ? `businessId=${encodeURIComponent(trimmed)}`
      : `name=${encodeURIComponent(trimmed)}`;
    const url = `https://avoindata.prh.fi/opendata-ytj-api/v3/companies?${param}`;

    console.log("YTJ API v3:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("YTJ API error:", response.status);
      return null;
    }

    const data = await response.json();
    console.log("YTJ API results:", data.totalResults);

    if (!data.companies || data.companies.length === 0) {
      return null;
    }

    // Find best match with improved scoring
    const searchLower = companyName.toLowerCase().trim();
    const searchWords = searchLower.split(/\s+/);

    function scoreCompany(c: ApiCompany): number {
      let score = 0;
      const currentNames = c.names.filter((n) => !n.endDate);

      for (const nameObj of currentNames) {
        const name = nameObj.name.toLowerCase();

        // Exact match = highest score
        if (name === searchLower) return 1000;

        // Name starts with search term
        if (name.startsWith(searchLower)) score = Math.max(score, 500);

        // Search term is in name
        if (name.includes(searchLower)) score = Math.max(score, 300);

        // All search words are in name
        if (searchWords.every((w) => name.includes(w))) score = Math.max(score, 200);

        // Official name (type 1) bonus
        if (nameObj.type === "1") score += 50;
      }

      // Prefer registered companies (status 2 = registered)
      if (c.registeredEntries?.some((e) => e.type === "1")) score += 25;

      return score;
    }

    // Sort by score and pick best match
    const scoredCompanies = data.companies.map((c: ApiCompany) => ({
      company: c,
      score: scoreCompany(c),
    }));
    scoredCompanies.sort((a: {score: number}, b: {score: number}) => b.score - a.score);

    const company: ApiCompany = scoredCompanies[0].company;

    // Get current name (type 1 = official name, no endDate = current)
    const currentName = company.names.find(
      (n) => n.type === "1" && !n.endDate
    )?.name || company.names[0]?.name || companyName;

    // Get company form in Finnish (languageCode 1)
    const companyForm = company.companyForms?.[0]?.descriptions.find(
      (d) => d.languageCode === "1"
    )?.description || "Tuntematon";

    // Get business line in Finnish
    const businessLine = company.mainBusinessLine?.descriptions.find(
      (d) => d.languageCode === "1"
    )?.description || "Ei tiedossa";

    // Get visiting address (type 1)
    const address = company.addresses?.find((a) => a.type === 1);
    const city = address?.postOffices?.find(
      (p) => p.languageCode === "1"
    )?.city;

    // Get status from registered entries
    const statusEntry = company.registeredEntries?.find(
      (e) => e.type === "1"
    );
    const status = statusEntry?.descriptions.find(
      (d) => d.languageCode === "1"
    )?.description || "Tuntematon";

    return {
      businessId: company.businessId.value,
      name: currentName,
      registrationDate: company.registrationDate,
      companyForm,
      businessLine,
      address: address
        ? {
            street: [address.street, address.buildingNumber]
              .filter(Boolean)
              .join(" "),
            postCode: address.postCode,
            city: city || "",
          }
        : null,
      status,
      website: company.website?.url,
    };
  } catch (error) {
    console.error("YTJ API error:", error);
    return null;
  }
}
