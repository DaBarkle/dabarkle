"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SplitHeading } from "@/components/ui/split-heading";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { JargonChip } from "@/components/ui/jargon";
import { explainerBeats, type ExplainerBeat } from "@/data/narrative";
import { viewportOnce, easings, tBase } from "@/lib/motion";
import { color, functional, alpha } from "@/lib/tokens";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   Jargon weaving — wrap the FIRST occurrence of each key term in its beat
   copy with a JargonChip. The data strings stay verbatim (narrative.ts);
   we only split them. Keyed by `${beat.k}:${paragraphIndex}`; rules must
   appear in source-text order.
   -------------------------------------------------------------------------- */
const TERM_WEAVES: Record<string, ReadonlyArray<{ match: string; term: string }>> = {
  "01:0": [{ match: "large language model", term: "LLM" }],
  "01:1": [{ match: "context window", term: "context window" }],
  "03:0": [
    { match: "AI harness", term: "harness" },
    { match: "lifecycle hooks", term: "hook" },
  ],
};

function weave(
  text: string,
  rules?: ReadonlyArray<{ match: string; term: string }>,
): React.ReactNode {
  if (!rules?.length) return text;
  const nodes: React.ReactNode[] = [];
  let rest = text;
  for (const { match, term } of rules) {
    const i = rest.indexOf(match);
    if (i === -1) continue;
    nodes.push(rest.slice(0, i));
    nodes.push(
      <JargonChip key={term} term={term}>
        {match}
      </JargonChip>,
    );
    rest = rest.slice(i + match.length);
  }
  nodes.push(rest);
  return nodes;
}

/* ----------------------------------------------------------------------------
   SVG vignettes — drawn on whileInView via pathLength (stroke only), labels
   fade in (opacity only — no SVG transforms, so no transform-origin quirks).
   Static final state when `animate` is false (reduced motion). All decorative:
   the copy carries every fact, so the SVGs are aria-hidden.
   -------------------------------------------------------------------------- */
const sceneStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.8, ease: easings.smooth },
      opacity: { duration: 0.15 },
    },
  },
};
const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tBase },
};

/** Variant props for a vignette root — empty object renders the final state. */
function sceneProps(animate: boolean) {
  return animate
    ? ({
        initial: "hidden",
        whileInView: "visible",
        viewport: viewportOnce,
        variants: sceneStagger,
      } as const)
    : {};
}
/** Per-element variants helper — undefined disables motion entirely. */
const va = (on: boolean, v: Variants) => (on ? v : undefined);

const STROKE_BOX = color.inkSubtle;
const STROKE_FLOW = functional.lavender;

/** Beat 01 — the model as a sealed box: one arrow in, one arrow out. */
function SealedBoxVignette({ animate }: { animate: boolean }) {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 280 200"
      fill="none"
      className="w-full max-w-[340px]"
      {...sceneProps(animate)}
    >
      <motion.rect
        variants={va(animate, draw)}
        x="90"
        y="60"
        width="100"
        height="80"
        rx="10"
        stroke={STROKE_BOX}
        strokeWidth="1.5"
      />
      {/* in-arrow */}
      <motion.path
        variants={va(animate, draw)}
        d="M18 100 H78 M70 93 L80 100 L70 107"
        stroke={STROKE_FLOW}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* out-arrow */}
      <motion.path
        variants={va(animate, draw)}
        d="M202 100 H262 M254 93 L264 100 L254 107"
        stroke={STROKE_FLOW}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.g variants={va(animate, fadeIn)} className="font-mono">
        <text x="140" y="105" textAnchor="middle" fontSize="13" fill={color.inkMuted}>
          f(text)
        </text>
        <text x="48" y="88" textAnchor="middle" fontSize="9" fill={color.inkFaint}>
          text in
        </text>
        <text x="232" y="88" textAnchor="middle" fontSize="9" fill={color.inkFaint}>
          text out
        </text>
      </motion.g>
    </motion.svg>
  );
}

