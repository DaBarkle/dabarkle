import { ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { guardrails, gates } from "@/data/hermes";
import { alpha, harmonize } from "@/lib/tokens";

export function SafetyGuardrails() {
  return (
    <Section
      id="safety"
      eyebrow="Safety"
      title="Confidence comes from constraints"
      lede="Risky operations are gated, credentials are unreachable, and every documentation update passes a three-gate validation before it lands."
    >
      {/* Guardrails grid */}
      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guardrails.map((g) => {
          const accent = harmonize(g.color);
          return (
            <StaggerItem key={g.id}>
              <GlassCard interactive className="flex h-full flex-col p-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-inset ring-hairline"
                  style={{ color: accent }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={g.icon} />
                  </svg>
                </span>

                <h3 className="mt-4 text-base font-semibold leading-snug text-white">
                  {g.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {g.description}
                </p>

                <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-hairline bg-white/[0.02] px-3 py-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                  <p className="font-mono text-[11px] leading-relaxed text-text-tertiary">
                    {g.detail}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      {/* 3-gate validation pipeline */}
      <Reveal direction="up" className="mt-16">
        <div className="mb-6 flex items-center gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
            3-gate validation
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
            every as-built update
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {gates.map((gate, i) => {
            const accent = harmonize(gate.color);
            return (
              <div key={gate.id} className="contents">
                <GlassCard tone="strong" className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-sm font-semibold"
                      style={{
                        color: accent,
                        backgroundColor: alpha(accent, 0.12),
                        boxShadow: `inset 0 0 0 1px ${alpha(accent, 0.35)}`,
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="flex flex-col">
                      <h3 className="text-base font-semibold leading-tight text-white">
                        {gate.shortName}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        {gate.name}
                      </span>
                    </div>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text-secondary">
                    {gate.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {gate.validates.map((v) => (
                      <li
                        key={v}
                        className="rounded-full border border-hairline bg-white/[0.025] px-2.5 py-1 font-mono text-[10px] text-text-tertiary"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* connector — desktop only, between gates */}
                {i < gates.length - 1 && (
                  <div aria-hidden="true" className="hidden items-center justify-center md:flex">
                    <ChevronRight className="h-5 w-5 text-text-muted" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
