"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
