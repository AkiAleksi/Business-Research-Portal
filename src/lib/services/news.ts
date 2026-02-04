// News Search Service
// In production, this could use Google News API, NewsAPI.org, or web scraping

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

// Mock news data for demonstration
const mockNewsData: Record<string, NewsItem[]> = {
  nordea: [
    {
      id: "1",
      title: "Nordea ylitti analyytikkojen odotukset Q4-tuloksessa",
      description: "Nordean neljännen vuosineljänneksen tulos oli odotettua parempi vahvan korkokatteen ansiosta.",
      source: "Kauppalehti",
      url: "https://www.kauppalehti.fi",
      publishedAt: "2024-02-01",
    },
    {
      id: "2",
      title: "Nordea nostaa osinkoa – sijoittajat tyytyväisiä",
      description: "Pankki ilmoitti nostavansa osinkoaan 15 prosentilla edellisvuodesta.",
      source: "Helsingin Sanomat",
      url: "https://www.hs.fi",
      publishedAt: "2024-01-28",
    },
    {
      id: "3",
      title: "Nordea laajentaa mobiilipankkipalveluitaan",
      description: "Uudet ominaisuudet mahdollistavat entistä helpomman päivittäispankkiasioinnin.",
      source: "Talouselämä",
      url: "https://www.talouselama.fi",
      publishedAt: "2024-01-15",
    },
  ],
  nokia: [
    {
      id: "1",
      title: "Nokia sai merkittävän 5G-sopimuksen Aasiasta",
      description: "Sopimuksen arvo on useita satoja miljoonia euroja ja kattaa verkon rakentamisen seuraavan viiden vuoden aikana.",
      source: "Kauppalehti",
      url: "https://www.kauppalehti.fi",
      publishedAt: "2024-02-02",
    },
    {
      id: "2",
      title: "Nokia esitteli uuden teknologian MWC-messuilla",
      description: "Yhtiö toi esille innovatiivisen ratkaisun teollisuuden 5G-tarpeisiin.",
      source: "Tekniikka & Talous",
      url: "https://www.tekniikkatalous.fi",
      publishedAt: "2024-01-30",
    },
    {
      id: "3",
      title: "Analyytikot: Nokia-osake aliarvostettu",
      description: "Useat analyysitalot ovat nostaneet Nokian tavoitehintaa viime viikkoina.",
      source: "Arvopaperi",
      url: "https://www.arvopaperi.fi",
      publishedAt: "2024-01-22",
    },
  ],
  kone: [
    {
      id: "1",
      title: "KONE voitti suuren hissitilauksen Kiinasta",
      description: "Tilaus kattaa yli 500 hissiä uuteen asuinalueeseen Shanghaissa.",
      source: "Kauppalehti",
      url: "https://www.kauppalehti.fi",
      publishedAt: "2024-02-01",
    },
    {
      id: "2",
      title: "KONE panostaa kestävään kehitykseen",
      description: "Yhtiö julkisti uudet ympäristötavoitteensa vuodelle 2030.",
      source: "Helsingin Sanomat",
      url: "https://www.hs.fi",
      publishedAt: "2024-01-25",
    },
    {
      id: "3",
      title: "KONE:n toimitusjohtaja: Modernisointimarkkina kasvaa",
      description: "Vanhojen hissien uusiminen on kasvava liiketoiminta-alue.",
      source: "Talouselämä",
      url: "https://www.talouselama.fi",
      publishedAt: "2024-01-18",
    },
  ],
};

export async function searchNews(companyName: string): Promise<NewsSearchResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedName = companyName.toLowerCase().trim();

  // Check for mock data
  for (const [key, items] of Object.entries(mockNewsData)) {
    if (normalizedName.includes(key) || key.includes(normalizedName)) {
      return {
        companyName,
        items,
      };
    }
  }

  // Return empty results for unknown companies
  return {
    companyName,
    items: [],
  };
}
