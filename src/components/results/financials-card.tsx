"use client";

import { TrendingUp, Users, Wallet, PiggyBank } from "lucide-react";
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Taloustiedot {data.fiscalYear}
          </CardTitle>
          <Badge variant="outline">PRH</Badge>
        </div>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
