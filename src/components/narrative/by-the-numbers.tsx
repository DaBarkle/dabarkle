import { Eyebrow } from "@/components/ui/eyebrow";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionBand } from "@/components/ui/section-band";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { heroNumbers, VERIFIED_AT } from "@/data/system";

/**
 * ByTheNumbers — the full-bleed Technical Mono band (BUILD-SPEC §2.8).
 * The five strongest verified figures as oversized mono tickers, each with
 * its label, a one-line note, and a PathChip receipt citing exactly where
 * the number was counted. The lead figure gets hero scale on its own row;
 * the remaining four sit in a 2×2 (lg: 4-up) receipt grid with hairline
 * rules. Every value comes from `system.ts → heroNumbers` — nothing here
 * is typed by hand.
 *
 * Server component: all motion lives in the imported client leaves
 * (SplitHeading, StatTicker, Reveal/Stagger).
 */
export function ByTheNumbers() {
  // heroNumbers is ordered strongest-first in the data layer.
  const [lead, ...rest] = heroNumbers;

  return (
    <SectionBand tone="mono" id="numbers" className="scroll-mt-24">
      <section className="relative py-24 sm:py-32">
        {/* Header row — heading left, verification stamp top-right */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <Eyebrow>By the numbers</Eyebrow>
            <SplitHeading as="h2" className="text-display-sm text-white">
              The whole thing, in numbers.
            </SplitHeading>
          </div>
          <Reveal direction="none" className="shrink-0 sm:pb-2">
            <p className="font-mono text-[11px] tracking-wide text-ink-faint">
              verified {VERIFIED_AT} · counts from disk, not marketing
            </p>
          </Reveal>
        </div>

        {/* Lead figure — full-width, hero scale */}
        <Reveal className="mt-16 border-t border-hairline pt-10 sm:mt-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <StatTicker
              value={lead.value}
              display={lead.display}
              className="font-mono text-[clamp(3.5rem,9vw,7.5rem)] leading-none font-medium tracking-tight text-brand-200"
            />
            <div className="flex max-w-md flex-col gap-2 lg:items-end lg:pb-2 lg:text-right">
              <p className="text-base font-medium text-ink">{lead.label}</p>
              {lead.note && <p className="text-[13px] leading-relaxed text-ink-subtle">{lead.note}</p>}
              <PathChip path={lead.source} className="mt-2" />
            </div>
          </div>
        </Reveal>

        {/* Remaining four — 2×2, opening to 4-up at lg */}
        <Stagger className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4" gap={0.09}>
          {rest.map((stat) => (
            <StaggerItem key={stat.label} className="flex flex-col border-t border-hairline pt-6">
              <StatTicker
                value={stat.value}
                display={stat.display}
                className="font-mono text-[clamp(2.5rem,7vw,6rem)] leading-none font-medium tracking-tight text-brand-200 lg:text-[3.25rem]"
              />
              <p className="mt-4 text-sm leading-snug font-medium text-ink">{stat.label}</p>
              {stat.note && <p className="mt-2 text-[13px] leading-relaxed text-ink-subtle">{stat.note}</p>}
              <div className="mt-4 flex max-w-full">
                <PathChip path={stat.source} />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </SectionBand>
  );
}
