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

      {/* Routing SVG visualization - desktop */}
      <ScrollReveal delay={0.4} className="relative mb-12">
        <svg
          viewBox="0 0 800 280"
          className="hidden w-full sm:block"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="400"
            cy="30"
            r="12"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.5"
          />
          <text
            x="400"
            y="34"
            textAnchor="middle"
            fill="white"
            fontSize="10"
            fontWeight="bold"
          >
            IN
          </text>

          {tiers.map((tier, i) => {
            const x = 150 + i * 250;
            const isSelected = selectedTier === i;
            return (
              <g key={tier.id}>
                <path
                  d={`M 400 42 Q ${x + (400 - x) * 0.3} 100 ${x} 140`}
                  fill="none"
                  stroke={tier.color}
                  strokeWidth={isSelected ? 2.5 : 1}
                  strokeDasharray={isSelected ? "none" : "6 4"}
                  style={{
                    opacity: isSelected ? 1 : 0.15,
                    transition: "all 0.5s",
                  }}
                />
                {isSelected && (
                  <>
                    <circle r="4" fill={tier.color} opacity="0.8">
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M 400 42 Q ${x + (400 - x) * 0.3} 100 ${x} 140`}
                      />
                    </circle>
                    <circle
                      cx={x}
                      cy="160"
                      r="28"
                      fill="none"
                      stroke={tier.color}
                      strokeWidth="1"
                      opacity="0.4"
                    >
                      <animate
                        attributeName="r"
                        values="28;40;28"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </>
                )}
                <g
                  style={{
                    opacity: isSelected ? 1 : 0.2,
                    transition: "opacity 0.5s",
                  }}
                >
                  <circle
                    cx={x}
                    cy="160"
                    r="28"
                    fill="none"
                    stroke={tier.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    style={{
                      filter: isSelected
                        ? `drop-shadow(0 0 15px ${tierGlows[i]})`
                        : "none",
                    }}
                  />
                  <circle
                    cx={x}
                    cy="160"
                    r="8"
                    fill={tier.color}
                    style={{ opacity: isSelected ? 0.8 : 0.25 }}
                  />
                  <text
                    x={x}
                    y="205"
                    textAnchor="middle"
                    fill={
                      isSelected ? tier.color : "rgba(255,255,255,0.2)"
                    }
                    fontSize="14"
                    fontWeight="600"
                  >
                    {tier.label}
                  </text>
                  <text
                    x={x}
                    y="222"
                    textAnchor="middle"
                    fill={
                      isSelected
                        ? "rgba(255,255,255,0.4)"
                        : "rgba(255,255,255,0.1)"
                    }
                    fontSize="11"
                  >
                    {tier.name}
                  </text>
                  <line
                    x1={x}
                    y1="190"
                    x2={x}
                    y2="240"
                    stroke={tier.color}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity={isSelected ? 0.4 : 0.08}
                  />
                  <text
                    x={x}
                    y="258"
                    textAnchor="middle"
                    fill={
                      isSelected
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.06)"
                    }
                    fontSize="9"
                  >
                    OUTPUT
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Mobile: vertical */}
        <div className="flex flex-col items-center gap-4 sm:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] bg-surface-0">
            <span className="text-xs font-bold text-white">IN</span>
          </div>
          {tiers.map((tier, i) => {
            const isSelected = selectedTier === i;
            return (
              <div
                key={tier.id}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="h-6 w-px"
                  style={{
                    background: isSelected
                      ? tier.color
                      : "rgba(255,255,255,0.06)",
                  }}
                />
                <button
                  onClick={() => setSelectedTier(i)}
                  className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300"
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
                    className="h-3 w-3 rounded-full"
                    style={{
                      background: tier.color,
                      opacity: isSelected ? 1 : 0.2,
                    }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: isSelected
                          ? tier.color
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {tier.label}
                    </p>
                    <p className="text-xs text-text-tertiary">{tier.name}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Detail card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTier}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-2xl"
        >
          <GlowingStarsCard className="p-8">
            {(() => {
              const tier = tiers[selectedTier];
              return (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-3 w-3 rounded-full"
                      style={{
                        background: tier.color,
                        boxShadow: `0 0 10px ${tier.color}60`,
                      }}
                    />
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
                        className="rounded-xl bg-white/[0.02] p-4 text-center"
                      >
                        <p className="text-xl font-bold text-white">
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
