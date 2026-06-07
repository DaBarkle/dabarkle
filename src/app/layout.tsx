import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { FloatingNav } from "@/components/layout/floating-nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AmbientLayer } from "@/components/layout/ambient-layer";
import { SiteBackground } from "@/components/visuals/site-background";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://dabarkle.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DaBarkle — AI Harness Builder",
    template: "%s · DaBarkle",
  },
  description:
    "I build the scaffolding around AI — memory, routing, guardrails, interfaces. Portfolio of David Barker (DaBarkle), builder and operator of Hermes, an ambient intelligence platform.",
  keywords: [
    "AI harness",
    "ambient intelligence",
    "Hermes",
    "Claude Code",
    "agent orchestration",
    "homelab",
    "MCP",
    "David Barker",
    "DaBarkle",
  ],
  authors: [{ name: "David Barker", url: SITE_URL }],
  creator: "David Barker",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "DaBarkle",
    title: "DaBarkle — AI Harness Builder",
    description:
      "Not just a user of AI — an operator of it. Builder of Hermes, an ambient intelligence platform: 15 agents, 22 MCP servers, structural credential security, 5-level memory.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DaBarkle — AI Harness Builder",
    description:
      "Builder and operator of Hermes, an ambient intelligence platform. Memory, routing, guardrails, generative UI.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='88' fill='%235e6ad2'>✦</text></svg>",
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-2 focus:outline-primary"
        >
          Skip to content
        </a>
        <TooltipProvider>
          {/* Global layered ambient base (behind all content) */}
          <SiteBackground />
          <FloatingNav />
          <MobileMenu />
          {/* Cursor-reactive spotlight + grain (desktop, motion-safe) */}
          <AmbientLayer />
          <div className="relative z-10">{children}</div>
        </TooltipProvider>
      </body>
    </html>
  );
}
