import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { GlowButton } from "@/components/ui/glow-button";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { builtWithAiCallouts, metrics } from "@/data/hermes";
import { harmonize, alpha } from "@/lib/tokens";

/**
 * BuiltWithAI — the closer. A confident finale: three paired-design statements
 * stacked as elegant slim glass lines, a strong closing line, and a CTA pair.
 * Server component — all motion is delegated to Reveal/Stagger primitives.
 */
export function BuiltWithAI() {
  return (
    <Section
      id="built-with-ai"
      align="center"
      eyebrow="Built with Claude Code"
      title="Designed in conversation"
      lede="Every architectural decision was paired-designed with Claude — capabilities are conversational, and the safety guarantees were built in from the start."
      className="relative overflow-hidden"
      max="5xl"
    >
      <AuroraBackground intensity="medium" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="relative z-10">
        {/* The three paired-design statements */}
        <Stagger className="mx-auto flex max-w-3xl flex-col gap-4">
          {builtWithAiCallouts.map((callout, i) => {
            const accent = harmonize(callout.color);
            return (
              <StaggerItem key={i}>
                <GlassCard className="flex items-start gap-4 p-5 text-left sm:p-6">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: accent,
                      boxShadow: `0 0 0 4px ${alpha(accent, 0.12)}`,
                    }}
                  />
                  <p className="text-pretty text-body-lg leading-relaxed text-text-secondary">
                    {callout.text}
                  </p>
                </GlassCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Closing line */}
        <Reveal direction="up" delay={0.1}>
          <p className="mx-auto mt-12 max-w-2xl text-balance text-center text-2xl font-semibold leading-snug text-white sm:text-3xl">
            One operator, one conversation —{" "}
            <span className="text-gradient">a system that keeps designing itself.</span>
          </p>
        </Reveal>

        {/* CTA pair */}
        <Reveal direction="up" delay={0.15}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton href="/#contact" size="lg" withArrow>
              Get in touch
            </GlowButton>
            <GlowButton href="/#work" variant="secondary" size="lg">
              Back to work
            </GlowButton>
          </div>
        </Reveal>

        {/* Mono footer line */}
        <Reveal direction="up" delay={0.2}>
          <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
            As-built {metrics.asbuiltVersion} · {metrics.daysRunning} days live
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
