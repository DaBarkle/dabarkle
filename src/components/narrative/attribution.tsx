import { GlassCard } from "@/components/ui/glass-card";
import { SplitHeading } from "@/components/ui/split-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { attribution } from "@/data/narrative";

/**
 * Attribution — the honesty section. Two cards render the platform/engineering
 * boundary verbatim from narrative.ts → attribution (never ad-libbed, per
 * BUILD-SPEC §0): the platform card deliberately quieter (subtle glass, ink
 * text, dash markers), the Hermes card carrying the only lavender accent.
 * Server component — motion lives in the imported leaves.
 */
export function Attribution() {
  const { platform, hermes, footline } = attribution;

  return (
    <section id="attribution" className="relative scroll-mt-24 px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <Eyebrow>Attribution</Eyebrow>
          <SplitHeading as="h2" className="mt-4 text-h1 text-balance text-white">
            An honest line: the platform vs. what I built.
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-body-lg text-pretty text-ink-muted">
              Hermes is built on Claude Code. Knowing exactly where the platform ends and the
              engineering begins is the point.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 sm:mt-14" gap={0.12}>
          {/* ---- Platform card (quieter on purpose) ----------------------- */}
          <StaggerItem>
            <GlassCard tone="subtle" className="h-full p-7 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-ink-faint uppercase">
                The platform
              </p>
              <h3 className="mt-3 text-h3 text-ink-muted">{platform.title}</h3>
              <p className="mt-2 text-sm text-ink-subtle">{platform.intro}</p>
              <ul className="mt-5 space-y-2.5">
                {platform.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-subtle">
                    <span aria-hidden="true" className="font-mono text-ink-faint">
                      –
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>

          {/* ---- Hermes card (lavender gradient-hairline accent) ----------- */}
          <StaggerItem>
            <GlassCard gradientBorder className="h-full p-7 sm:p-8">
              <p className="font-mono text-[11px] tracking-[0.16em] text-brand-300 uppercase">
                The engineering
              </p>
              <h3 className="mt-3 text-h3 text-white">{hermes.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{hermes.intro}</p>
              <ul className="mt-5 space-y-2.5">
                {hermes.items.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brand-400"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-3xl text-center font-mono text-[13px] leading-relaxed text-ink-subtle">
            {footline}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
