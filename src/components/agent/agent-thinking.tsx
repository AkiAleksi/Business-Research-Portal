"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ThinkingMessage {
  id: string;
  message: string;
  timestamp: Date;
}

interface AgentThinkingProps {
  messages: ThinkingMessage[];
  isComplete: boolean;
}

export function AgentThinking({ messages, isComplete }: AgentThinkingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
      {/* Terminal header */}
      <div className="px-4 py-2 bg-zinc-800 border-b border-zinc-700 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-zinc-400 text-sm font-mono ml-2">
          Agentin ajattelu
        </span>
        {!isComplete && (
          <div className="ml-auto flex items-center gap-2">
            <span className="text-green-400 text-xs font-medium">LIVE</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
        )}
        {isComplete && (
          <div className="ml-auto">
            <span className="text-zinc-500 text-xs">Valmis</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div
        ref={containerRef}
        className="p-4 max-h-64 overflow-y-auto font-mono text-sm space-y-1"
      >
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-1 duration-200",
              index === messages.length - 1 && !isComplete && "text-green-400"
            )}
          >
            <span className="text-zinc-600 text-xs mt-0.5 shrink-0 tabular-nums">
              {msg.timestamp.toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
            <span className="text-green-500">&gt;</span>
            <span className={cn(
              "text-zinc-300",
              index === messages.length - 1 && !isComplete && "text-green-400"
            )}>
              {msg.message}
            </span>
          </div>
        ))}

        {/* Cursor */}
        {!isComplete && (
          <div className="flex items-center gap-3 text-zinc-500">
            <span className="text-zinc-600 text-xs mt-0.5 shrink-0 tabular-nums">
              {new Date().toLocaleTimeString("fi-FI", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
            <span className="text-green-500">&gt;</span>
            <span className="inline-block w-2 h-4 bg-green-500 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
}
