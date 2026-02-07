"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh] px-4">
      <Card className="glass-strong shadow-xl max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-xl">Jokin meni pieleen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Sovelluksessa tapahtui odottamaton virhe. Yritä ladata sivu uudelleen.
          </p>
          {error.digest && (
            <p className="text-xs text-muted-foreground font-mono">
              Virhekoodi: {error.digest}
            </p>
          )}
          <Button onClick={reset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Yritä uudelleen
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
