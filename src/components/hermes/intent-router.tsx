import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientBadge } from "@/components/ui/gradient-badge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { capabilities, intentExamples } from "@/data/hermes";
import { harmonize, alpha } from "@/lib/tokens";

export function IntentRouter() {
  return (
    <Section
      id="intent-router"
      eyebrow="Intent routing"
      title="Say what you want"
      lede="Plain language maps to the right capability through a registry — no agent names, no tool invocation. Natural intent in, the correct capability out."
    >
      {/* Routing examples — plain intent resolves to a capability + method */}
      <Reveal direction="up">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
            intent → capability
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
            {intentExamples.length} examples
          </span>
        </div>
      </Reveal>

      <Stagger className="flex flex-col gap-3">
        {intentExamples.map((ex) => (
          <StaggerItem key={ex.input}>
            <GlassCard
              interactive
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
            >
              {/* User input, in quotes */}
              <p className="min-w-0 flex-1 font-mono text-sm leading-relaxed text-white">
                <span className="text-text-muted">&ldquo;</span>
                {ex.input}
                <span className="text-text-muted">&rdquo;</span>
              </p>

              {/* Resolution arrow */}
              <ArrowRight
                aria-hidden
                className="hidden h-4 w-4 shrink-0 text-brand-300 sm:block"
              />

              {/* Resolved capability + method */}
              <div className="flex min-w-0 shrink-0 flex-col items-start gap-1.5 sm:w-[44%] sm:items-end">
                <GradientBadge tone="primary">{ex.capability}</GradientBadge>
                <span className="font-mono text-[11px] leading-snug text-text-tertiary sm:text-right">
                  {ex.method}
                </span>
              </div>
            </GlassCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* The registry — every routable capability */}
      <Reveal direction="up" delay={0.05}>
        <div className="mb-4 mt-14 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
            capability registry
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-brand-300">
            {capabilities.length} routable
          </span>
        </div>
      </Reveal>

      <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.05}>
        {capabilities.map((cap) => {
          const accent = harmonize(cap.color);
          return (
            <StaggerItem key={cap.id}>
              <GlassCard interactive className="flex h-full flex-col gap-2.5 p-4">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: accent }}
                  />
                  <h3 className="text-base font-semibold text-white">{cap.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-text-tertiary">{cap.description}</p>
                <span
                  className="mt-auto inline-block self-start rounded-md border border-hairline px-2 py-1 font-mono text-[11px] leading-snug text-text-secondary"
                  style={{ background: alpha(accent, 0.06) }}
                >
                  {cap.trigger}
                </span>
              </GlassCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
