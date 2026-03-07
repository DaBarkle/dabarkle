"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { GridBackground } from "@/components/aceternity/grid-background";
import { agents, systemModes, agentIcons } from "@/data/hermes";

const modeIcons: Record<string, string> = {
  "live-ops":
    "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
  "doc-pipeline":
    "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
};

const pipelineLabels = ["Analyze", "Update", "Polish", "Optimize"];

export function TheSystem() {
  const [activeAgent, setActiveAgent] = useState(-1);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!pipelineInView || prefersReducedMotion) return;
    const startDelay = setTimeout(() => {
      setActiveAgent(0);
    }, 600);

    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 2500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [pipelineInView, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={40} color="rgba(255,255,255,0.03)">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            overline="Architecture"
            title="Two Modes, One System"
            subtitle="Hermes operates in two complementary modes: real-time infrastructure operations and automated documentation maintenance."
          />

          {/* Two mode cards */}
          <div className="mb-20 mt-12 grid gap-6 md:grid-cols-2 sm:mt-16">
            {systemModes.map((mode, i) => (
              <ScrollReveal key={mode.id} delay={0.2 + i * 0.15}>
                <GlowingStarsCard className="h-full p-8">
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: `${mode.color}15` }}
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={mode.color}
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={modeIcons[mode.id]}
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {mode.name}
                    </h3>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                    {mode.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {mode.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{
                          background: `${mode.color}10`,
                          color: mode.color,
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </GlowingStarsCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Connector text */}
          <ScrollReveal delay={0.5} className="mb-12 text-center">
            <p className="text-lg text-text-muted">
              The documentation pipeline is where the engineering depth lives.
              <br />
              <span className="text-accent-400 font-medium">
                Four specialized agents, each purpose-built.
              </span>
            </p>
          </ScrollReveal>

          {/* Four Agents heading */}
          <ScrollReveal className="mb-16">
            <h3 className="text-center text-h2 text-white">The Four Agents</h3>
          </ScrollReveal>

          {/* === PIPELINE VISUALIZATION === */}
          <div ref={pipelineRef}>
            {/* Desktop: Horizontal pipeline */}
            <div className="hidden md:block">
              {/* Pipeline connector line with animated gradient */}
              <div className="relative mx-auto mb-8" style={{ maxWidth: "calc(100% - 80px)" }}>
                <ScrollReveal delay={0.3}>
                  {/* SVG pipeline connector */}
                  <svg
                    viewBox="0 0 900 100"
                    className="w-full"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="pipelineGrad" x1="0" y1="0" x2="1" y2="0">
                        {agents.map((agent, i) => (
                          <stop
                            key={agent.id}
                            offset={`${(i / (agents.length - 1)) * 100}%`}
                            stopColor={agent.color}
                          />
                        ))}
                      </linearGradient>
                      <filter id="pipelineGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Background track */}
                    <line
                      x1="112"
                      y1="50"
                      x2="788"
                      y2="50"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="2"
                    />

                    {/* Animated gradient line */}
                    <line
                      x1="112"
                      y1="50"
                      x2="788"
                      y2="50"
                      stroke="url(#pipelineGrad)"
                      strokeWidth="2"
                      style={{
                        opacity: pipelineInView ? 0.6 : 0,
                        strokeDasharray: 676,
                        strokeDashoffset: pipelineInView ? 0 : 676,
                        transition: prefersReducedMotion
                          ? "none"
                          : "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s, opacity 0.5s ease 0.3s",
                      }}
                    />

                    {/* Agent nodes on the pipeline */}
                    {agents.map((agent, i) => {
                      const cx = 112 + i * (676 / 3);
                      const isActive = activeAgent === i;
                      return (
                        <g key={agent.id}>
                          {/* Pulse ring for active node */}
                          {isActive && !prefersReducedMotion && (
                            <circle
                              cx={cx}
                              cy="50"
                              r="24"
                              fill="none"
                              stroke={agent.color}
                              strokeWidth="1.5"
                              opacity="0"
                            >
                              <animate
                                attributeName="r"
                                values="24;38;24"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                              <animate
                                attributeName="opacity"
                                values="0.5;0;0.5"
                                dur="2s"
                                repeatCount="indefinite"
                              />
                            </circle>
                          )}

                          {/* Glow behind node */}
                          <circle
                            cx={cx}
                            cy="50"
                            r="20"
                            fill={agent.color}
                            style={{
                              opacity: isActive ? 0.15 : 0,
                              filter: "blur(12px)",
                              transition: "opacity 0.5s ease",
                            }}
                          />

                          {/* Node circle */}
                          <circle
                            cx={cx}
                            cy="50"
                            r="24"
                            fill={isActive ? `${agent.color}20` : "rgba(255,255,255,0.02)"}
                            stroke={agent.color}
                            strokeWidth={isActive ? 2 : 1}
                            style={{
                              filter: isActive
                                ? `drop-shadow(0 0 10px ${agent.color}40)`
                                : "none",
                              transition: "all 0.5s ease",
                            }}
                          />

                          {/* Step number */}
                          <text
                            x={cx}
                            y="55"
                            textAnchor="middle"
                            fill={isActive ? agent.color : "rgba(255,255,255,0.4)"}
                            fontSize="14"
                            fontWeight="700"
                            style={{ transition: "fill 0.5s" }}
                          >
                            {i + 1}
                          </text>

                          {/* Label above */}
                          <text
                            x={cx}
                            y="15"
                            textAnchor="middle"
                            fill={isActive ? agent.color : "rgba(255,255,255,0.25)"}
                            fontSize="11"
                            fontWeight="600"
                            style={{ transition: "fill 0.5s" }}
                          >
                            {pipelineLabels[i]}
                          </text>

                          {/* Arrow connectors between nodes */}
                          {i < agents.length - 1 && (
                            <g>
                              <path
                                d={`M ${cx + 28} 50 L ${cx + (676 / 3) - 28} 50`}
                                fill="none"
                                stroke={
                                  isActive
                                    ? agent.color
                                    : "rgba(255,255,255,0.06)"
                                }
                                strokeWidth="1.5"
                                markerEnd={isActive ? `url(#arrow-${agent.id})` : undefined}
                                style={{ transition: "stroke 0.5s" }}
                              />
                              {/* Animated traveling packet */}
                              {isActive && !prefersReducedMotion && (
                                <circle
                                  r="3"
                                  fill={agent.color}
                                  style={{
                                    filter: `drop-shadow(0 0 6px ${agent.color})`,
                                  }}
                                >
                                  <animateMotion
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    path={`M ${cx + 28} 50 L ${cx + (676 / 3) - 28} 50`}
                                  />
                                </circle>
                              )}
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Arrow markers */}
                    <defs>
                      {agents.map((agent) => (
                        <marker
                          key={agent.id}
                          id={`arrow-${agent.id}`}
                          markerWidth="8"
                          markerHeight="8"
                          refX="6"
                          refY="4"
                          orient="auto"
                        >
                          <path
                            d="M 0 0 L 8 4 L 0 8 Z"
                            fill={agent.color}
                            opacity="0.6"
                          />
                        </marker>
                      ))}
                    </defs>
                  </svg>
                </ScrollReveal>
              </div>

              {/* Agent detail cards in 4-column grid */}
              <div className="grid grid-cols-4 gap-5">
                {agents.map((agent, i) => {
                  const isActive = activeAgent === i;
                  return (
                    <ScrollReveal key={agent.id} delay={0.3 + i * 0.12}>
                      <motion.div
                        animate={{
                          y: isActive ? -4 : 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="group relative overflow-hidden rounded-2xl border bg-surface-1 p-6 transition-[border-color,box-shadow] duration-500"
                        style={{
                          borderColor: isActive
                            ? `${agent.color}60`
                            : "rgba(255,255,255,0.06)",
                          boxShadow: isActive
                            ? `0 8px 40px ${agent.color}12, 0 0 0 1px ${agent.color}15, inset 0 1px 0 ${agent.color}10`
                            : "none",
                        }}
                      >
                        {/* Active glow overlay */}
                        <div
                          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                          style={{
                            opacity: isActive ? 1 : 0,
                            background: `radial-gradient(ellipse at 50% 0%, ${agent.color}08, transparent 70%)`,
                          }}
                        />
                        <div className="relative">
                          <div className="mb-4 flex items-center gap-3">
                            <div
                              className="flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500"
                              style={{
                                background: `${agent.color}15`,
                                boxShadow: isActive
                                  ? `0 0 20px ${agent.color}30`
                                  : "none",
                              }}
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={agent.color}
                                strokeWidth="1.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={agentIcons[agent.id]}
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-white">
                                {agent.name}
                              </h4>
                              <p
                                className="text-[10px] font-semibold uppercase tracking-wider"
                                style={{ color: agent.color }}
                              >
                                {agent.role}
                              </p>
                            </div>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-text-secondary">
                            {agent.description}
                          </p>
                          <div className="rounded-lg bg-white/[0.02] p-3">
                            <p className="text-xs italic text-text-tertiary">
                              {agent.why}
                            </p>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {agent.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors duration-300"
                                style={{
                                  background: isActive
                                    ? `${agent.color}12`
                                    : "rgba(255,255,255,0.03)",
                                  color: isActive
                                    ? agent.color
                                    : "rgba(255,255,255,0.4)",
                                }}
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Mobile: Vertical pipeline */}
            <div className="md:hidden">
              <div className="relative space-y-0">
                {agents.map((agent, i) => {
                  const isActive = activeAgent === i;
                  return (
                    <div key={agent.id} className="relative">
                      {/* Vertical connector */}
                      {i > 0 && (
                        <div className="flex justify-center py-2">
                          <div className="relative h-8 w-px">
                            <div
                              className="absolute inset-0 w-px"
                              style={{
                                background: `linear-gradient(to bottom, ${agents[i - 1].color}40, ${agent.color}40)`,
                              }}
                            />
                            {/* Animated dot */}
                            {activeAgent === i - 1 && !prefersReducedMotion && (
                              <motion.div
                                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                                style={{
                                  background: agents[i - 1].color,
                                  boxShadow: `0 0 8px ${agents[i - 1].color}`,
                                }}
                                animate={{ top: ["0%", "100%"] }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      )}

                      <ScrollReveal
                        direction="left"
                        delay={0.2 + i * 0.1}
                      >
                        <div
                          className="relative overflow-hidden rounded-2xl border bg-surface-1 p-5 transition-all duration-500"
                          style={{
                            borderColor: isActive
                              ? `${agent.color}50`
                              : "rgba(255,255,255,0.06)",
                            borderLeftWidth: "3px",
                            borderLeftColor: agent.color,
                            boxShadow: isActive
                              ? `0 4px 20px ${agent.color}10`
                              : "none",
                          }}
                        >
                          {/* Step badge */}
                          <div
                            className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                            style={{
                              background: `${agent.color}15`,
                              color: agent.color,
                            }}
                          >
                            {i + 1}
                          </div>
                          <div className="flex items-start gap-4">
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                              style={{ background: `${agent.color}15` }}
                            >
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke={agent.color}
                                strokeWidth="1.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={agentIcons[agent.id]}
                                />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-base font-bold text-white">
                                {agent.name}
                              </h4>
                              <p className="text-xs" style={{ color: agent.color }}>
                                {agent.role}
                              </p>
                              <p className="mt-1 text-sm text-text-secondary">
                                {agent.description}
                              </p>
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {agent.capabilities.map((cap) => (
                                  <span
                                    key={cap}
                                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                                    style={{
                                      background: `${agent.color}10`,
                                      color: agent.color,
                                    }}
                                  >
                                    {cap}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </GridBackground>
    </section>
  );
}
