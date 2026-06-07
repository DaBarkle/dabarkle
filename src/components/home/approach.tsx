import { SectionHeader } from "@/components/ui/section-header";
import { ProcessTimeline, type ProcessStep } from "@/components/ui/process-timeline";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal } from "@/components/ui/reveal";

const STEPS: ProcessStep[] = [
  {
    id: "capture",
    label: "01 · Capture",
    title: "Everything becomes memory",
    meta: "L0 → L3",
    description:
      "Every response, tool call and decision is captured across five layers — from per-turn summaries to a real-time Qdrant vector store. Nothing is lost between sessions.",
  },
  {
    id: "situate",
    label: "02 · Situate",
    title: "The Stage assembles context",
    meta: "4 zones · 14 publishers",
    description:
      "A situated-state blackboard ranks what matters right now — identity, live situation, salience-gated attention, and a first-person inner monologue — instead of dumping raw context on load.",
  },
  {
    id: "route",
    label: "03 · Route",
    title: "Intent finds its capability",
    meta: "registry-driven",
    description:
      "Plain language maps to the right capability through a registry. No agent names, no tool invocation — say what you want and the system routes it.",
  },
  {
    id: "act",
    label: "04 · Act",
    title: "Agents execute behind guardrails",
    meta: "approval-gated",
    description:
      "Risky operations require explicit approval; credentials are structurally unreachable; every mutation is impact-analysed first. Confidence comes from constraints.",
  },
  {
    id: "learn",
    label: "05 · Learn",
    title: "The system tunes itself",
    meta: "optimizer + reflex",
    description:
      "Telemetry from every run feeds two separate self-improvement systems — one for the documentation pipeline, one for the substrate — each with hard guardrails and instant kill switches.",
  },
];

export function Approach() {
  return (
    <section id="approach" className="relative scroll-mt-24 px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeader
            eyebrow="Approach"
            title="The ambient loop"
            lede="Ambient intelligence isn't a feature — it's a cycle. Capture, situate, route, act, learn, repeat. The operator never thinks about the mechanics."
          />
          <Reveal direction="up" delay={0.1}>
            <GlassCard className="mt-8 p-6">
              <p className="font-mono text-overline text-brand-300">{"// principle"}</p>
              <p className="mt-3 text-pretty text-lg font-medium leading-snug text-white">
                “Ambient, not explicit. Intent, not invocation. Unified, not siloed. Proactive,
                not passive.”
              </p>
              <p className="mt-3 text-sm text-text-tertiary">The four principles Hermes is built on.</p>
            </GlassCard>
          </Reveal>
        </div>

        <ProcessTimeline steps={STEPS} className="pt-2" />
      </div>
    </section>
  );
}
