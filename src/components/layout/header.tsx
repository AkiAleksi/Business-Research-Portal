"use client";

import { Building2 } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full glass-strong shadow-sm border-b border-border/50">
      <div className="container mx-auto flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">Business Research <span className="text-primary">Portal</span></span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.user.image || undefined} alt={session.user.name || "User"} />
                <AvatarFallback>
                  {session.user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm hidden sm:inline">{session.user.name}</span>
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                Kirjaudu ulos
              </Button>
            </div>
          ) : (
            <Button asChild size="sm" className="shadow-sm">
              <Link href="/login">Kirjaudu sisään</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
