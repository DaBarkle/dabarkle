import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { StatCard } from "@/components/ui/stat-card";
import { CountUp } from "@/components/ui/count-up";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { Reveal } from "@/components/ui/reveal";
import { systemMetrics, metrics, type SystemMetric } from "@/data/hermes";
import { harmonize, color } from "@/lib/tokens";

export function MetricsDashboard() {
  return (
    <Section
      id="metrics"
      eyebrow="By the numbers"
      title="A system at a glance"
      lede="Current figures from a platform that runs every day across a homelab, two networks, banking, voice and design."
      align="center"
    >
      {/* Hero highlight — one confident headline metric */}
      <Reveal direction="up">
        <GlassCard
          tone="strong"
          gradientBorder
          className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-6 py-9 text-center sm:flex-row sm:justify-center sm:gap-8 sm:px-10 sm:text-left"
        >
          <div className="flex flex-col items-center sm:items-start">
            <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
              Days live, in continuous use
            </span>
            <div className="mt-2 text-[3.25rem] font-semibold leading-none tracking-tight text-white sm:text-[4rem]">
              <CountUp value={metrics.daysRunning} suffix="+" />
            </div>
          </div>

          <span aria-hidden="true" className="hidden h-14 w-px bg-hairline sm:block" />

          <div className="flex flex-col items-center gap-2.5 sm:items-start">
            <GradientBadge tone="success">As-built {metrics.asbuiltVersion}</GradientBadge>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-text-secondary">
              One operator, one assistant — self-documenting, self-maintaining, and still
              shipping new capabilities every week.
            </p>
          </div>
        </GlassCard>
      </Reveal>

      {/* Metric grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {systemMetrics.map((m: SystemMetric, i: number) => {
          const accent = harmonize(m.color);
          return (
            <Reveal key={m.id} direction="up" delay={(i % 4) * 0.06}>
              <div className="relative h-full">
                {/* Thin top accent rail — the only data-colour surface, kept hairline-scale */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-5 top-0 z-10 h-px rounded-full opacity-70 sm:inset-x-6"
                  style={{ background: accent }}
                />
                <StatCard
                  value={m.value}
                  label={m.label}
                  caption={m.caption}
                  suffix={m.suffix}
                  accent={accent}
                  className="h-full"
                />
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal direction="up" delay={0.1}>
        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
          <span
            aria-hidden="true"
            className="mr-2 inline-block h-1.5 w-1.5 -translate-y-px rounded-full align-middle"
            style={{ background: color.primary }}
          />
          Figures reflect current system state — privacy-safe, no live infrastructure detail
        </p>
      </Reveal>
    </Section>
  );
}
