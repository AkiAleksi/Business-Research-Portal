"use client";

import { Check, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "loading" | "complete" | "error";

interface AgentStepProps {
  name: string;
  description: string;
  status: StepStatus;
  source?: string;
}

const statusIcons = {
  pending: Clock,
  loading: Loader2,
  complete: Check,
  error: AlertCircle,
};

const statusColors = {
  pending: "text-muted-foreground",
  loading: "text-primary",
  complete: "text-green-600",
  error: "text-destructive",
};

const statusBgColors = {
  pending: "bg-muted",
  loading: "bg-primary/10",
  complete: "bg-green-100",
  error: "bg-destructive/10",
};

const statusBorderColors = {
  pending: "border",
  loading: "border-primary/30 shadow-sm shadow-primary/5",
  complete: "border-green-200 dark:border-green-900/30",
  error: "border-destructive/30",
};

export function AgentStep({ name, description, status, source }: AgentStepProps) {
  const Icon = statusIcons[status];

  return (
    <div className={cn("flex items-center gap-3 p-3 rounded-lg bg-card", statusBorderColors[status])}>
      <div
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full",
          statusBgColors[status],
          status === "loading" && "animate-pulse-ring"
        )}
      >
        <Icon
          className={cn(
            "h-4 w-4",
            statusColors[status],
            status === "loading" && "animate-spin"
          )}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>
      {source && status === "complete" && (
        <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
          {source}
        </span>
      )}
    </div>
  );
}
