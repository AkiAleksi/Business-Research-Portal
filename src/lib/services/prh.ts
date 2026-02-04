// PRH (Patentti- ja rekisterihallitus) Financial Data Service
// Note: PRH doesn't have a free public API for financial statements
// This is a stub that returns mock data for demonstration

export interface PRHFinancialData {
  businessId: string;
  fiscalYear: string;
  revenue: number | null;
  profit: number | null;
  equity: number | null;
  employees: number | null;
  dataAvailable: boolean;
}

export async function searchPRH(businessId: string): Promise<PRHFinancialData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would call PRH's API or a third-party service
  // For now, return a stub response indicating data is not available
  // unless it's a well-known company for demo purposes

  const knownCompanies: Record<string, PRHFinancialData> = {
    "0112038-9": {
      // Nordea
      businessId: "0112038-9",
      fiscalYear: "2023",
      revenue: 10200000000,
      profit: 1800000000,
      equity: 35000000000,
      employees: 28000,
      dataAvailable: true,
    },
    "0116323-9": {
      // Nokia
      businessId: "0116323-9",
      fiscalYear: "2023",
      revenue: 22300000000,
      profit: 920000000,
      equity: 15400000000,
      employees: 86000,
      dataAvailable: true,
    },
    "0104039-6": {
      // KONE
      businessId: "0104039-6",
      fiscalYear: "2023",
      revenue: 11000000000,
      profit: 1200000000,
      equity: 4500000000,
      employees: 60000,
      dataAvailable: true,
    },
  };

  if (knownCompanies[businessId]) {
    return knownCompanies[businessId];
  }

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
