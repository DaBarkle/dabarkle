"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { lifeOfAPrompt, type PromptBeat } from "@/data/narrative";
import { PromptSchematic } from "@/components/narrative/prompt-schematic";
import { Eyebrow } from "@/components/ui/eyebrow";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * LifeOfAPrompt — the signature pinned scrollytelling chapter (BUILD-SPEC
 * §2.4). A `h-[500vh]` scroll container pins a full-screen panel: the living
 * schematic on the left (~55%), the beat copy rail on the right (~45%). The
 * scrub decides WHICH of the 7 beats is active — a motion-value event maps
 * scroll progress to a beat index that changes exactly 7 times (no setState
 * per frame); each activation then plays discretely inside the schematic.
 * A thin progress spine on the far left is the only scroll-scrubbed visual
 * (transform-only `scaleY`).
 *
 * Mobile (<lg) and reduced-motion get NO pinning: the full schematic once,
 * static, then the 7 beats as a stepped vertical list. CSS breakpoints only —
 * no UA sniffing.
 *
 * All copy/numbers render verbatim from `data/narrative.ts → lifeOfAPrompt`.
 */

const BEAT_COUNT = lifeOfAPrompt.length;
const TOTAL_LABEL = String(BEAT_COUNT).padStart(2, "0");

// source: BUILD-SPEC §2.4 — the section lede, verbatim from the spec.
const LEDE = "Scroll — this is what happens in the half-second before the model answers.";

export function LifeOfAPrompt() {
  const reduced = useReducedMotion();

  // Scroll plumbing for the pinned chapter. The hooks run unconditionally
  // (rules of hooks); when the pinned container isn't rendered the target
  // ref is simply never attached and none of this drives anything.
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // progress → beat index. setState fires only when the index actually
  // changes (7 times across the whole chapter), never per scroll frame.
  const [activeBeat, setActiveBeat] = useState(0);
  const beatRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Below lg the pinned container is display:none and its scroll range is
    // degenerate — bail on anything non-finite rather than index with NaN.
    if (reduced || !Number.isFinite(v)) return;
    const next = Math.min(BEAT_COUNT - 1, Math.max(0, Math.floor(v * BEAT_COUNT)));
    if (next !== beatRef.current) {
      beatRef.current = next;
      setActiveBeat(next);
    }
  });

  // The progress spine — the one continuously scrubbed element (scaleY only).
  const spineScale = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.6 });

  const beat = lifeOfAPrompt[activeBeat];

  return (
    <section id="life-of-a-prompt" className="relative scroll-mt-24">
      {/* ---- Section intro ------------------------------------------------ */}
      <div className="px-6 pt-24 sm:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 pb-10">
          <Reveal>
            <Eyebrow>Anatomy of a turn</Eyebrow>
          </Reveal>
          <SplitHeading as="h2" className="text-display-sm max-w-3xl text-white">
            Life of a prompt
          </SplitHeading>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-xl text-pretty text-ink-muted">{LEDE}</p>
          </Reveal>
        </div>
      </div>

      {reduced ? (
        /* Reduced motion: stepped list at every breakpoint, fully static. */
        <SteppedBeats />
      ) : (
        <>
          {/* ---- Desktop: pinned scrollytelling --------------------------- */}
          <div ref={containerRef} className="relative hidden h-[500vh] lg:block">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
              <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,11fr)_minmax(0,9fr)] items-center gap-10 px-6 xl:gap-16">
                {/* Schematic + progress spine */}
                <div className="relative flex items-center justify-center pl-10">
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-0 h-[70%] w-px -translate-y-1/2 bg-white/[0.08]"
                  >
                    <motion.div
                      className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-brand-300 via-brand-400 to-brand-600"
                      style={{ scaleY: spineScale }}
                    />
                    {lifeOfAPrompt.map((b, i) => (
                      <span
                        key={b.k}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ top: `${((i + 0.5) / BEAT_COUNT) * 100}%` }}
                      >
                        <span
                          className={cn(
                            "block h-1.5 w-1.5 rounded-full transition-colors duration-300",
                            i <= activeBeat ? "bg-brand-400" : "bg-white/15",
                          )}
                        />
                      </span>
                    ))}
                  </div>
                  <PromptSchematic
                    activeBeat={activeBeat}
                    paused={!inView}
                    className="h-[min(86vh,46rem)] max-w-full"
                  />
                </div>

                {/* Beat copy rail */}
                <div className="relative flex min-h-[26rem] flex-col justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={beat.k}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3, ease: easings.smooth }}
                      className="flex flex-col items-start gap-5"
                    >
                      <BeatCopy beat={beat} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Mobile: stepped vertical list, no pinning ----------------- */}
          <div className="lg:hidden">
            <SteppedBeats />
          </div>
        </>
      )}
    </section>
  );
}

/* ---- Beat copy (shared between the rail and the stepped cards) ----------- */

function BeatCopy({ beat, compact = false }: { beat: PromptBeat; compact?: boolean }) {
  return (
    <>
      <p className="font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
        <span className="text-ink-subtle">
          {beat.k} / {TOTAL_LABEL}
        </span>
        <span aria-hidden="true" className="mx-2 text-ink-faint">
          ·
        </span>
        <span className="text-brand-300">{beat.phase}</span>
      </p>
      <h3 className={cn("text-balance text-white", compact ? "text-h3" : "text-h2 max-w-md")}>
        {beat.title}
      </h3>
      <p className={cn("leading-relaxed text-pretty text-ink-muted", compact ? "text-sm" : "max-w-md text-[15px]")}>
        {beat.body}
      </p>
      {beat.metric && (
        <p className="flex items-baseline gap-3">
          <span
            className={cn(
              "text-gradient font-mono font-medium tabular-nums",
              compact ? "text-3xl" : "text-[clamp(2.5rem,3.2vw,3.4rem)] leading-none",
            )}
          >
            {beat.metric.value}
          </span>
          <span className="max-w-[14rem] font-mono text-xs leading-snug text-ink-subtle">
            {beat.metric.label}
          </span>
        </p>
      )}
      <PathChip path={beat.hook} />
    </>
  );
}

/* ---- Mobile / reduced-motion fallback: stepped cards, no pinning --------- */

function SteppedBeats() {
  return (
    <div className="px-6 pb-20">
      <div className="mx-auto max-w-2xl">
        {/* The full schematic once, static and complete, as the map up front. */}
        <Reveal>
          <PromptSchematic
            variant="static"
            activeBeat={BEAT_COUNT - 1}
            className="mx-auto mb-12 h-auto w-full max-w-xs"
          />
        </Reveal>
        <ol className="relative ml-1.5 space-y-5 border-l border-hairline pl-6">
          {lifeOfAPrompt.map((beat) => (
            <li key={beat.k} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-8 -left-[27.5px] block h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgba(94,105,210,0.8)]"
              />
              <Reveal>
                {/* Hairline card with an opaque fake-glass fill — no
                    backdrop-blur stack on mobile (BUILD-SPEC §0 perf rule). */}
                <div className="flex flex-col items-start gap-3.5 rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] p-6 shadow-[var(--edge-highlight)]">
                  <BeatCopy beat={beat} compact />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
