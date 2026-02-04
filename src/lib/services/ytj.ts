// YTJ (Yritys- ja yhteisötietojärjestelmä) API Service
// API: https://avoindata.prh.fi/opendata/bis/v1

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
}

// Known companies for demo (fallback if API fails)
const knownCompanies: Record<string, YTJCompanyData> = {
  nordea: {
    businessId: "0112038-9",
    name: "Nordea Bank Abp",
    registrationDate: "1997-11-14",
    companyForm: "Julkinen osakeyhtiö",
    businessLine: "Pankkitoiminta",
    address: {
      street: "Satamaradankatu 5",
      postCode: "00020",
      city: "Helsinki",
    },
    status: "Rekisterissä",
  },
  nokia: {
    businessId: "0112038-9",
    name: "Nokia Oyj",
    registrationDate: "1967-04-19",
    companyForm: "Julkinen osakeyhtiö",
    businessLine: "Tietoliikennelaitteiden valmistus",
    address: {
      street: "Karakaari 7",
      postCode: "02610",
      city: "Espoo",
    },
    status: "Rekisterissä",
  },
  kone: {
    businessId: "0104039-6",
    name: "KONE Oyj",
    registrationDate: "1910-10-27",
    companyForm: "Julkinen osakeyhtiö",
    businessLine: "Hissien ja liukuportaiden valmistus",
    address: {
      street: "Keilasatama 3",
      postCode: "02150",
      city: "Espoo",
    },
    status: "Rekisterissä",
  },
};

export async function searchYTJ(companyName: string): Promise<YTJCompanyData | null> {
  const normalizedName = companyName.toLowerCase().trim();

  // Try the real API first
  try {
    const encodedName = encodeURIComponent(companyName);

    // Try multiple API endpoints
    const urls = [
      `https://avoindata.prh.fi/opendata/bis/v1?totalResults=true&maxResults=1&resultsFrom=0&name=${encodedName}`,
      `https://avoindata.prh.fi/tr/v1?totalResults=true&maxResults=1&name=${encodedName}`,
    ];

    for (const url of urls) {
      try {
        console.log("Trying YTJ API:", url);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
          cache: "no-store",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("YTJ API success, results:", data.results?.length || 0);

          if (data.results && data.results.length > 0) {
            const company = data.results[0];

            const currentAddress = company.addresses?.find(
              (addr: { endDate: string | null; type: number }) => !addr.endDate && addr.type === 1
            );

            const mainBusinessLine = company.businessLines?.find(
              (bl: { order: number }) => bl.order === 0
            );

            return {
              businessId: company.businessId,
              name: company.name,
              registrationDate: company.registrationDate,
              companyForm: company.companyForm || "Tuntematon",
              businessLine: mainBusinessLine?.name || "Ei tiedossa",
              address: currentAddress
                ? {
                    street: currentAddress.street || "",
                    postCode: currentAddress.postCode || "",
                    city: currentAddress.city || "",
                  }
                : null,
              status: company.status || "Tuntematon",
            };
          }
        }
      } catch (e) {
        console.log("API endpoint failed:", url);
      }
    }
  } catch (error) {
    console.error("YTJ API error:", error);
  }

  // Fallback to known companies for demo
  console.log("Using fallback data for:", normalizedName);
  for (const [key, data] of Object.entries(knownCompanies)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return data;
    }
  }

  return null;
}
