import { Check, Power, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { Reveal } from "@/components/ui/reveal";
import { selfImprovementSystems, type SelfImprovementSystem } from "@/data/hermes";
import { alpha, harmonize } from "@/lib/tokens";

type Tone = "primary" | "neutral" | "success" | "warning";

/** A substrate-level autotuner reads as a "warning"-toned (gold) chip; a
 *  capability component reads as primary lavender. Single accent either way. */
function toneFor(system: SelfImprovementSystem): Tone {
  return system.classification.toLowerCase().includes("substrate") ? "warning" : "primary";
}

const ROW_KEYS: { key: keyof SelfImprovementSystem; label: string }[] = [
  { key: "scope", label: "Scope" },
  { key: "trigger", label: "Trigger" },
  { key: "observes", label: "Observes" },
  { key: "actsOn", label: "Acts on" },
];

function SystemCard({ system }: { system: SelfImprovementSystem }) {
  const accent = harmonize(system.color);

  return (
    <GlassCard tone="strong" className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 8px ${alpha(accent, 0.6)}` }}
          />
          <h3 className="font-mono text-sm font-medium text-white">{system.label}</h3>
        </div>
        <GradientBadge tone={toneFor(system)}>{system.classification}</GradientBadge>
      </div>

      {/* Labelled rows */}
      <dl className="divide-y divide-hairline border-b border-hairline">
        {ROW_KEYS.map(({ key, label }) => (
          <div key={key} className="px-5 py-3.5 sm:px-6">
            <dt className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
              {label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-text-secondary">
              {system[key] as string}
            </dd>
          </div>
        ))}
      </dl>

      {/* Guardrails */}
      <div className="px-5 py-4 sm:px-6">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-300" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            Guardrails
          </span>
        </div>
        <ul className="space-y-2.5">
          {system.guardrails.map((g) => (
            <li key={g} className="flex items-start gap-2.5">
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0"
                style={{ color: accent }}
                aria-hidden
              />
              <span className="text-sm leading-relaxed text-text-secondary">{g}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Stats + kill switch — pinned to base so the two columns stay parallel */}
      <div className="mt-auto border-t border-hairline px-5 py-4 sm:px-6">
        <ul className="flex flex-wrap gap-2">
          {system.stats.map((s) => (
            <li
              key={s.label}
              className="inline-flex items-baseline gap-1.5 rounded-full border border-hairline bg-white/[0.03] px-3 py-1"
            >
              <span className="font-mono text-xs font-semibold text-white">{s.value}</span>
              <span className="text-[11px] text-text-tertiary">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            <Power className="h-3 w-3" aria-hidden />
            Kill switch
          </span>
          <code className="w-fit rounded border border-hairline bg-black/30 px-2 py-1 font-mono text-[11px] text-brand-200">
            {system.killSwitch}
          </code>
        </div>
      </div>
    </GlassCard>
  );
}

export function SelfImprovementTwoSystems() {
  return (
    <Section
      id="self-improvement"
      eyebrow="Self-improvement"
      title="Two systems, never conflated"
      lede="Hermes improves itself through two architecturally separate systems — one tunes the documentation pipeline, the other observes the substrate. They never touch each other's domain."
    >
      <div className="relative grid gap-6 md:grid-cols-2">
        {/* Center "vs" separator — desktop only, marks the boundary between domains */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-6 left-1/2 hidden -translate-x-1/2 md:flex md:flex-col md:items-center"
        >
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-hairline-strong to-transparent" />
          <span className="my-2 flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-surface-1/80 font-mono text-[10px] uppercase tracking-widest text-text-muted backdrop-blur-sm">
            vs
          </span>
          <div className="w-px flex-1 bg-gradient-to-b from-transparent via-hairline-strong to-transparent" />
        </div>

        {selfImprovementSystems.map((system, i) => (
          <Reveal key={system.id} direction="up" delay={i * 0.1}>
            <SystemCard system={system} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
