"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  hermesAgents,
  tradingAgents,
  modelColors,
  agentIcons,
} from "@/data/hermes";
import type { Agent } from "@/data/hermes";

const modelDescriptions: Record<string, string> = {
  opus: "Strongest reasoning -- complex decisions, self-modification, design judgment",
  sonnet: "Balanced -- document updates, diagnostics, signal processing",
  haiku: "Fast and efficient -- read-only analysis, formatting, data pipelines",
};

function AgentCard({ agent, index }: { agent: Agent; index: number }) {
  const iconPath = agentIcons[agent.id];
  const badgeColor = modelColors[agent.model];

  return (
    <ScrollReveal delay={0.1 + index * 0.06}>
      <CardSpotlight
        className="h-full"
        spotlightColor={`${agent.color}12`}
      >
        <div className="p-5">
          {/* Header: Icon + Name + Model Badge */}
          <div className="mb-3 flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: `${agent.color}15`,
                  border: `1px solid ${agent.color}25`,
                }}
              >
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke={agent.color}
                >
                  {iconPath && <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />}
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  {agent.name}
                </h4>
                <p className="text-xs text-text-tertiary">{agent.role}</p>
              </div>
            </div>
            <span
              className="mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                color: badgeColor,
                background: `${badgeColor}15`,
                border: `1px solid ${badgeColor}25`,
              }}
            >
              {agent.model}
            </span>
          </div>

          {/* Description */}
          <p className="mb-3 text-xs leading-relaxed text-text-tertiary">
            {agent.description}
          </p>

          {/* Capability pills */}
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((cap) => (
              <span
                key={cap}
                className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-text-muted transition-colors hover:bg-white/[0.07] hover:text-text-tertiary"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </CardSpotlight>
    </ScrollReveal>
  );
}

export function AgentEcosystem() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          overline="Agent Ecosystem"
          title="12 Specialized Agents"
          subtitle="Two domains of specialized agents -- infrastructure operations and trading research -- each with purpose-built models matched to their cognitive demands."
        />

        {/* Tabbed agent grid */}
        <ScrollReveal delay={0.15} className="mt-10 sm:mt-14">
          <Tabs defaultValue="infrastructure">
            <TabsList
              className="mx-auto mb-8 w-fit rounded-lg border border-white/[0.06] bg-surface-0/60 p-1 backdrop-blur-sm"
            >
              <TabsTrigger
                value="infrastructure"
                className="rounded-md px-4 py-2 text-sm font-medium text-text-tertiary transition-all data-active:bg-brand-500/15 data-active:text-brand-400"
              >
                Infrastructure
                <span className="ml-1.5 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums text-text-muted">
                  {hermesAgents.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="trading"
                className="rounded-md px-4 py-2 text-sm font-medium text-text-tertiary transition-all data-active:bg-teal-500/15 data-active:text-teal-400"
              >
                Trading Research
                <span className="ml-1.5 rounded-full bg-white/[0.06] px-1.5 py-0.5 text-[10px] tabular-nums text-text-muted">
                  {tradingAgents.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="infrastructure">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {hermesAgents.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trading">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tradingAgents.map((agent, i) => (
                  <AgentCard key={agent.id} agent={agent} index={i} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollReveal>

        {/* Model legend */}
        <ScrollReveal delay={0.3} className="mt-10">
          <div className="mx-auto max-w-2xl rounded-xl border border-white/[0.06] bg-surface-0/40 p-5 backdrop-blur-sm">
            <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-widest text-text-muted">
              Model Assignments
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {(["opus", "sonnet", "haiku"] as const).map((model) => (
                <div key={model} className="flex items-start gap-2.5">
                  <div
                    className="mt-1 h-2 w-2 shrink-0 rounded-full"
                    style={{
                      background: modelColors[model],
                      boxShadow: `0 0 8px ${modelColors[model]}50`,
                    }}
                  />
                  <div>
                    <span
                      className="text-xs font-semibold capitalize"
                      style={{ color: modelColors[model] }}
                    >
                      {model}
                    </span>
                    <p className="mt-0.5 text-[10px] leading-snug text-text-muted">
                      {modelDescriptions[model]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
