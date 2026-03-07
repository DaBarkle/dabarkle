import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Geist } from "next/font/google";
import { Nav } from "@/components/layout/nav";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { AmbientLayer } from "@/components/layout/ambient-layer";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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

export const metadata: Metadata = {
  title: {
    default: "DaBarkle — Systems Architect & Infrastructure Engineer",
    template: "%s | DaBarkle",
  },
  description:
    "Building intelligent systems that evolve themselves. Portfolio of DaBarkle — systems architecture, AI orchestration, and infrastructure automation.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <a
          href="#main"
          className="absolute left-[-9999px] top-auto w-[1px] h-[1px] overflow-hidden focus:fixed focus:top-4 focus:left-4 focus:w-auto focus:h-auto focus:p-2 focus:px-4 focus:bg-surface-1 focus:text-white focus:rounded-lg focus:z-[9999] focus:text-sm focus:font-medium focus:outline-2 focus:outline-accent-500"
        >
          Skip to content
        </a>
        <Nav />
        <MobileMenu />
        <AmbientLayer />
        {children}
      </body>
    </html>
  );
}
