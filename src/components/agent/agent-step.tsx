"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type StepStatus = "pending" | "loading" | "complete" | "error";

export interface SubStep {
  label: string;
  delayMs: number;
}

interface AgentStepProps {
  name: string;
  description: string;
  status: StepStatus;
  source?: string;
  subSteps?: SubStep[];
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

function ActiveSubSteps({ subSteps }: { subSteps: SubStep[] }) {
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => setElapsed(Date.now() - startRef.current), 200);
    return () => clearInterval(id);
  }, []);

  const visibleSteps = subSteps.filter((s) => elapsed >= s.delayMs);

  return (
    <div className="mt-2.5 ml-11 space-y-1.5">
      {visibleSteps.map((step, i) => {
        const isLast = i === visibleSteps.length - 1;
        return (
          <div
            key={step.label}
            className={cn(
              "flex items-center gap-2 text-xs animate-fade-in-up",
              isLast ? "text-foreground" : "text-muted-foreground"
            )}
            style={{ animationDuration: "0.3s" }}
          >
            {isLast ? (
              <Loader2 className="h-3 w-3 shrink-0 animate-spin text-primary" />
            ) : (
              <Check className="h-3 w-3 shrink-0 text-green-500" />
            )}
            <span>{step.label}</span>
          </div>
        );
      })}
      <div className="text-[10px] text-muted-foreground tabular-nums mt-1">
        {Math.floor(elapsed / 1000)}s kulunut
      </div>
    </div>
  );
}

export function AgentStep({ name, description, status, source, subSteps }: AgentStepProps) {
  const Icon = statusIcons[status];

  return (
    <div className={cn("rounded-lg bg-card", statusBorderColors[status])}>
      <div className="flex items-center gap-3 p-3">
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
      {status === "loading" && subSteps && subSteps.length > 0 && (
        <div className="px-3 pb-3">
          <ActiveSubSteps subSteps={subSteps} />
        </div>
      )}
    </div>
  );
}
