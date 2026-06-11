import Link from "next/link";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { GridOverlay } from "@/components/visuals/grid-overlay";
import { substrate, VERIFIED_AT } from "@/data/system";

// source: src/data/system.ts → substrate.lifecycleEventsUsed comment — "of 9 Claude Code hook events"
const LIFECYCLE_EVENTS_TOTAL = 9;

/** The quiet substrate strip — every figure from system.ts, formatted once. */
const STRIP = [
  { value: substrate.hookScripts.toLocaleString("en-US"), label: "hook scripts" },
  { value: substrate.hookLines.toLocaleString("en-US"), label: "lines" },
  {
    value: `${substrate.lifecycleEventsUsed}/${LIFECYCLE_EVENTS_TOTAL}`,
    label: "lifecycle events",
  },
  { value: substrate.systemdUnitFiles.toLocaleString("en-US"), label: "systemd units" },
] as const;

/**
 * DeepHero — compact header for /projects/hermes. Deliberately NOT a
 * min-h-screen hero: the narrative homepage already made the case; this page
 * is the engineering record, so the header is bottom-anchored at ~60vh with
 * the existing aurora + grid at low intensity. Server component — motion
 * lives in the imported leaves (SplitHeading, Reveal), each reduced-motion
 * gated internally.
 */
export function DeepHero() {
  return (
    <header className="relative overflow-hidden border-b border-hairline">
      <AuroraBackground intensity="soft" />
      <GridOverlay variant="grid" size={56} opacity={0.35} fade="top" />
      {/* settle the aurora into the canvas before content begins */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas"
      />

      <div className="relative mx-auto flex min-h-[60vh] max-w-6xl flex-col justify-end px-6 pb-14 pt-32">
        <Reveal direction="none" duration={0.5}>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 font-mono text-[13px] text-ink-subtle transition-colors hover:text-white"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-[var(--ease-micro)] group-hover:-translate-x-0.5"
            >
              ←
            </span>
            the story
          </Link>
        </Reveal>

        <Eyebrow className="mt-8">
          the deep dive · every number verified {VERIFIED_AT}
        </Eyebrow>

        <SplitHeading as="h1" className="text-display-sm mt-4 max-w-3xl text-white">
          Hermes, all the way down.
        </SplitHeading>

        <Reveal delay={0.25} className="mt-6 max-w-2xl">
          <p className="text-body-lg text-pretty text-text-secondary">
            The homepage tells the story; this page is the engineering record. The
            same system, subsystem by subsystem, with receipts — file paths, line
            counts, and measured latencies, verified against the live system.
          </p>
        </Reveal>

        <Reveal delay={0.4} className="mt-10">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-mono text-[13px] text-ink-subtle">
            {STRIP.map((stat, i) => (
              <span key={stat.label} className="inline-flex items-baseline gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-ink-faint">
                    ·
                  </span>
                )}
                <span className="whitespace-nowrap">
                  <span className="tabular-nums text-ink">{stat.value}</span>{" "}
                  {stat.label}
                </span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  );
}
