import { CompanyResearch } from "@/components/research/company-research";
import { Building2, Database, TrendingUp, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-in-up">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Building2 className="h-4 w-4" />
            AI-pohjainen yritystutkimus
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Tutki yrityksiä{" "}
            <span className="text-gradient-primary">tekoälyllä</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hae yrityksen tiedot YTJ:stä, PRH:sta ja uutislähteistä yhdellä haulla.
            Näet reaaliajassa mitä agentti tekee.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.15s" }}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
              <Database className="h-3.5 w-3.5" />
              YTJ-rekisteri
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5" />
              Taloustiedot
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground">
              <Newspaper className="h-3.5 w-3.5" />
              Uutiset
            </div>
          </div>
        </div>

        {/* Research Component */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <CompanyResearch />
        </div>
      </div>
    </div>
  );
}
