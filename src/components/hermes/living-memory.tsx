"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
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

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          overline="Persistence Layer"
          title="Every Session Builds on the Last"
          subtitle="When a familiar problem appears, the system recalls how it was solved before. Session journals, troubleshooting patterns, and vector embeddings create persistent context that's automatically injected at session start."
        />

        {/* SVG diagram */}
        <ScrollReveal delay={0.2} className="mt-10 sm:mt-16">
          <div
            ref={diagramRef}
            className="relative mb-12 rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm sm:p-8"
          >
            <svg
              role="img"
              aria-label="Memory system data flow: capture, index, recall, apply"
              viewBox="0 0 700 380"
              className="w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Current Session */}
              <rect
                x="250"
                y="10"
                width="200"
                height="44"
                rx="12"
                fill="rgba(167,139,250,0.08)"
                stroke="#a78bfa"
                strokeWidth="1.5"
              >
                {diagramInView && !prefersReducedMotion && (
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              <text
                x="350"
                y="37"
                textAnchor="middle"
                fill="#a78bfa"
                fontSize="13"
                fontWeight="600"
              >
                Current Session
              </text>

              {/* Capture lines */}
              {[0, 1, 2].map((i) => {
                const cx = 175 + i * 175;
                return (
                  <g key={`capture-${i}`}>
                    <line
                      x1="350"
                      y1="54"
                      x2={cx}
                      y2="120"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    {diagramInView && !prefersReducedMotion && (
                      <circle
                        r="4"
                        fill={memoryStores[i].color}
                        opacity="0.8"
                        style={{
                          filter: `drop-shadow(0 0 6px ${memoryStores[i].color})`,
                        }}
                      >
                        <animateMotion
                          dur={`${3 + i}s`}
                          repeatCount="indefinite"
                          path={`M 350 54 L ${cx} 120`}
                          begin={`${i * 0.8}s`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Memory store nodes */}
              {memoryStores.map((store, i) => {
                const cx = 175 + i * 175;
                return (
                  <g key={store.id}>
                    <rect
                      x={cx - 85}
                      y="120"
                      width="170"
                      height="120"
                      rx="12"
                      fill="rgba(255,255,255,0.015)"
                      stroke={store.color}
                      strokeWidth={diagramInView ? 1.5 : 0.5}
                      style={{
                        filter: diagramInView
                          ? `drop-shadow(0 0 15px ${store.color}15)`
                          : "none",
                        transition: `all 0.8s ease ${i * 300}ms`,
                      }}
                    />
                    <circle
                      cx={cx}
                      cy="155"
                      r="16"
                      fill={`${store.color}12`}
                    />
                    <circle
                      cx={cx}
                      cy="155"
                      r="4"
                      fill={store.color}
                      opacity="0.6"
                    />
                    <text
                      x={cx}
                      y="190"
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {store.label}
                    </text>
                    <text
                      x={cx}
                      y="205"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.25)"
                      fontSize="9"
                    >
                      {store.id === "journals"
                        ? "Structured markdown"
                        : store.id === "patterns"
                          ? "Reusable solutions"
                          : "Semantic search"}
                    </text>
                  </g>
                );
              })}

              {/* Inject lines */}
              {[0, 1, 2].map((i) => {
                const cx = 175 + i * 175;
                return (
                  <g key={`inject-${i}`}>
                    <line
                      x1={cx}
                      y1="240"
                      x2="350"
                      y2="310"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                    {diagramInView && !prefersReducedMotion && (
                      <circle
                        r="4"
                        fill={memoryStores[i].color}
                        opacity="0.8"
                        style={{
                          filter: `drop-shadow(0 0 6px ${memoryStores[i].color})`,
                        }}
                      >
                        <animateMotion
                          dur={`${3.5 + i}s`}
                          repeatCount="indefinite"
                          path={`M ${cx} 240 L 350 310`}
                          begin={`${i * 0.6 + 1.5}s`}
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Next Session */}
              <rect
                x="250"
                y="310"
                width="200"
                height="44"
                rx="12"
                fill="rgba(52,211,153,0.08)"
                stroke="#34d399"
                strokeWidth="1.5"
              >
                {diagramInView && !prefersReducedMotion && (
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                )}
              </rect>
              <text
                x="350"
                y="337"
                textAnchor="middle"
                fill="#34d399"
                fontSize="13"
                fontWeight="600"
              >
                Next Session
              </text>

              <text
                x="80"
                y="90"
                fill="rgba(255,255,255,0.15)"
                fontSize="9"
                className="font-mono uppercase"
              >
                Capture
              </text>
              <text
                x="80"
                y="280"
                fill="rgba(255,255,255,0.15)"
                fontSize="9"
                className="font-mono uppercase"
              >
                Inject
              </text>
            </svg>

            {/* Memory store detail cards */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {memoryStores.map((store) => (
                <GlowingStarsCard key={store.id} className="text-center">
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