/** Beat 02 — the same box fracturing: dashed cracks + three rose fail tags. */
function CracksVignette({ animate }: { animate: boolean }) {
  const crack = {
    stroke: functional.rose,
    strokeWidth: "1.2",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeDasharray: "4 4",
  };
  const tags = [
    { label: "forgets", x: 176, y: 20, w: 58 },
    { label: "can't act", x: 210, y: 126, w: 64 },
    { label: "leaks", x: 40, y: 166, w: 48 },
  ];
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 280 200"
      fill="none"
      className="w-full max-w-[340px]"
      {...sceneProps(animate)}
    >
      <motion.rect
        variants={va(animate, draw)}
        x="90"
        y="60"
        width="100"
        height="80"
        rx="10"
        stroke={STROKE_BOX}
        strokeWidth="1.5"
      />
      {/* faint in/out flow for continuity with beat 01 */}
      <motion.path
        variants={va(animate, draw)}
        d="M18 100 H78 M202 100 H262"
        stroke={alpha(functional.lavender, 0.3)}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* fracture lines breaching the box */}
      <motion.path variants={va(animate, draw)} d="M150 60 L160 38 L172 30" {...crack} />
      <motion.path variants={va(animate, draw)} d="M190 118 L216 132 L222 146" {...crack} />
      <motion.path variants={va(animate, draw)} d="M112 140 L88 158 L82 172" {...crack} />
      <motion.path
        variants={va(animate, draw)}
        d="M118 60 L138 96 L124 122 L142 140"
        {...crack}
        stroke={alpha(functional.rose, 0.6)}
      />
      {/* fail tags */}
      {tags.map((t) => (
        <motion.g key={t.label} variants={va(animate, fadeIn)} className="font-mono">
          <rect
            x={t.x}
            y={t.y}
            width={t.w}
            height="20"
            rx="6"
            fill={alpha(functional.rose, 0.08)}
            stroke={alpha(functional.rose, 0.35)}
            strokeWidth="1"
          />
          <text
            x={t.x + t.w / 2}
            y={t.y + 13.5}
            textAnchor="middle"
            fontSize="10"
            fill={functional.rose}
          >
            {t.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}

/** Beat 03 — the box nested in a ring of five labeled harness subsystems. */
function HarnessRingVignette({ animate }: { animate: boolean }) {
  // Pentagon on a r=88 ring centred at (150,120); labels pushed outward.
  const nodes = [
    { label: "memory", cx: 150, cy: 32, tx: 150, ty: 18, anchor: "middle" },
    { label: "tools", cx: 234, cy: 93, tx: 244, ty: 96, anchor: "start" },
    { label: "hooks", cx: 202, cy: 191, tx: 208, ty: 207, anchor: "start" },
    { label: "guardrails", cx: 98, cy: 191, tx: 92, ty: 207, anchor: "end" },
    { label: "schedule", cx: 66, cy: 93, tx: 56, ty: 96, anchor: "end" },
  ] as const;
  // Radial ticks from each node toward the central box (radius 80 → 54).
  const spokes = [
    "M150 40 L150 66",
    "M226.3 95.4 L201.5 103.4",
    "M197 184.7 L181.8 163.7",
    "M103 184.7 L118.2 163.7",
    "M73.7 95.4 L98.5 103.4",
  ];
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 300 224"
      fill="none"
      className="w-full max-w-[380px]"
      {...sceneProps(animate)}
    >
      <motion.circle
        variants={va(animate, draw)}
        cx="150"
        cy="120"
        r="88"
        stroke={alpha(functional.lavender, 0.35)}
        strokeWidth="1.5"
      />
      <motion.rect
        variants={va(animate, draw)}
        x="108"
        y="88"
        width="84"
        height="64"
        rx="8"
        stroke={STROKE_BOX}
        strokeWidth="1.5"
      />
      {spokes.map((d) => (
        <motion.path
          key={d}
          variants={va(animate, draw)}
          d={d}
          stroke={alpha(functional.steel, 0.45)}
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
      <motion.text
        variants={va(animate, fadeIn)}
        x="150"
        y="124"
        textAnchor="middle"
        fontSize="13"
        fill={color.inkMuted}
        className="font-mono"
      >
        f(text)
      </motion.text>
      {nodes.map((n) => (
        <motion.g key={n.label} variants={va(animate, fadeIn)} className="font-mono">
          <circle
            cx={n.cx}
            cy={n.cy}
            r="4.5"
            fill={color.canvas}
            stroke={functional.lavender}
            strokeWidth="1.5"
          />
          <text x={n.tx} y={n.ty} textAnchor={n.anchor} fontSize="10" fill={color.inkMuted}>
            {n.label}
          </text>
        </motion.g>
      ))}
    </motion.svg>
  );
}

const VIGNETTES: Record<
  ExplainerBeat["vignette"],
  (props: { animate: boolean }) => React.ReactNode
> = {
  "sealed-box": SealedBoxVignette,
  cracks: CracksVignette,
  "harness-ring": HarnessRingVignette,
};

/**
 * Explainer — Act I: three beats taking an engineer with zero LLM background
 * from "stateless function" to "harness as runtime". Copy lives verbatim in
 * narrative.ts → explainerBeats; rows alternate copy ↔ vignette asymmetrically
 * (7/5 split). The closing analogy strip is the spec's mapping (BUILD-SPEC
 * §2.2): context window ≈ RAM, MCP ≈ typed API gateway, harness ≈ runtime +
 * service mesh.
 */
export function Explainer() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  return (
    <section id="explainer" className="relative scroll-mt-24 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>Act I · the primer</Eyebrow>
          <SplitHeading as="h2" className="mt-4 text-h1 text-balance text-white">
            From stateless function to ambient system.
          </SplitHeading>
          <Reveal delay={0.15}>
            <p className="mt-5 text-body-lg text-pretty text-ink-muted">
              Three beats from first principles — no LLM background assumed, no magic claimed.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-24">
          {explainerBeats.map((beat, bi) => {
            const Vignette = VIGNETTES[beat.vignette];
            const flip = bi % 2 === 1; // alternate: copy left, copy right, copy left
            return (
              <div
                key={beat.k}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14"
              >
                <Reveal
                  direction={flip ? "left" : "right"}
                  className={cn("lg:col-span-7", flip && "lg:order-2")}
                >
                  <div className="flex items-center gap-3 font-mono text-xs tracking-[0.14em] text-brand-300">
                    <span>{beat.k}</span>
                    <span aria-hidden="true" className="h-px w-10 bg-hairline-strong" />
                  </div>
                  <h3 className="mt-4 text-h2 text-balance text-white">{beat.title}</h3>
                  <div className="mt-5 max-w-prose space-y-4 text-[15px] leading-relaxed text-ink-muted sm:text-base">
                    {beat.body.map((para, pi) => (
                      <p key={pi} className="text-pretty">
                        {weave(para, TERM_WEAVES[`${beat.k}:${pi}`])}
                      </p>
                    ))}
                  </div>
                </Reveal>
                <div
                  className={cn(
                    "flex justify-center lg:col-span-5",
                    flip && "lg:order-1",
                  )}
                >
                  <Vignette animate={animate} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Analogy strip — the systems-engineer Rosetta stone. */}
        <Reveal className="mt-16 sm:mt-20">
          <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-full border border-hairline bg-white/[0.02] px-5 py-2.5 font-mono text-xs text-ink-subtle">
            <span>
              <JargonChip term="context window">context window</JargonChip> ≈ RAM
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <span>
              <JargonChip term="MCP">MCP</JargonChip> ≈ typed API gateway
            </span>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <span>
              <JargonChip term="harness">harness</JargonChip> ≈ runtime + service mesh
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
