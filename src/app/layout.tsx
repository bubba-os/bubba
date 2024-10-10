import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const data = {
  description:
    "Bubba is an open-source compliance platform. Free & Open Source Drata Alternative",
  title: "Bubba | The Open Source Compliance Platform",
  url: "/",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bubba.ai"),
  title: data.title,
  description: data.description,
  openGraph: {
    title: data.title,
    description: data.description,
    url: data.url,
    siteName: "Bubba",
    images: [
      {
        url: "/_static/meta-image.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.title,
    description: data.description,
    site: "https://www.bubba.ai",
    creator: "@bubba_ai",
    images: ["/_static/meta-image.png"],
  },
};

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  preload: true,
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex flex-col antialiased ${font.className} touch-none bg-white dark:bg-black`}
      >
        <SpeedInsights />
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          themes={["dark", "light"]}
          enableSystem={true}
        >
          <main>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
