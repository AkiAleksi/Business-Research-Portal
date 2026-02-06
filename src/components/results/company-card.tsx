"use client";

import { Building2, MapPin, Calendar, Briefcase, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  website?: string;
}

interface CompanyCardProps {
  data: CompanyData;
}

export function CompanyCard({ data }: CompanyCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("fi-FI");
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="glass overflow-hidden relative hover:shadow-lg transition-shadow duration-300">
      {/* Blue accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary to-primary/60" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Building2 className="h-5 w-5 text-primary" />
            {data.name}
          </CardTitle>
          <Badge>YTJ</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-24">Y-tunnus:</span>
            <span className="font-mono font-medium px-2 py-0.5 rounded bg-primary/10 text-primary">{data.businessId}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-muted-foreground w-24">Yhtiömuoto:</span>
            <span>{data.companyForm}</span>
          </div>

          <div className="flex items-start gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="flex-1">{data.businessLine}</span>
          </div>

          {data.address && (
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span>
                {data.address.street}, {data.address.postCode} {data.address.city}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Rekisteröity: {formatDate(data.registrationDate)}</span>
          </div>

          {data.website && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <a
                href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {data.website}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
