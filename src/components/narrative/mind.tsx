"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { dreamExcerpt, salienceClasses, selfModelQuotes, stage } from "@/data/mind";
import { Eyebrow } from "@/components/ui/eyebrow";
import { JargonChip } from "@/components/ui/jargon";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionBand } from "@/components/ui/section-band";
import { SplitHeading } from "@/components/ui/split-heading";
import { StatTicker } from "@/components/ui/stat-ticker";
import { easings, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

/* ============================================================================
   MIND — "It thinks between turns."
   The soul section. The Stage rendered as one instrument (a 4-zone blackboard
   with proportional char-budget bars), the five salience classes draining at
   their relative rates, then the two artifacts that speak for themselves:
   the machine-maintained self-model and the nightly dream journal.
   Every figure and every quote comes from src/data/mind.ts (privacy-vetted
   2026-06-12). Deep band, slower rhythm, no marketing language — the
   artifacts carry the section.
   ========================================================================== */

/**
 * Opaque panel shell. This section sits on SectionBand's near-black `deep`
 * background, where backdrop blur buys nothing — a solid fake keeps the page
 * under its blur budget (BUILD-SPEC §0) while reading identically to glass.
 */
const PANEL =
  "rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] shadow-[var(--edge-highlight)]";

/* ---- Salience pacing -------------------------------------------------------
   Presentation constants, not facts. The routine class (smallest tau) drains
   in ~8s and every other class scales by its real tau ratio, capped so the
   slowest bar is still a bar and not a wall. An 8s full drain ≈ 3·tau for
   routine compressed ~600× — which is exactly what the caption admits. */
const ROUTINE_LOOP_SECONDS = 8;
const LOOP_CAP_SECONDS = 240;
/** Fast-start, long-tail easing — reads as exponential decay. */
const DECAY_EASE = "cubic-bezier(0.16, 0.84, 0.44, 1)";

const MIN_TAU = Math.min(...salienceClasses.map((c) => c.tau));
const MAX_ZONE_BUDGET = Math.max(...stage.zones.map((z) => z.budget));

function loopSeconds(tau: number): number {
  return Math.min((tau / MIN_TAU) * ROUTINE_LOOP_SECONDS, LOOP_CAP_SECONDS);
}

/**
 * mind.ts source strings read "path · context" (self-model) or "path — context"
 * (dream journal). Split at the first separator so PathChip gets clean
 * path/note slots without altering the vetted text.
 */
function splitSource(source: string): { path: string; note?: string } {
  const i = source.search(/ [·—] /);
  return i === -1 ? { path: source } : { path: source.slice(0, i), note: source.slice(i + 3) };
}

type SalienceClass = (typeof salienceClasses)[number];

/* ---- Zone budget bar ------------------------------------------------------ */

/**
 * Proportional char-budget bar for one Stage zone — width is the zone's share
 * of the largest budget; the fill grows in once, left-anchored, transform
 * only. Reduced motion renders the final width statically.
 */
function ZoneBar({ pct, delay }: { pct: number; delay: number }) {
  const reduced = useReducedMotion();
  const fill = "h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400";
  return (
    <div aria-hidden="true" className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
      {reduced ? (
        <div className={fill} style={{ width: `${pct}%` }} />
      ) : (
        <motion.div
          className={cn(fill, "origin-left")}
          style={{ width: `${pct}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay, ease: easings.entrance }}
        />
      )}
    </div>
  );
}

/* ---- Salience decay cell --------------------------------------------------- */

/**
 * One decay class: name, real half-life label, and a fill that drains on an
 * infinite loop at the class's relative rate (keyframes: `salience-drain` in
 * globals.css). Paused while off-screen; reduced motion shows a static
 * half-drained bar instead of animating.
 */
function SalienceCell({
  cls,
  paused,
  reduced,
}: {
  cls: SalienceClass;
  paused: boolean;
  reduced: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-mono text-xs text-ink">{cls.name}</span>
        <span className="font-mono text-[11px] text-ink-faint tabular-nums">{cls.human}</span>
      </div>
      <div aria-hidden="true" className="mt-2.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
        <div
          className="h-full w-full origin-left rounded-full bg-brand-400/70"
          style={
            reduced
              ? { transform: "scaleX(0.5)" }
              : {
                  animation: `salience-drain ${loopSeconds(cls.tau)}s ${DECAY_EASE} infinite`,
                  animationPlayState: paused ? "paused" : "running",
                }
          }
        />
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-ink-subtle">{cls.desc}</p>
    </div>
  );
}

/* ---- Section ---------------------------------------------------------------- */

export function MindSection() {
  const reduced = useReducedMotion();
  const salienceRef = useRef<HTMLDivElement>(null);
  // Deliberately not `once` — the drain loops pause whenever the panel
  // scrolls off-screen, so five infinite animations never run unseen.
  const salienceInView = useInView(salienceRef, { amount: 0.25 });
  const dreamSrc = splitSource(dreamExcerpt.source);

  return (
    <SectionBand tone="deep" id="mind" className="scroll-mt-24">
      <section className="py-28 sm:py-36">
        {/* ---- Header: heartbeat + The Stage in one breath ---- */}
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>The mind layer</Eyebrow>
          </Reveal>
          <SplitHeading as="h2" className="text-display-sm mt-5 text-white">
            It thinks between turns.
          </SplitHeading>
          <Reveal delay={0.12}>
            <p className="text-body-lg mt-6 max-w-2xl text-pretty text-ink-muted">
              Between prompts, a language model is nothing — no process, no state, no thread of
              attention. Hermes keeps a pulse instead: every {stage.heartbeatSeconds} seconds a
              heartbeat regenerates The Stage, a four-zone{" "}
              <JargonChip term="blackboard">blackboard</JargonChip> of working memory it maintains
              whether or not anyone is talking to it —{" "}
              <span className="font-mono text-brand-300 whitespace-nowrap">
                <StatTicker
                  value={stage.heartbeatCycles}
                  display={stage.heartbeatCycles.toLocaleString("en-US")}
                />{" "}
                cycles
              </span>{" "}
              so far.
            </p>
          </Reveal>
        </div>

        {/* ---- The Stage: one instrument, not a card grid ---- */}
        <Reveal className="mt-16" duration={0.8}>
          <div className={PANEL}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                {/* heartbeat tick — decoration only */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 rounded-full bg-brand-400",
                    !reduced && "animate-[glow-pulse_3s_ease-in-out_infinite]",
                  )}
                />
                <span className="font-mono text-xs tracking-[0.14em] text-brand-300 uppercase">
                  The Stage
                </span>
                <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">
                  {stage.zones.length} zones ·{" "}
                  {stage.charBudgetTotal.toLocaleString("en-US")}-char budget
                </span>
              </div>
              <PathChip
                path=".claude/mind/stage.md"
                note={`regenerated every ${stage.heartbeatSeconds}s`}
              />
            </div>

            <div className="divide-y divide-hairline">
              {stage.zones.map((zone, i) => (
                <div
                  key={zone.name}
                  className="grid items-start gap-x-8 gap-y-2.5 px-6 py-5 sm:grid-cols-[160px_1fr] sm:px-8 sm:py-6"
                >
                  <div className="flex items-baseline justify-between gap-3 sm:block">
                    <span className="font-mono text-[13px] text-ink">{zone.name}</span>
                    <span className="font-mono text-[11px] text-ink-faint tabular-nums sm:mt-1 sm:block">
                      {zone.budget.toLocaleString("en-US")} chars
                    </span>
                  </div>
                  <div>
                    <ZoneBar pct={(zone.budget / MAX_ZONE_BUDGET) * 100} delay={i * 0.09} />
                    <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{zone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ---- Attention decay: five classes, relative drain rates ---- */}
        <Reveal className="mt-5" duration={0.8} delay={0.08}>
          <div ref={salienceRef} className={PANEL}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-6 py-4 sm:px-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tracking-[0.14em] text-brand-300 uppercase">
                  Attention decay
                </span>
                <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">
                  {salienceClasses.length}{" "}
                  <JargonChip term="salience">salience</JargonChip> classes · per-class half-lives
                </span>
              </div>
              <PathChip path=".claude/hooks/lib/stage-salience.py" />
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 px-6 py-6 sm:grid-cols-3 sm:px-8 lg:grid-cols-5">
              {salienceClasses.map((cls) => (
                <SalienceCell
                  key={cls.name}
                  cls={cls}
                  paused={!salienceInView}
                  reduced={!!reduced}
                />
              ))}
            </div>
            {/* The legend admits the compression — BUILD-SPEC §2.5. */}
            <p className="border-t border-hairline px-6 py-3 font-mono text-[11px] text-ink-faint sm:px-8">
              decay shown ×600 — credential events actually hold attention for ~a day
            </p>
          </div>
        </Reveal>

        {/* ---- Closer: the artifacts speak for themselves ---- */}
        <div className="mt-16 grid gap-5 lg:grid-cols-12">
          {/* Self-model — quote stack */}
          <Reveal className="lg:col-span-5" duration={0.8}>
            <div className={cn(PANEL, "flex h-full flex-col px-6 py-7 sm:px-8 sm:py-8")}>
              <span className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
                Self-model
              </span>
              <h3 className="text-h3 mt-3 text-white">
                v{stage.selfModelVersion} of a machine-maintained identity.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Regenerated daily; {stage.selfModelVersion - 1} earlier versions archived. Three
                lines from the current file:
              </p>
              <Stagger className="mt-7 flex flex-1 flex-col gap-7" gap={0.12}>
                {selfModelQuotes.map((q) => {
                  const src = splitSource(q.source);
                  return (
                    <StaggerItem key={q.quote}>
                      <figure className="border-l-2 border-brand-500/35 pl-4 sm:pl-5">
                        <blockquote className="text-[15px] leading-relaxed text-ink">
                          {`“${q.quote}”`}
                        </blockquote>
                        <figcaption className="mt-2.5">
                          <p className="text-[13px] leading-relaxed text-ink-subtle">{q.context}</p>
                          <PathChip className="mt-2.5" path={src.path} note={src.note} />
                        </figcaption>
                      </figure>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>
          </Reveal>

          {/* Dream journal — the vetted excerpt as a pull quote */}
          <Reveal className="lg:col-span-7" duration={0.8} delay={0.1}>
            <div className={cn(PANEL, "flex h-full flex-col px-6 py-7 sm:px-8 sm:py-8")}>
              <span className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
                Dream journal
              </span>
              <h3 className="text-h3 mt-3 text-white">Nightly, it writes about its day.</h3>
              <blockquote className="mt-7 flex-1 space-y-5 border-l-2 border-brand-500/35 pl-5 sm:pl-7">
                {dreamExcerpt.lines.map((line) => (
                  <p
                    key={line.slice(0, 24)}
                    className="text-[16px] leading-[1.85] text-ink-muted italic sm:text-[17px]"
                  >
                    {line}
                  </p>
                ))}
              </blockquote>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-hairline pt-5">
                <span className="font-mono text-[11px] text-ink-faint tabular-nums">
                  {dreamExcerpt.date}
                </span>
                {/* Note dropped from the chip: the h3 already says it, and the
                    chip's nowrap note would overflow small screens. */}
                <PathChip path={dreamSrc.path} />
                <span className="font-mono text-[11px] text-ink-faint tabular-nums">
                  {stage.dreamEntries} entries
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SectionBand>
  );
}
