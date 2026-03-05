import type { Metadata } from "next";
import { HermesHero } from "@/components/hermes/hermes-hero";
import { TheChallenge } from "@/components/hermes/the-challenge";
import { TheSystem } from "@/components/hermes/the-system";
import { IntelligenceLayer } from "@/components/hermes/intelligence-layer";
import { SelfImprovement } from "@/components/hermes/self-improvement";
import { LivingMemory } from "@/components/hermes/living-memory";
import { MetricsDashboard } from "@/components/hermes/metrics-dashboard";
import { BuiltWithAI } from "@/components/hermes/built-with-ai";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Hermes — AI-Powered Infrastructure Command Center",
  description:
    "A self-improving multi-agent system that operates, troubleshoots, and documents a production homelab with zero data loss. Built with Claude Code.",
  openGraph: {
    title: "Hermes — AI-Powered Infrastructure Command Center",
    description:
      "A self-improving multi-agent orchestration system with tiered routing, 3-gate validation, and living memory. Built with Claude.",
    type: "article",
  },
};

export default function HermesPage() {
  return (
    <>
      <main id="main">
        <HermesHero />
        <TheChallenge />
        <TheSystem />
        <IntelligenceLayer />
        <SelfImprovement />
        <LivingMemory />
        <MetricsDashboard />
        <BuiltWithAI />
      </main>
      <Footer />
    </>
  );
}
