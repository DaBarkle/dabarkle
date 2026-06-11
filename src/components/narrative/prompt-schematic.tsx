"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { lifeOfAPrompt } from "@/data/narrative";
import { easings } from "@/lib/motion";
import { alpha, color, functional } from "@/lib/tokens";
import { cn } from "@/lib/utils";

/**
 * PromptSchematic — the living system diagram for the "Life of a prompt"
 * centerpiece. Pure SVG, 7 node groups on a vertical spine:
 *
 *   Prompt → Router/Retrieval → Stage → Model core → Sentinel gate
 *          → Tool fleet → Memory store … and a return path curving from
 *   Memory back up to the Prompt — the loop closing is the visual thesis.
 *
 * Activation is DISCRETE (the parent scrub only decides which beat is
 * active): the beat-k node group lights lavender with a pre-blurred radial
 * glow (opacity toggle — no filters), its incoming edge draws on with
 * `pathLength`, and a single pulse dot travels the active edge via SMIL
 * `animateMotion` (≤2 concurrent across the whole diagram, unmounted when
 * `paused` or in the static variant). On the final beat the return path
 * draws full height, ONE pulse rides it back to the prompt node, and the
 * schematic settles into a complete, faintly-breathing system.
 *
 * Entirely decorative (`aria-hidden`) — the copy rail carries the content.
 * Everything animates via transform/opacity/stroke only.
 */

type NodeState = "inactive" | "active" | "past" | "complete";

export interface PromptSchematicProps {
  /** Active beat index, 0-based (0..6). Ignored by the static variant. */
  activeBeat: number;
  /** "live" = scroll-driven desktop mode; "static" = complete, motionless. */
  variant?: "live" | "static";
  /** Unmounts the SMIL pulses while the section is off-screen. */
  paused?: boolean;
  className?: string;
}

/* ---- Geometry (viewBox 640 × 720) --------------------------------------- */

const CX = 356; // main spine x
const LABEL_X = 210; // right-aligned mono label column

/** Forward edges — EDGES[i] feeds node i+1 and draws when beat i+1 activates. */
const EDGES = [
  "M 356 68 L 356 128", // prompt   → router
  "M 356 196 L 356 252", // router  → stage
  "M 356 336 L 356 380", // stage   → model
  "M 356 448 L 356 478", // model   → gate
  "M 356 539 L 356 564", // gate    → tools
  "M 356 604 L 356 634", // tools   → memory
] as const;

/** The loop: memory → up the right margin → back into the prompt node. */
const RETURN_PATH = "M 416 668 C 548 648, 600 552, 600 380 C 600 210, 548 54, 420 48";

const BEAT_COUNT = lifeOfAPrompt.length;
const LAST_BEAT = BEAT_COUNT - 1;

/* ---- State → paint ------------------------------------------------------- */

const STROKE: Record<NodeState, string> = {
  inactive: "rgba(210,214,230,0.13)", // ink-faint at ~40%
  active: functional.lavender,
  past: color.inkSubtle,
  complete: alpha(functional.lavender, 0.55),
};

const LABEL_FILL: Record<NodeState, string> = {
  inactive: "rgba(210,214,230,0.18)",
  active: functional.periwinkle,
  past: color.inkSubtle,
  complete: alpha(functional.periwinkle, 0.7),
};

const strokeStyle = (s: NodeState): React.CSSProperties => ({
  stroke: STROKE[s],
  transition: "stroke 480ms ease",
});

/* ---- Tiny internals ------------------------------------------------------ */

function NodeLabel({ y, state, children }: { y: number; state: NodeState; children: string }) {
  return (
    <text
      x={LABEL_X}
      y={y}
      textAnchor="end"
      fontSize={9.5}
      letterSpacing="0.14em"
      fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
      style={{ fill: LABEL_FILL[state], transition: "fill 480ms ease" }}
    >
      {children}
    </text>
  );
}

/** Pre-blurred radial glow — a gradient-filled ellipse whose opacity toggles. */
function NodeGlow({
  cx,
  cy,
  rx,
  ry,
  on,
  fillId,
  className,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  on: boolean;
  fillId: string;
  className?: string;
}) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={`url(#${fillId})`}
      className={className}
      style={{ opacity: on ? 1 : 0, transition: "opacity 600ms ease" }}
    />
  );
}

/**
 * A pulse dot travelling a path via SMIL animateMotion. Dynamically inserted
 * SMIL resolves `begin` against the document timeline, so a one-shot pulse
 * inserted late would already be "over" — hence begin="indefinite" plus an
 * explicit beginElement() once mounted. Hidden until the motion starts so the
 * dot never flashes at the SVG origin.
 */
