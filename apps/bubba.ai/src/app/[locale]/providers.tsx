"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProviderClient } from "@/locales/client";
import type { ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
  locale: string;
};

export function Providers({ children, locale }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </I18nProviderClient>
  );
}
