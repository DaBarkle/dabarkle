"use client";

import { Activity, Brain, Clock, GitBranch } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { stageSnapshot } from "@/data/hermes";

const META = [
  { Icon: Activity, label: "Heartbeat", value: `#${stageSnapshot.heartbeat}` },
  { Icon: GitBranch, label: "Self version", value: `v${stageSnapshot.selfVersion}` },
  { Icon: Clock, label: "Last reflect", value: stageSnapshot.lastReflect.split(" ")[1] },
  { Icon: Brain, label: "Last dream", value: stageSnapshot.lastDream.split(" ")[1] },
];

function scorePct(score: number) {
  return Math.min(100, Math.round((score / 10) * 100));
}

export function LiveSnapshot() {
  return (
    <Section
      id="live-snapshot"
      eyebrow="Situated state"
      title="See it thinking"
      lede="Instead of dumping raw context on load, Hermes maintains a live blackboard — ranked attention and a first-person inner monologue. This is a real snapshot of The Stage."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Attention candidates */}
        <Reveal direction="up">
          <GlassCard tone="strong" className="h-full overflow-hidden">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3">
              <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                attention · top {stageSnapshot.attentionTop.length}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-teal-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" />
                salience-gated
              </span>
            </div>
            <Stagger className="divide-y divide-hairline">
              {stageSnapshot.attentionTop.map((a) => (
                <StaggerItem key={a.id}>
                  <div className="px-5 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs text-brand-300">{a.source}</span>
                      <span className="font-mono text-sm font-semibold text-white">{a.score.toFixed(2)}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{a.snippet}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-brand-400"
                          style={{ width: `${scorePct(a.score)}%` }}
                        />
                      </div>
                      <span className="rounded-full border border-hairline px-2 py-0.5 font-mono text-[10px] text-text-tertiary">
                        {a.classification}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </GlassCard>
        </Reveal>

        {/* Inner monologue + meta */}
        <Reveal direction="up" delay={0.1}>
          <div className="flex h-full flex-col gap-6">
            <GlassCard tone="strong" gradientBorder className="flex-1 p-5">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-4 w-4 text-brand-300" />
                <span className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                  inner monologue
                </span>
              </div>
              <p className="text-sm italic leading-relaxed text-text-secondary">
                {stageSnapshot.innerMonologue}
                <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] animate-pulse bg-brand-400 align-middle" />
              </p>
            </GlassCard>

            <div className="grid grid-cols-2 gap-3">
              {META.map(({ Icon, label, value }) => (
                <GlassCard key={label} className="flex items-center gap-3 p-3.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                    <Icon className="h-4 w-4 text-brand-300" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</span>
                    <span className="font-mono text-sm font-medium text-white">{value}</span>
                  </span>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
