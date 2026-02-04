"use client";

import { SessionProvider } from "next-auth/react";
import { CopilotKit } from "@copilotkit/react-core";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CopilotKit runtimeUrl="/api/copilotkit">
        {children}
      </CopilotKit>
    </SessionProvider>
  );
}
