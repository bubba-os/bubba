import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "@/styles/globals.css";
import "@bubba-beta/ui/globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bubba AI, Inc.",
  description: "Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
  icons: {
    icon: "/android-chrome-192x192.png",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable}`,
          "whitespace-pre-line overscroll-none antialiased",
        )}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
