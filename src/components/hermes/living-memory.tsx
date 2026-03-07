"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { memoryStores, flowSteps } from "@/data/hermes";

const storeIcons: Record<string, string> = {
  journals:
    "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25",
  patterns:
    "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z",
  vector:
    "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
};

const storeSubtitles: Record<string, string> = {
  journals: "Structured markdown",
  patterns: "Reusable solutions",
  vector: "Semantic search",
};

const flowCards = flowSteps.map((step) => ({
  quote: step.desc,
  name: `Step ${step.step}`,
  title: step.label,
  color: step.color,
}));

export function LivingMemory() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const diagramInView = useInView(diagramRef, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [activePhase, setActivePhase] = useState<"capture" | "inject">("capture");

  useEffect(() => {
    if (!diagramInView || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev === "capture" ? "inject" : "capture"));
    }, 3000);
    return () => clearInterval(interval);
  }, [diagramInView, prefersReducedMotion]);

  // SVG layout constants
  const svgW = 700;
  const svgH = 420;
  const sessionY = 40;
  const storeY = 200;
  const nextY = 380;
  const storeCenters = [175, 350, 525];

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          overline="Persistence Layer"
          title="Every Session Builds on the Last"
          subtitle="When a familiar problem appears, the system recalls how it was solved before. Session journals, troubleshooting patterns, and vector embeddings create persistent context that's automatically injected at session start."
        />

        {/* Memory flow diagram */}
        <ScrollReveal delay={0.2} className="mt-10 sm:mt-16">
          <div
            ref={diagramRef}
            className="relative mb-12 rounded-2xl border border-white/[0.06] bg-surface-0/50 p-4 backdrop-blur-sm sm:p-6"
          >
            {/* Phase indicator */}
            <div className="mb-4 flex justify-center gap-3">
              {(["capture", "inject"] as const).map((phase) => (
                <div
                  key={phase}
                  className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-500"
                  style={{
                    borderColor:
                      activePhase === phase
                        ? phase === "capture"
                          ? "rgba(167,139,250,0.4)"
                          : "rgba(52,211,153,0.4)"
                        : "rgba(255,255,255,0.04)",
                    background:
                      activePhase === phase
                        ? phase === "capture"
                          ? "rgba(167,139,250,0.08)"
                          : "rgba(52,211,153,0.08)"
                        : "transparent",
                    color:
                      activePhase === phase
                        ? phase === "capture"
                          ? "#a78bfa"
                          : "#34d399"
                        : "rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    className="h-1.5 w-1.5 rounded-full transition-all duration-500"
                    style={{
                      background:
                        activePhase === phase
                          ? phase === "capture"
                            ? "#a78bfa"
                            : "#34d399"
                          : "rgba(255,255,255,0.15)",
                      boxShadow:
                        activePhase === phase
                          ? `0 0 6px ${phase === "capture" ? "#a78bfa" : "#34d399"}`
                          : "none",
                    }}
                  />
                  {phase}
                </div>
              ))}
            </div>

            <svg
              role="img"
              aria-label="Memory system data flow: capture, index, recall, apply"
              viewBox={`0 0 ${svgW} ${svgH}`}
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="captureGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(167,139,250,0.3)" />
                  <stop offset="100%" stopColor="rgba(167,139,250,0)" />
                </linearGradient>
                <linearGradient id="injectGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="rgba(52,211,153,0.3)" />
                  <stop offset="100%" stopColor="rgba(52,211,153,0)" />
                </linearGradient>
                <filter id="memGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ===== CURRENT SESSION NODE ===== */}
              <g>
                {/* Glow behind */}
                <rect
                  x="240"
                  y={sessionY - 6}
                  width="220"
                  height="52"
                  rx="26"
                  fill="#a78bfa"
                  style={{
                    opacity: activePhase === "capture" ? 0.08 : 0.03,
                    filter: "blur(12px)",
                    transition: "opacity 0.8s",
                  }}
                />
                <rect
                  x="250"
                  y={sessionY}
                  width="200"
                  height="40"
                  rx="20"
                  fill="rgba(167,139,250,0.06)"
                  stroke="#a78bfa"
                  strokeWidth={activePhase === "capture" ? 2 : 1}
                  style={{
                    filter:
                      activePhase === "capture"
                        ? "drop-shadow(0 0 8px rgba(167,139,250,0.3))"
                        : "none",
                    transition: "all 0.6s",
                  }}
                />
                <text
                  x="350"
                  y={sessionY + 25}
                  textAnchor="middle"
                  fill="#a78bfa"
                  fontSize="13"
                  fontWeight="600"
                >
                  Current Session
                </text>
                {/* Downward arrow icon */}
                <g
                  style={{
                    opacity: activePhase === "capture" ? 0.6 : 0.15,
                    transition: "opacity 0.6s",
                  }}
                >
                  <path
                    d="M 350 84 L 350 104"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 346 100 L 350 106 L 354 100"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>

              {/* ===== CAPTURE LABEL ===== */}
              <text
                x="70"
                y={sessionY + 55}
                fill={activePhase === "capture" ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.1)"}
                fontSize="10"
                fontWeight="600"
                className="font-mono uppercase"
                style={{ transition: "fill 0.6s" }}
              >
                CAPTURE
              </text>

              {/* ===== CAPTURE BEZIER PATHS ===== */}
              {storeCenters.map((storeX, i) => {
                const captureStart = { x: 350, y: sessionY + 40 };
                const captureEnd = { x: storeX, y: storeY - 50 };
                const cp1x = captureStart.x;
                const cp1y = captureStart.y + 40;
                const cp2x = captureEnd.x;
                const cp2y = captureEnd.y - 40;
                const capturePath = `M ${captureStart.x} ${captureStart.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${captureEnd.x} ${captureEnd.y}`;

                return (
                  <g key={`capture-${i}`}>
                    {/* Path track */}
                    <path
                      d={capturePath}
                      fill="none"
                      stroke={memoryStores[i].color}
                      strokeWidth={activePhase === "capture" ? 1.5 : 0.6}
                      style={{
                        opacity: activePhase === "capture" ? 0.4 : 0.06,
                        transition: "all 0.6s ease",
                      }}
                    />
                    {/* Animated packet */}
                    {diagramInView && !prefersReducedMotion && activePhase === "capture" && (
                      <circle
                        r="4"
                        fill={memoryStores[i].color}
                        style={{
                          filter: `drop-shadow(0 0 8px ${memoryStores[i].color})`,
                        }}
                      >
                        <animateMotion
                          dur={`${2.5 + i * 0.3}s`}
                          repeatCount="indefinite"
                          path={capturePath}
                          begin={`${i * 0.4}s`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* ===== MEMORY STORE NODES ===== */}
              {memoryStores.map((store, i) => {
                const storeX = storeCenters[i];
                const nodeW = 160;
                const nodeH = 100;
                return (
                  <g key={store.id}>
                    {/* Glow */}
                    <rect
                      x={storeX - nodeW / 2 - 5}
                      y={storeY - nodeH / 2 - 5}
                      width={nodeW + 10}
                      height={nodeH + 10}
                      rx="18"
                      fill={store.color}
                      style={{
                        opacity: diagramInView ? 0.06 : 0,
                        filter: "blur(15px)",
                        transition: `opacity 0.8s ease ${i * 200}ms`,
                      }}
                    />

                    {/* Card background */}
                    <rect
                      x={storeX - nodeW / 2}
                      y={storeY - nodeH / 2}
                      width={nodeW}
                      height={nodeH}
                      rx="14"
                      fill="rgba(10,10,10,0.8)"
                      stroke={store.color}
                      strokeWidth={diagramInView ? 1.5 : 0.5}
                      style={{
                        filter: diagramInView
                          ? `drop-shadow(0 0 12px ${store.color}20)`
                          : "none",
                        transition: `all 0.8s ease ${i * 200}ms`,
                      }}
                    />

                    {/* Icon circle */}
                    <circle
                      cx={storeX}
                      cy={storeY - 15}
                      r="16"
                      fill={`${store.color}15`}
                      stroke={store.color}
                      strokeWidth="0.5"
                    />
                    <circle
                      cx={storeX}
                      cy={storeY - 15}
                      r="4"
                      fill={store.color}
                      opacity="0.6"
                    />

                    {/* Pulse on icon */}
                    {diagramInView && !prefersReducedMotion && (
                      <circle
                        cx={storeX}
                        cy={storeY - 15}
                        r="16"
                        fill="none"
                        stroke={store.color}
                        strokeWidth="1"
                      >
                        <animate
                          attributeName="r"
                          values="16;24;16"
                          dur="3s"
                          repeatCount="indefinite"
                          begin={`${i * 0.5}s`}
                        />
                        <animate
                          attributeName="opacity"
                          values="0.3;0;0.3"
                          dur="3s"
                          repeatCount="indefinite"
                          begin={`${i * 0.5}s`}
                        />
                      </circle>
                    )}

                    {/* Label */}
                    <text
                      x={storeX}
                      y={storeY + 15}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {store.label}
                    </text>
                    <text
                      x={storeX}
                      y={storeY + 30}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.25)"
                      fontSize="9"
                    >
                      {storeSubtitles[store.id]}
                    </text>
                  </g>
                );
              })}

              {/* ===== INJECT LABEL ===== */}
              <text
                x="70"
                y={storeY + 80}
                fill={activePhase === "inject" ? "rgba(52,211,153,0.6)" : "rgba(255,255,255,0.1)"}
                fontSize="10"
                fontWeight="600"
                className="font-mono uppercase"
                style={{ transition: "fill 0.6s" }}
              >
                INJECT
              </text>

              {/* ===== INJECT BEZIER PATHS ===== */}
              {storeCenters.map((storeX, i) => {
                const injectStart = { x: storeX, y: storeY + 50 };
                const injectEnd = { x: 350, y: nextY - 20 };
                const cp1x = injectStart.x;
                const cp1y = injectStart.y + 40;
                const cp2x = injectEnd.x;
                const cp2y = injectEnd.y - 40;
                const injectPath = `M ${injectStart.x} ${injectStart.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${injectEnd.x} ${injectEnd.y}`;

                return (
                  <g key={`inject-${i}`}>
                    <path
                      d={injectPath}
                      fill="none"
                      stroke={memoryStores[i].color}
                      strokeWidth={activePhase === "inject" ? 1.5 : 0.6}
                      style={{
                        opacity: activePhase === "inject" ? 0.4 : 0.06,
                        transition: "all 0.6s ease",
                      }}
                    />
                    {diagramInView && !prefersReducedMotion && activePhase === "inject" && (
                      <circle
                        r="4"
                        fill={memoryStores[i].color}
                        style={{
                          filter: `drop-shadow(0 0 8px ${memoryStores[i].color})`,
                        }}
                      >
                        <animateMotion
                          dur={`${2.5 + i * 0.3}s`}
                          repeatCount="indefinite"
                          path={injectPath}
                          begin={`${i * 0.4}s`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Upward arrow icon before Next Session */}
              <g
                style={{
                  opacity: activePhase === "inject" ? 0.6 : 0.15,
                  transition: "opacity 0.6s",
                }}
              >
                <path
                  d={`M 350 ${nextY - 30} L 350 ${nextY - 10}`}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.5"
                />
                <path
                  d={`M 346 ${nextY - 14} L 350 ${nextY - 8} L 354 ${nextY - 14}`}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>

              {/* ===== NEXT SESSION NODE ===== */}
              <g>
                <rect
                  x="240"
                  y={nextY - 6}
                  width="220"
                  height="52"
                  rx="26"
                  fill="#34d399"
                  style={{
                    opacity: activePhase === "inject" ? 0.08 : 0.03,
                    filter: "blur(12px)",
                    transition: "opacity 0.8s",
                  }}
                />
                <rect
                  x="250"
                  y={nextY}
                  width="200"
                  height="40"
                  rx="20"
                  fill="rgba(52,211,153,0.06)"
                  stroke="#34d399"
                  strokeWidth={activePhase === "inject" ? 2 : 1}
                  style={{
                    filter:
                      activePhase === "inject"
                        ? "drop-shadow(0 0 8px rgba(52,211,153,0.3))"
                        : "none",
                    transition: "all 0.6s",
                  }}
                />
                <text
                  x="350"
                  y={nextY + 25}
                  textAnchor="middle"
                  fill="#34d399"
                  fontSize="13"
                  fontWeight="600"
                >
                  Next Session
                </text>
              </g>

              {/* Cycle return arrow (right side) */}
              <g
                style={{
                  opacity: diagramInView ? 0.15 : 0,
                  transition: "opacity 1s ease 1s",
                }}
              >
                <path
                  d={`M 460 ${nextY + 20} C 600 ${nextY + 20}, 620 ${sessionY + 20}, 460 ${sessionY + 20}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 464 36 L 458 40 L 464 44"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </g>
            </svg>

            {/* Memory store detail cards */}
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {memoryStores.map((store, i) => (
                <ScrollReveal key={store.id} delay={0.3 + i * 0.1}>
                  <GlowingStarsCard className="text-center">
                    <div className="flex flex-col items-center">
                      <div
                        className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: `${store.color}12` }}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={store.color}
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={storeIcons[store.id]}
                          />
                        </svg>
                      </div>
                      <h4 className="text-sm font-semibold text-white">
                        {store.label}
                      </h4>
                      <p className="mt-1 text-xs text-text-tertiary">
                        {store.description}
                      </p>
                    </div>
                  </GlowingStarsCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Hook chain */}
        <ScrollReveal
          delay={0.4}
          className="mx-auto mb-12 max-w-2xl rounded-xl border border-white/[0.06] bg-surface-1/80 p-5 text-center backdrop-blur-sm"
        >
          <p className="text-sm text-text-secondary">
            Three hooks chain together:{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-accent-400">
              session-start.sh
            </code>{" "}
            injects context &rarr;{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-brand-400">
              rebuild-context.sh
            </code>{" "}
            updates summaries &rarr;{" "}
            <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-warning">
              pattern-analyzer.py
            </code>{" "}
            generates anticipation hints. All automatic, all under 1 second.
          </p>
        </ScrollReveal>

        {/* Flow steps as InfiniteMovingCards */}
        <ScrollReveal delay={0.5}>
          <InfiniteMovingCards
            items={flowCards}
            direction="right"
            speed="slow"
            className="mb-4"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