function PathPulse({
  d,
  durS,
  repeat,
  delayMs = 0,
  haloId,
  fading = false,
}: {
  d: string;
  durS: number;
  repeat: "indefinite" | 1;
  delayMs?: number;
  haloId: string;
  /** Fade the (frozen) dot out — used once the loop-close pulse has landed. */
  fading?: boolean;
}) {
  const ref = useRef<SVGElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = ref.current as SVGAnimationElement | null;
      try {
        el?.beginElement();
        setStarted(true);
      } catch {
        /* SMIL unavailable — the dot simply stays hidden. */
      }
    }, delayMs);
    return () => window.clearTimeout(t);
  }, [delayMs]);

  return (
    <g
      style={{
        visibility: started ? "visible" : "hidden",
        opacity: fading ? 0 : 1,
        transition: "opacity 700ms ease",
      }}
    >
      <circle r={8} fill={`url(#${haloId})`} />
      <circle r={2.5} fill={functional.lavender} />
      <animateMotion
        ref={ref}
        begin="indefinite"
        dur={`${durS}s`}
        repeatCount={repeat}
        fill="freeze"
        path={d}
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0.45 0 0.25 1"
      />
    </g>
  );
}

/* ---- The schematic ------------------------------------------------------- */

export function PromptSchematic({
  activeBeat,
  variant = "live",
  paused = false,
  className,
}: PromptSchematicProps) {
  // Namespace gradient ids — the schematic renders twice per page
  // (desktop pinned + mobile static), and SVG ids are document-global.
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const glowId = `lps-glow-${uid}`;
  const coreId = `lps-core-${uid}`;
  const haloId = `lps-halo-${uid}`;

  const live = variant === "live";

  // After the loop-close pulse lands, the whole diagram settles into its
  // "complete" tone. Reset the moment the scrub leaves the final beat —
  // done as a render-time state adjustment (React's "state from props"
  // idiom) so no setState runs inside the effect body.
  const [settled, setSettled] = useState(false);
  const onFinalBeat = live && activeBeat === LAST_BEAT;
  const [wasOnFinalBeat, setWasOnFinalBeat] = useState(onFinalBeat);
  if (wasOnFinalBeat !== onFinalBeat) {
    setWasOnFinalBeat(onFinalBeat);
    if (!onFinalBeat && settled) setSettled(false);
  }
  useEffect(() => {
    if (!onFinalBeat) return;
    const t = window.setTimeout(() => setSettled(true), 3400);
    return () => window.clearTimeout(t);
  }, [onFinalBeat]);

  const done = !live || settled;
  const state = (i: number): NodeState =>
    done ? "complete" : i === activeBeat ? "active" : i < activeBeat ? "past" : "inactive";

  const glowOn = (i: number) => live && !settled && activeBeat === i;
  const cellFill = (i: number) =>
    state(i) === "active" ? "rgba(130,143,255,0.10)" : "rgba(255,255,255,0.03)";

  // Pulse budget: one repeating dot on the active edge (beats 1–5), or one
  // one-shot dot up the return path (final beat). Never more than 2 anywhere.
  const showEdgePulse = live && !paused && activeBeat >= 1 && activeBeat < LAST_BEAT;
  const showReturnPulse = live && !paused && activeBeat === LAST_BEAT;

  return (
    <svg
      viewBox="0 0 640 720"
      className={cn("select-none", className)}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <defs>
        {/* node glow — pre-blurred radial, toggled by opacity only */}
        <radialGradient id={glowId}>
          <stop offset="0%" stopColor={functional.lavender} stopOpacity={0.3} />
          <stop offset="55%" stopColor={functional.lavender} stopOpacity={0.12} />
          <stop offset="100%" stopColor={functional.lavender} stopOpacity={0} />
        </radialGradient>
        {/* model core — the only filled-glow node in the diagram */}
        <radialGradient id={coreId} cx="50%" cy="38%">
          <stop offset="0%" stopColor={functional.periwinkle} stopOpacity={0.85} />
          <stop offset="45%" stopColor={functional.iris} stopOpacity={0.55} />
          <stop offset="100%" stopColor={functional.iris} stopOpacity={0.12} />
        </radialGradient>
        {/* pulse halo */}
        <radialGradient id={haloId}>
          <stop offset="0%" stopColor={functional.lavender} stopOpacity={0.55} />
          <stop offset="100%" stopColor={functional.lavender} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* ---- Base edges: the whole circuit is always faintly present ------ */}
      <g fill="none" strokeWidth={1.25}>
        {EDGES.map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="rgba(210,214,230,0.10)" />
        ))}
        <path d={RETURN_PATH} stroke="rgba(210,214,230,0.10)" strokeDasharray="3 7" />
      </g>

      {/* ---- Activated edges: draw on discretely when their beat fires ---- */}
      {live ? (
        <g fill="none" strokeWidth={1.5} strokeLinecap="round">
          {EDGES.map((d, i) => {
            const on = activeBeat >= i + 1;
            const isActiveEdge = !settled && activeBeat === i + 1;
            return (
              <motion.path
                key={`draw-${i}`}
                d={d}
                stroke={functional.lavender}
                initial={false}
                animate={{ pathLength: on ? 1 : 0, opacity: on ? (isActiveEdge ? 0.95 : 0.45) : 0 }}
                transition={{
                  pathLength: { duration: 0.6, ease: easings.smooth },
                  opacity: { duration: 0.4 },
                }}
              />
            );
          })}
          <motion.path
            d={RETURN_PATH}
            stroke={functional.lavender}
            initial={false}
            animate={{
              pathLength: activeBeat >= LAST_BEAT ? 1 : 0,
              opacity: activeBeat >= LAST_BEAT ? 0.7 : 0,
            }}
            transition={{
              pathLength: { duration: 1.5, ease: easings.smooth },
              opacity: { duration: 0.5 },
            }}
          />
        </g>
      ) : (
        <g fill="none" strokeWidth={1.5} strokeLinecap="round" stroke={functional.lavender} opacity={0.4}>
          {EDGES.map((d, i) => (
            <path key={`static-${i}`} d={d} />
          ))}
          <path d={RETURN_PATH} />
        </g>
      )}

      {/* ---- Pulses (≤2 concurrent; none when paused/static) -------------- */}
      {showEdgePulse && (
        <PathPulse
          key={`edge-pulse-${activeBeat}`}
          d={EDGES[activeBeat - 1]}
          durS={1.5}
          repeat="indefinite"
          delayMs={250}
          haloId={haloId}
        />
      )}
      {showReturnPulse && (
        <PathPulse
          key="return-pulse"
          d={RETURN_PATH}
          durS={2.4}
          repeat={1}
          delayMs={700}
          haloId={haloId}
          fading={settled}
        />
      )}

      {/* ---- 01 · Prompt --------------------------------------------------- */}
      <g>
        <NodeGlow cx={CX} cy={48} rx={92} ry={42} on={glowOn(0)} fillId={glowId} />
        <rect x={292} y={28} width={128} height={40} rx={9} fill="none" strokeWidth={1.25} style={strokeStyle(state(0))} />
        <text
          x={306}
          y={54}
          fontSize={14}
          fontFamily="var(--font-jetbrains-mono), ui-monospace, monospace"
          style={{ fill: LABEL_FILL[state(0)], transition: "fill 480ms ease" }}
        >
          ❯
        </text>
        {/* caret — blinks only while the prompt beat is live (CSS animation,
            killed globally under prefers-reduced-motion) */}
        <rect
          x={322}
          y={40}
          width={6}
          height={15}
          rx={1}
          fill={functional.lavender}
          className={cn(live && !done && activeBeat === 0 && "animate-[glow-pulse_1.4s_ease-in-out_infinite]")}
          style={{ opacity: state(0) === "inactive" ? 0.15 : 0.75, transition: "opacity 480ms ease" }}
        />
        <NodeLabel y={52} state={state(0)}>
          PROMPT
        </NodeLabel>
      </g>

      {/* ---- 02 · Router / retrieval (3 block chips) ----------------------- */}
      <g>
        <NodeGlow cx={CX} cy={162} rx={120} ry={56} on={glowOn(1)} fillId={glowId} />
        <g fill="none" strokeWidth={1.25} style={strokeStyle(state(1))}>
          <rect x={268} y={128} width={176} height={68} rx={10} />
          <line x1={284} y1={147} x2={352} y2={147} />
        </g>
        <circle cx={428} cy={147} r={2.5} style={{ fill: STROKE[state(1)], transition: "fill 480ms ease" }} />
        {[284, 334, 384].map((x) => (
          <rect
            key={`chip-${x}`}
            x={x}
            y={160}
            width={44}
            height={18}
            rx={4}
            strokeWidth={1}
            style={{ ...strokeStyle(state(1)), fill: cellFill(1), transition: "stroke 480ms ease, fill 480ms ease" }}
          />
        ))}
        <NodeLabel y={166} state={state(1)}>
          ROUTER · RETRIEVAL
        </NodeLabel>
      </g>

      {/* ---- 03 · The Stage (4-zone mini-grid, asymmetric like the real
                 zone budgets: one big cell, three small) -------------------- */}
      <g>
        <NodeGlow cx={CX} cy={294} rx={110} ry={60} on={glowOn(2)} fillId={glowId} />
        <rect x={280} y={252} width={152} height={84} rx={10} fill="none" strokeWidth={1.25} style={strokeStyle(state(2))} />
        {[
          { x: 290, y: 262, w: 64, h: 64 }, // the big zone
          { x: 362, y: 262, w: 60, h: 18 },
          { x: 362, y: 285, w: 60, h: 18 },
          { x: 362, y: 308, w: 60, h: 18 },
        ].map((c, i) => (
          <rect
            key={`zone-${i}`}
            x={c.x}
            y={c.y}
            width={c.w}
            height={c.h}
            rx={4}
            strokeWidth={1}
            style={{ ...strokeStyle(state(2)), fill: cellFill(2), transition: "stroke 480ms ease, fill 480ms ease" }}
          />
        ))}
        <NodeLabel y={297} state={state(2)}>
          THE STAGE
        </NodeLabel>
      </g>

      {/* ---- 04 · Model core (the only filled-glow node) -------------------- */}
      <g>
        {/* breathes faintly once the loop has closed (CSS keyframe, opacity
            only; globally killed under prefers-reduced-motion) */}
        <NodeGlow
          cx={CX}
          cy={414}
          rx={64}
          ry={64}
          on={glowOn(3) || (live && settled)}
          fillId={glowId}
          className={cn(live && settled && "animate-[glow-pulse_5s_ease-in-out_infinite]")}
        />
        <circle cx={CX} cy={414} r={34} fill="none" strokeWidth={1.25} style={strokeStyle(state(3))} />
        <circle
          cx={CX}
          cy={414}
          r={23}
          fill={`url(#${coreId})`}
          style={{ opacity: state(3) === "inactive" ? 0.25 : 1, transition: "opacity 600ms ease" }}
        />
        <circle cx={CX} cy={414} r={3} fill={functional.periwinkle} style={{ opacity: state(3) === "inactive" ? 0.3 : 0.9, transition: "opacity 480ms ease" }} />
        <NodeLabel y={418} state={state(3)}>
          MODEL CORE
        </NodeLabel>
      </g>

      {/* ---- 05 · Sentinel gate — a literal shield on the model→tools path -- */}
      <g>
        <NodeGlow cx={CX} cy={508} rx={70} ry={48} on={glowOn(4)} fillId={glowId} />
        <g fill="none" strokeWidth={1.25} style={strokeStyle(state(4))}>
          <path d="M 356 478 c 9 8 19 11 28 11 v 15 c 0 17 -12 28 -28 35 c -16 -7 -28 -18 -28 -35 v -15 c 9 0 19 -3 28 -11 z" />
          {/* keyhole */}
          <circle cx={356} cy={505} r={4} />
          <line x1={356} y1={509} x2={356} y2={521} />
        </g>
        <NodeLabel y={508} state={state(4)}>
          SENTINEL GATE
        </NodeLabel>
      </g>

      {/* ---- 06 · Tool fleet (3 server chips) -------------------------------- */}
      <g>
        <NodeGlow cx={CX} cy={584} rx={140} ry={48} on={glowOn(5)} fillId={glowId} />
        {[246, 324, 402].map((x) => (
          <g key={`srv-${x}`}>
            <g fill="none" strokeWidth={1.25} style={strokeStyle(state(5))}>
              <rect x={x} y={564} width={64} height={40} rx={7} />
              <line x1={x + 11} y1={577} x2={x + 43} y2={577} />
              <line x1={x + 11} y1={586} x2={x + 35} y2={586} />
            </g>
            {/* status LED — functional teal, diagram-legend use only */}
            <circle
              cx={x + 52}
              cy={595}
              r={2.2}
              style={{
                fill: state(5) === "inactive" ? "rgba(210,214,230,0.15)" : alpha(functional.teal, 0.8),
                transition: "fill 480ms ease",
              }}
            />
          </g>
        ))}
        <NodeLabel y={588} state={state(5)}>
          TOOL FLEET
        </NodeLabel>
      </g>

      {/* ---- 07 · Memory store (cylinder) — where the loop turns ------------- */}
      <g>
        <NodeGlow cx={CX} cy={668} rx={90} ry={44} on={glowOn(6)} fillId={glowId} />
        <g fill="none" strokeWidth={1.25} style={strokeStyle(state(6))}>
          <path d="M 296 645 v 44 a 60 11 0 0 0 120 0 v -44" />
          <ellipse cx={356} cy={645} rx={60} ry={11} />
        </g>
        <g strokeWidth={1} style={{ stroke: STROKE[state(6)], opacity: 0.55, transition: "stroke 480ms ease" }}>
          <line x1={316} y1={666} x2={354} y2={666} />
          <line x1={316} y1={676} x2={374} y2={676} />
        </g>
        <NodeLabel y={672} state={state(6)}>
          MEMORY STORE
        </NodeLabel>
      </g>
    </svg>
  );
}
