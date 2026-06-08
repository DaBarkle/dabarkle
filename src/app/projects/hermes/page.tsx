import type { Metadata } from "next";
import { HermesHero } from "@/components/hermes/hermes-hero";
import { LiveSnapshot } from "@/components/hermes/live-snapshot";
import { WhatItDoesBento } from "@/components/hermes/what-it-does-bento";
import { MetricsDashboard } from "@/components/hermes/metrics-dashboard";
import { TheStage } from "@/components/hermes/the-stage";
import { GuardianSentinel } from "@/components/hermes/guardian-sentinel";
import { AmbientMemory } from "@/components/hermes/ambient-memory";
import { IntentRouter } from "@/components/hermes/intent-router";
import { GenerativeUI } from "@/components/hermes/generative-ui";
import { MultiDomainReach } from "@/components/hermes/multi-domain-reach";
import { SelfImprovementTwoSystems } from "@/components/hermes/self-improvement-two-systems";
import { SafetyGuardrails } from "@/components/hermes/safety-guardrails";
import { BuiltWithAI } from "@/components/hermes/built-with-ai";
import { Footer } from "@/components/layout/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export const metadata: Metadata = {
  title: "Hermes — Ambient Intelligence Platform",
  description:
    "An ambient intelligence platform with situated state, structural credential security, generative UI, and reach across homelab, banking, network fleet, voice, and design. 15 agents, 22 MCP servers, 36 protected credentials, 5-level memory. Built with Claude Code.",
  openGraph: {
    title: "Hermes — Ambient Intelligence Platform",
    description:
      "An ambient intelligence platform with The Stage, Guardian + Sentinel, generative UI, and multi-domain reach. Built conversationally with Claude Code.",
    type: "article",
  },
};

export default function HermesPage() {
  return (
    <>
      <main id="main">
        {/* Recruiter layer */}
        <HermesHero />
        <LiveSnapshot />
        <SectionDivider variant="brand" />
        <WhatItDoesBento />
        <SectionDivider variant="accent" />
        <MetricsDashboard />
        <SectionDivider variant="mixed" />

        {/* Flagships */}
        <TheStage />
        <SectionDivider variant="brand" />
        <GuardianSentinel />
        <SectionDivider variant="accent" />

        {/* Architecture deep-dives */}
        <AmbientMemory />
        <SectionDivider variant="mixed" />
        <IntentRouter />
        <SectionDivider variant="brand" />

        {/* Flagships continued */}
        <GenerativeUI />
        <SectionDivider variant="accent" />
        <MultiDomainReach />
        <SectionDivider variant="mixed" />

        {/* Substrate + safety */}
        <SelfImprovementTwoSystems />
        <SectionDivider variant="accent" />
        <SafetyGuardrails />
        <SectionDivider variant="brand" />

        {/* Closer */}
        <BuiltWithAI />
      </main>
      <Footer />
    </>
  );
}
