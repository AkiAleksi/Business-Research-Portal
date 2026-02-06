"use client";

import { Newspaper, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  publishedAt: string;
}

interface NewsCardProps {
  items: NewsItem[];
  companyName: string;
}

export function NewsCard({ items, companyName }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("fi-FI", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (items.length === 0) {
    return (
      <Card className="md:col-span-2 glass overflow-hidden relative hover:shadow-lg transition-shadow duration-300">
        <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Newspaper className="h-5 w-5 text-primary" />
              Uutiset
            </CardTitle>
            <Badge>Uutiset</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Ei uutisia saatavilla yrityksestä {companyName}.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="md:col-span-2 glass overflow-hidden relative hover:shadow-lg transition-shadow duration-300">
      {/* Green accent bar */}
      <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-400" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Newspaper className="h-5 w-5 text-primary" />
            Viimeisimmät uutiset
          </CardTitle>
          <Badge>Uutiset</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border/50">
          {items.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 -mx-3 rounded-lg hover:bg-muted/60 hover:translate-x-1 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">{item.source}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.publishedAt)}
                    </span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0 mt-1" />
              </div>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
