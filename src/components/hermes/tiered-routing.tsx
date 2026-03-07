"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { tiers } from "@/data/hermes";
import { cn } from "@/lib/utils";

const tierGlows: Record<number, string> = {
  0: "rgba(52, 211, 153, 0.3)",
  1: "rgba(251, 191, 36, 0.3)",
  2: "rgba(167, 139, 250, 0.3)",
};

const tierIconPaths = [
  // Tier 1: skip/fast-forward
  "M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z",
  // Tier 2: scalpel/precision
  "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10",
  // Tier 3: full rebuild
  "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
];

export function TieredRouting() {
  const [selectedTier, setSelectedTier] = useState(1);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <ScrollReveal>
        <h3 className="mb-3 text-h2 text-white">Tiered Complexity Routing</h3>
        <p className="mb-10 max-w-xl text-base text-text-secondary sm:mb-12">
          The system routes to the right tier based on change complexity, saving
          time and tokens on simple sessions.
        </p>
      </ScrollReveal>

      {/* Tier selector pills */}
      <ScrollReveal
        delay={0.2}
        className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            onClick={() => setSelectedTier(i)}
            className={cn(
              "relative rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              selectedTier === i
                ? "border-current"
                : "border-white/[0.06] text-text-tertiary hover:border-white/[0.1] hover:text-white"
            )}
            style={
              selectedTier === i
                ? {
                    color: tier.color,
                    background: `${tier.color}10`,
                    borderColor: `${tier.color}50`,
                    boxShadow: `0 0 20px ${tier.color}15`,
                  }
                : undefined
            }
          >
            {tier.name}
          </button>
        ))}
      </ScrollReveal>

      {/* Routing visualization - Desktop */}
      <ScrollReveal delay={0.4} className="relative mb-12">
        <div className="hidden sm:block">
          <div className="relative mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-8 backdrop-blur-sm">
            {/* Input node */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-surface-1"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(255,255,255,0)",
                    "0 0 15px rgba(255,255,255,0.1)",
                    "0 0 0px rgba(255,255,255,0)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
                <span className="absolute -bottom-5 text-[10px] font-semibold uppercase tracking-wider text-text-tertiary">
                  Session In
                </span>
              </motion.div>
            </div>

            {/* Branching paths */}
            <div className="relative mt-8">
              {/* SVG connecting lines */}
              <svg
                viewBox="0 0 600 80"
                className="absolute inset-x-0 top-0 w-full -translate-y-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                style={{ height: 60 }}
              >
                {tiers.map((tier, i) => {
                  const startX = 300;
                  const endX = 100 + i * 200;
                  const isSelected = selectedTier === i;
                  const midY = 30;
                  const path = `M ${startX} 0 C ${startX} ${midY}, ${endX} ${midY}, ${endX} 60`;

                  return (
                    <g key={tier.id}>
                      {/* Path track */}
                      <path
                        d={path}
                        fill="none"
                        stroke={tier.color}
                        strokeWidth={isSelected ? 2 : 0.8}
                        style={{
                          opacity: isSelected ? 0.7 : 0.08,
                          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      />
                      {/* Animated packet on selected path */}
                      {isSelected && (
                        <circle
                          r="4"
                          fill={tier.color}
                          style={{
                            filter: `drop-shadow(0 0 6px ${tier.color})`,
                          }}
                        >
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={path}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Tier cards */}
              <div className="grid grid-cols-3 gap-4">
                {tiers.map((tier, i) => {
                  const isSelected = selectedTier === i;
                  return (
                    <motion.button
                      key={tier.id}
                      onClick={() => setSelectedTier(i)}
                      animate={{
                        scale: isSelected ? 1 : 0.97,
                        y: isSelected ? 0 : 4,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={cn(
                        "relative flex flex-col items-center rounded-2xl border p-5 text-center transition-[border-color,box-shadow] duration-500",
                        "focus-visible:outline-2 focus-visible:outline-offset-2",
                        isSelected ? "bg-surface-1" : "bg-surface-0/50"
                      )}
                      style={{
                        borderColor: isSelected
                          ? `${tier.color}60`
                          : "rgba(255,255,255,0.04)",
                        boxShadow: isSelected
                          ? `0 8px 32px ${tier.color}15, 0 0 0 1px ${tier.color}10`
                          : "none",
                        outlineColor: tier.color,
                      }}
                    >
                      {/* Glow overlay */}
                      <div
                        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
                        style={{
                          opacity: isSelected ? 1 : 0,
                          background: `radial-gradient(ellipse at 50% 0%, ${tier.color}10, transparent 70%)`,
                        }}
                      />

                      <div className="relative">
                        {/* Icon */}
                        <div
                          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-500"
                          style={{
                            background: isSelected
                              ? `${tier.color}20`
                              : `${tier.color}08`,
                            boxShadow: isSelected
                              ? `0 0 24px ${tier.color}25`
                              : "none",
                          }}
                        >
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke={tier.color}
                            strokeWidth="1.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={tierIconPaths[i]}
                            />
                          </svg>
                        </div>

                        {/* Label */}
                        <p
                          className="text-lg font-bold transition-colors duration-300"
                          style={{
                            color: isSelected ? tier.color : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {tier.label}
                        </p>
                        <p
                          className="mt-0.5 text-xs font-medium transition-colors duration-300"
                          style={{
                            color: isSelected
                              ? "rgba(255,255,255,0.5)"
                              : "rgba(255,255,255,0.15)",
                          }}
                        >
                          {tier.name}
                        </p>

                        {/* Frequency badge */}
                        <div
                          className="mx-auto mt-3 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300"
                          style={{
                            background: isSelected
                              ? `${tier.color}15`
                              : "rgba(255,255,255,0.02)",
                            color: isSelected ? tier.color : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {tier.frequency}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Output indicator */}
            <div className="mt-6 flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTier}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 rounded-full border px-4 py-2"
                  style={{
                    borderColor: `${tiers[selectedTier].color}30`,
                    background: `${tiers[selectedTier].color}08`,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: tiers[selectedTier].color,
                      boxShadow: `0 0 8px ${tiers[selectedTier].color}60`,
                    }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: tiers[selectedTier].color }}
                  >
                    {tiers[selectedTier].avgTime} avg
                  </span>
                  <span className="text-xs text-text-muted">|</span>
                  <span className="text-xs text-text-tertiary">
                    {tiers[selectedTier].avgTokens} tokens
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: vertical routing */}
        <div className="sm:hidden">
          <div className="flex flex-col items-center">
            {/* Input */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.15] bg-surface-1">
              <span className="text-xs font-bold text-white">IN</span>
            </div>

            {/* Branches */}
            <div className="mt-3 w-full space-y-3">
              {tiers.map((tier, i) => {
                const isSelected = selectedTier === i;
                return (
                  <div key={tier.id} className="flex flex-col items-center">
                    <div
                      className="h-4 w-px transition-colors duration-300"
                      style={{
                        background: isSelected
                          ? tier.color
                          : "rgba(255,255,255,0.06)",
                      }}
                    />
                    <button
                      onClick={() => setSelectedTier(i)}
                      className="flex w-full max-w-xs items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300"
                      style={{
                        borderColor: isSelected
                          ? `${tier.color}80`
                          : "rgba(255,255,255,0.06)",
                        background: isSelected
                          ? `${tier.color}10`
                          : "transparent",
                        boxShadow: isSelected
                          ? `0 0 20px ${tierGlows[i]}`
                          : "none",
                      }}
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `${tier.color}15`,
                        }}
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={tier.color}
                          strokeWidth="1.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={tierIconPaths[i]}
                          />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: isSelected
                              ? tier.color
                              : "rgba(255,255,255,0.3)",
                          }}
                        >
                          {tier.label}: {tier.name}
                        </p>
                        <p className="text-xs text-text-tertiary">
                          {tier.frequency} of sessions
                        </p>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl"
        >
          <GlowingStarsCard className="p-8">
            {(() => {
              const tier = tiers[selectedTier];
              return (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        background: `${tier.color}15`,
                      }}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={tier.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={tierIconPaths[selectedTier]}
                        />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">
                      {tier.label}: {tier.name}
                    </h4>
                  </div>
                  <p className="mb-5 text-text-secondary">
                    {tier.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Avg Time", value: tier.avgTime },
                      { label: "Avg Tokens", value: tier.avgTokens },
                      { label: "Frequency", value: tier.frequency },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 text-center"
                      >
                        <p
                          className="text-xl font-bold"
                          style={{ color: tier.color }}
                        >
                          {stat.value}
                        </p>
                        <p className="mt-1 text-xs text-text-tertiary">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  {tier.note && (
                    <p className="mt-4 text-center text-xs italic text-text-tertiary">
                      {tier.note}
                    </p>
                  )}
                </>
              );
            })()}
          </GlowingStarsCard>
        </motion.div>
      </AnimatePresence>

      {selectedTier === 2 && (
        <ScrollReveal delay={0.1} className="mt-6 text-center">
          <p className="text-sm text-text-muted">
            Tier 3 hasn&apos;t been needed in 13 sessions &mdash; the
            combination of intelligent inference and surgical updates handles
            even complex changes at Tier 2.
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
