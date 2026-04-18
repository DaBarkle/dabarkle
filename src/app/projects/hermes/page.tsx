import type { Metadata } from "next";
import { HermesHero } from "@/components/hermes/hermes-hero";
import { WhyHermes } from "@/components/hermes/why-hermes";
import { AmbientVision } from "@/components/hermes/ambient-vision";
import { IntentRouter } from "@/components/hermes/intent-router";
import { AgentEcosystem } from "@/components/hermes/agent-ecosystem";
import { SessionCloseoutWalkthrough } from "@/components/hermes/session-closeout-walkthrough";
import { AmbientMemory } from "@/components/hermes/ambient-memory";
import { TrustSecurity } from "@/components/hermes/trust-security";
import { SelfOptimization } from "@/components/hermes/self-optimization";
import { SafetyGuardrails } from "@/components/hermes/safety-guardrails";
import { MetricsDashboard } from "@/components/hermes/metrics-dashboard";
import { ClaudeVsHermes } from "@/components/hermes/claude-vs-hermes";
import { BuiltWithAI } from "@/components/hermes/built-with-ai";
import { Footer } from "@/components/layout/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export const metadata: Metadata = {
  title: "Hermes -- Ambient Intelligence Platform",
  description:
    "A unified platform that continuously learns, routes intent naturally, and acts proactively. 12 agents, 9 capabilities, 5-level memory. Built with Claude Code.",
  openGraph: {
    title: "Hermes -- Ambient Intelligence Platform",
    description:
      "An ambient intelligence system with intent-based routing, 5-level memory, and self-optimization. Built with Claude.",
    type: "article",
  },
};

export default function HermesPage() {
  return (
    <>
      <main id="main">
        <HermesHero />
        <WhyHermes />
        <SectionDivider variant="brand" />
        <AmbientVision />
        <SectionDivider variant="accent" />
        <IntentRouter />
        <SectionDivider variant="mixed" />
        <AgentEcosystem />
        <SectionDivider variant="accent" />
        <SessionCloseoutWalkthrough />
        <SectionDivider variant="brand" />
        <AmbientMemory />
        <SectionDivider variant="mixed" />
        <TrustSecurity />
        <SectionDivider variant="accent" />
        <SelfOptimization />
        <SectionDivider variant="mixed" />
        <SafetyGuardrails />
        <SectionDivider variant="accent" />
        <MetricsDashboard />
        <SectionDivider variant="accent" />
        <ClaudeVsHermes />
        <SectionDivider variant="brand" />
        <BuiltWithAI />
      </main>
      <Footer />
    </>
  );
}
