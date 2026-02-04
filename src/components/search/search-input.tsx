"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function SearchInput({ onSearch, isLoading, disabled }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading && !disabled) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Syötä yrityksen nimi, esim. Nordea, Nokia, Kone..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={isLoading || disabled}
        className="flex-1"
      />
      <Button type="submit" disabled={!query.trim() || isLoading || disabled}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Search className="h-4 w-4" />
        )}
        <span className="ml-2 hidden sm:inline">
          {isLoading ? "Haetaan..." : "Hae"}
        </span>
      </Button>
    </form>
  );
}
