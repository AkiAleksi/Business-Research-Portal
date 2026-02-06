"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, AlertCircle } from "lucide-react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("dev@example.com");
  const [password, setPassword] = useState("dev");
  const [isLoading, setIsLoading] = useState(false);

  const getErrorMessage = (error: string) => {
    switch (error) {
      case "OAuthSignin":
      case "OAuthCallback":
        return "Virhe Google-kirjautumisessa. Yritä uudelleen.";
      case "OAuthAccountNotLinked":
        return "Tämä sähköposti on jo käytössä toisella tilillä.";
      case "SessionRequired":
        return "Kirjaudu sisään jatkaaksesi.";
      case "CredentialsSignin":
        return "Virheellinen sähköposti tai salasana.";
      default:
        return "Kirjautuminen epäonnistui. Yritä uudelleen.";
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("credentials", { email, password, callbackUrl });
    setIsLoading(false);
  };

  return (
    <Card className="glass-strong shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white shadow-lg shadow-primary/25">
            <Building2 className="h-8 w-8" />
          </div>
        </div>
        <CardTitle className="text-2xl">Kirjaudu sisään</CardTitle>
        <CardDescription>
          Kirjaudu Business Research Portaliin
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{getErrorMessage(error)}</AlertDescription>
          </Alert>
        )}

        {/* Development login form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-3">
          <div className="rounded-md bg-muted/50 p-2 text-xs text-muted-foreground text-center">
            Kehitystila - mikä tahansa sähköposti toimii
          </div>
          <Input
            type="email"
            placeholder="Sähköposti"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full shadow-md shadow-primary/20" disabled={isLoading}>
            {isLoading ? "Kirjaudutaan..." : "Kirjaudu kehitystilillä"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">tai</span>
          </div>
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={() => signIn("google", { callbackUrl })}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Jatka Google-tilillä
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Ei vielä tiliä?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Rekisteröidy
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

function LoginSkeleton() {
  return (
    <Card className="glass-strong shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Skeleton className="h-16 w-16 rounded-2xl" />
        </div>
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto mt-2" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
