import { CompanyResearch } from "@/components/research/company-research";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Tutki yrityksiä <span className="text-primary">tekoälyllä</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Hae yrityksen tiedot YTJ:stä, PRH:sta ja uutislähteistä yhdellä haulla.
            Näet reaaliajassa mitä agentti tekee.
          </p>
        </div>

        {/* Research Component */}
        <CompanyResearch />
      </div>
    </div>
  );
}
