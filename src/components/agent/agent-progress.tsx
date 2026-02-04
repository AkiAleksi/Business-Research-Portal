"use client";

import { AgentStep, StepStatus } from "./agent-step";

export interface ToolStep {
  id: string;
  name: string;
  description: string;
  status: StepStatus;
  source?: string;
}

interface AgentProgressProps {
  steps: ToolStep[];
  isComplete: boolean;
}

export function AgentProgress({ steps, isComplete }: AgentProgressProps) {
  if (steps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          Agentin toiminta
        </h3>
        {isComplete && (
          <span className="text-xs text-green-600 font-medium">
            ✓ Valmis
          </span>
        )}
      </div>
      <div className="space-y-2">
        {steps.map((step) => (
          <AgentStep
            key={step.id}
            name={step.name}
            description={step.description}
            status={step.status}
            source={step.source}
          />
        ))}
      </div>
    </div>
  );
}
