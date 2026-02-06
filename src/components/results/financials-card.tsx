"use client";

import { TrendingUp, Users, Wallet, PiggyBank, ExternalLink, Shield, ShieldAlert, ShieldQuestion } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FinancialData {
  businessId: string;
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

interface FinancialsCardProps {
  data: FinancialData;
}

export function FinancialsCard({ data }: FinancialsCardProps) {
  const formatCurrency = (value: number | null) => {
    if (value === null) return "–";
    return new Intl.NumberFormat("fi-FI", {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  };

  const formatNumber = (value: number | null) => {
    if (value === null) return "–";
    return new Intl.NumberFormat("fi-FI").format(value);
  };

  if (!data.dataAvailable) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Taloustiedot
            </CardTitle>
            <Badge variant="outline">PRH</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Taloustietoja ei ole saatavilla tästä yrityksestä.
          </p>
        </CardContent>
      </Card>
    );
  }

  const hasNumericData = data.revenue !== null || data.profit !== null || data.equity !== null || data.employees !== null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Taloustiedot {data.fiscalYear}
          </CardTitle>
          <Badge variant="outline">{data.source || "PRH"}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasNumericData && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Wallet className="h-3 w-3" />
                Liikevaihto
              </div>
              <p className="text-lg font-semibold">{formatCurrency(data.revenue)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <PiggyBank className="h-3 w-3" />
                Tulos
              </div>
              <p className={`text-lg font-semibold ${data.profit && data.profit < 0 ? "text-destructive" : ""}`}>
                {formatCurrency(data.profit)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <TrendingUp className="h-3 w-3" />
                Oma pääoma
              </div>
              <p className="text-lg font-semibold">{formatCurrency(data.equity)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Users className="h-3 w-3" />
                Henkilöstö
              </div>
              <p className="text-lg font-semibold">{formatNumber(data.employees)}</p>
            </div>
          </div>
        )}

        {data.summary && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">{data.summary}</p>
          </div>
        )}

        {(data.confidence || data.sourceUrl) && (
          <div className="pt-2 border-t flex items-center justify-between text-xs">
            {data.confidence && (
              <div className="flex items-center gap-1">
                {data.confidence === "high" && (
                  <>
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-green-600">Luotettava</span>
                  </>
                )}
                {data.confidence === "medium" && (
                  <>
                    <ShieldAlert className="h-3 w-3 text-yellow-600" />
                    <span className="text-yellow-600">Kohtalainen</span>
                  </>
                )}
                {data.confidence === "low" && (
                  <>
                    <ShieldQuestion className="h-3 w-3 text-red-600" />
                    <span className="text-red-600">Epävarma</span>
                  </>
                )}
              </div>
            )}
            {data.sourceUrl && (
              <a
                href={data.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                Lähde <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
