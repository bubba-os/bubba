import "@/styles/globals.css";
import { cn } from "@bubba-beta/ui/cn";
import "@bubba-beta/ui/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { Toaster } from "sonner";
import { Providers } from "./providers";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.bubba.ai"),
  title: "Bubba AI | Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
  description: "Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
  twitter: {
    title: "Bubba AI | Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
    description: "Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
    images: [
      {
        url: "https://cdn.bubba.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.bubba.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
  },
  openGraph: {
    title: "Bubba AI | Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
    description: "Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
    url: "https://app.bubba.ai",
    siteName: "Bubba AI",
    images: [
      {
        url: "https://cdn.bubba.ai/opengraph-image.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "https://cdn.bubba.ai/opengraph-image.jpg",
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export const preferredRegion = ["fra1", "sfo1", "iad1"];
export const maxDuration = 60;

export default function Layout({
  children,
  params: { locale },
}: {
  children: ReactElement;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          `${GeistSans.variable} ${GeistMono.variable}`,
          "whitespace-pre-line overscroll-none antialiased",
        )}
      >
        <NuqsAdapter>
          <Providers>{children}</Providers>
        </NuqsAdapter>
        <Toaster richColors />
      </body>
    </html>
  );
}
