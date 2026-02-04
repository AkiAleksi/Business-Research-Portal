"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/search/search-input";
import { AgentProgress, ToolStep } from "@/components/agent/agent-progress";
import { CompanyCard } from "@/components/results/company-card";
import { FinancialsCard } from "@/components/results/financials-card";
import { NewsCard } from "@/components/results/news-card";
import { StepStatus } from "@/components/agent/agent-step";

interface CompanyData {
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

interface FinancialData {
  businessId: string;
  fiscalYear: string;
  revenue: number | null;
  profit: number | null;
  equity: number | null;
  employees: number | null;
  dataAvailable: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

interface NewsData {
  companyName: string;
  items: NewsItem[];
}

export function CompanyResearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [steps, setSteps] = useState<ToolStep[]>([]);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [searchedCompany, setSearchedCompany] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState("");

  const handleSearch = async (query: string) => {
    // Reset state
    setIsSearching(true);
    setIsComplete(false);
    setCompanyData(null);
    setFinancialData(null);
    setNewsData(null);
    setSearchedCompany(query);
    setLastQuery(query);
    setError(null);
    setSteps([
      {
        id: "ytj",
        name: "YTJ-haku",
        description: "Haetaan yrityksen perustiedot...",
        status: "loading" as StepStatus,
        source: "YTJ",
      },
      {
        id: "news",
        name: "Uutishaku",
        description: "Haetaan viimeisimmät uutiset...",
        status: "pending" as StepStatus,
        source: "Uutiset",
      },
    ]);

    try {
      // Call our search API
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: query }),
      });

      if (!response.ok) {
        throw new Error("Haku epäonnistui");
      }

      const data = await response.json();

      // Update YTJ step
      const ytjStatus: StepStatus = data.ytj ? "complete" : data.errors?.ytj ? "error" : "complete";
      setSteps((prev) =>
        prev.map((s) =>
          s.id === "ytj" ? { ...s, status: ytjStatus } : s
        )
      );

      // Update news step
      setSteps((prev) =>
        prev.map((s) =>
          s.id === "news"
            ? { ...s, status: (data.errors?.news ? "error" : "complete") as StepStatus }
            : s
        )
      );

      if (data.ytj) {
        setCompanyData(data.ytj);

        // Add PRH step after YTJ succeeds
        setSteps((prev) => {
          const prhExists = prev.some((s) => s.id === "prh");
          if (!prhExists) {
            const newsIndex = prev.findIndex((s) => s.id === "news");
            const newSteps = [...prev];
            newSteps.splice(newsIndex, 0, {
              id: "prh",
              name: "PRH-haku",
              description: "Haetaan taloustiedot...",
              status: (data.prh ? "complete" : data.errors?.prh ? "error" : "complete") as StepStatus,
              source: "PRH",
            });
            return newSteps;
          }
          return prev;
        });

        if (data.prh) {
          setFinancialData(data.prh);
        }
      } else if (!data.errors?.ytj) {
        setError("Yritystä ei löytynyt. Tarkista nimi ja yritä uudelleen.");
      }

      if (data.news) {
        setNewsData(data.news);
      }

      // Handle any errors
      if (data.errors?.ytj) {
        setError(data.errors.ytj);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Haku epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.");
      setSteps((prev) =>
        prev.map((s) => ({ ...s, status: "error" as StepStatus }))
      );
    } finally {
      setIsSearching(false);
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    if (lastQuery) {
      handleSearch(lastQuery);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Card */}
      <Card>
        <CardHeader>
          <CardTitle>Yritystutkimus</CardTitle>
          <CardDescription>
            Syötä yrityksen nimi ja tekoälyagentti hakee tiedot puolestasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchInput onSearch={handleSearch} isLoading={isSearching} />
        </CardContent>
      </Card>

      {/* Agent Progress */}
      {steps.length > 0 && (
        <AgentProgress steps={steps} isComplete={isComplete} />
      )}

      {/* Error with Retry */}
      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Yritä uudelleen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {(companyData || financialData || newsData) && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Tulokset: {searchedCompany}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {companyData && <CompanyCard data={companyData} />}
            {financialData && <FinancialsCard data={financialData} />}
            {newsData && (
              <NewsCard items={newsData.items} companyName={searchedCompany} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
