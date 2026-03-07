"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { GridBackground } from "@/components/aceternity/grid-background";
import {
  metrics,
  timeline,
  feedbackLoopSteps,
  highlightOptimizations,
} from "@/data/hermes";

export function SelfImprovement() {
  const loopRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const loopInView = useInView(loopRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  useEffect(() => {
    if (!loopInView || prefersReducedMotion) return;
    const startDelay = setTimeout(() => {
      setActiveStep(0);
    }, 600);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % feedbackLoopSteps.length);
    }, 2000);
    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [loopInView, prefersReducedMotion]);

  // Calculate positions for the orbital ring
  const totalSteps = feedbackLoopSteps.length;
  const svgW = 600;
  const svgH = 340;
  const cx = svgW / 2;
  const cy = svgH / 2;
  const rx = 230;
  const ry = 120;

  function getStepPos(i: number) {
    const angle = (i / totalSteps) * Math.PI * 2 - Math.PI / 2;
    return {
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    };
  }

  // Build the ellipse path for the traveling packet
  const ellipsePath = `M ${cx} ${cy - ry} A ${rx} ${ry} 0 1 1 ${cx - 0.01} ${cy - ry}`;

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={36} color="rgba(249,115,22,0.02)">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            overline="The Optimizer"
            title="A System That Rewrites Itself"
            subtitle={`After every session, the Optimizer agent analyzes performance across four layers and auto-applies safe improvements. ${metrics.optimizationsApplied} optimizations deployed over ${metrics.sessions} sessions. It can modify orchestration flow, but cannot touch its own safety rules.`}
          />

          {/* Feedback loop visualization */}
          <div ref={loopRef} className="relative mb-16 mt-10 sm:mt-16">
            <ScrollReveal delay={0.2}>
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-4 backdrop-blur-sm sm:p-6">
                <svg
                  aria-hidden="true"
                  viewBox={`0 0 ${svgW} ${svgH}`}
                  className="w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    {/* Orbital gradient */}
                    <linearGradient id="orbitGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(167,139,250,0.3)" />
                      <stop offset="33%" stopColor="rgba(251,191,36,0.3)" />
                      <stop offset="66%" stopColor="rgba(52,211,153,0.3)" />
                      <stop offset="100%" stopColor="rgba(167,139,250,0.3)" />
                    </linearGradient>
                    {/* Glow filter */}
                    <filter id="nodeGlow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Orbital ring - subtle background */}
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="1.5"
                  />

                  {/* Orbital ring - animated gradient overlay */}
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="url(#orbitGrad)"
                    strokeWidth="1.5"
                    style={{
                      opacity: loopInView ? 0.5 : 0,
                      transition: "opacity 1s ease 0.5s",
                    }}
                  />

                  {/* Connection lines between sequential steps */}
                  {feedbackLoopSteps.map((step, i) => {
                    const current = getStepPos(i);
                    const next = getStepPos((i + 1) % totalSteps);
                    const isActiveConnection = activeStep === i;
                    return (
                      <line
                        key={`conn-${step.id}`}
                        x1={current.x}
                        y1={current.y}
                        x2={next.x}
                        y2={next.y}
                        stroke={step.color}
                        strokeWidth={isActiveConnection ? 1.5 : 0.5}
                        style={{
                          opacity: isActiveConnection ? 0.4 : 0.06,
                          transition: "all 0.6s ease",
                        }}
                      />
                    );
                  })}

                  {/* Step nodes */}
                  {feedbackLoopSteps.map((step, i) => {
                    const pos = getStepPos(i);
                    const isActive = activeStep === i;
                    const isHovered = hoveredStep === i;
                    const nodeRadius = isActive ? 22 : isHovered ? 20 : 16;

                    return (
                      <g
                        key={step.id}
                        onMouseEnter={() => setHoveredStep(i)}
                        onMouseLeave={() => setHoveredStep(null)}
                        style={{ cursor: "default" }}
                      >
                        {/* Pulse ring */}
                        {isActive && !prefersReducedMotion && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={nodeRadius}
                            fill="none"
                            stroke={step.color}
                            strokeWidth="1.5"
                          >
                            <animate
                              attributeName="r"
                              values={`${nodeRadius};${nodeRadius + 14};${nodeRadius}`}
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

                        {/* Glow */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={nodeRadius + 4}
                          fill={step.color}
                          style={{
                            opacity: isActive ? 0.12 : 0,
                            filter: "blur(10px)",
                            transition: "opacity 0.5s",
                          }}
                        />

                        {/* Node background */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={nodeRadius}
                          fill={isActive ? `${step.color}25` : isHovered ? `${step.color}12` : "rgba(10,10,10,0.8)"}
                          stroke={step.color}
                          strokeWidth={isActive ? 2 : 1}
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 12px ${step.color}50)`
                              : "none",
                            transition: "all 0.5s ease",
                          }}
                        />

                        {/* Inner dot */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={isActive ? 5 : 3}
                          fill={step.color}
                          style={{
                            opacity: isActive ? 1 : 0.4,
                            transition: "all 0.5s",
                          }}
                        />

                        {/* Label */}
                        <text
                          x={pos.x}
                          y={pos.y + (pos.y > cy ? nodeRadius + 16 : -(nodeRadius + 8))}
                          textAnchor="middle"
                          fill={isActive ? step.color : isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)"}
                          fontSize="10"
                          fontWeight={isActive ? "600" : "400"}
                          style={{ transition: "fill 0.4s" }}
                        >
                          {step.label}
                        </text>

                        {/* Risk assessment annotation */}
                        {step.id === "risk" && isActive && (
                          <g style={{ opacity: 0.9 }}>
                            <rect
                              x={pos.x + 28}
                              y={pos.y - 18}
                              width="72"
                              height="14"
                              rx="4"
                              fill="rgba(52, 211, 153, 0.12)"
                            />
                            <text
                              x={pos.x + 34}
                              y={pos.y - 8}
                              fill="rgba(52, 211, 153, 0.8)"
                              fontSize="9"
                              className="font-mono"
                            >
                              LOW &rarr; auto
                            </text>
                            <rect
                              x={pos.x + 28}
                              y={pos.y - 2}
                              width="72"
                              height="14"
                              rx="4"
                              fill="rgba(251, 191, 36, 0.1)"
                            />
                            <text
                              x={pos.x + 34}
                              y={pos.y + 8}
                              fill="rgba(251, 191, 36, 0.6)"
                              fontSize="9"
                              className="font-mono"
                            >
                              MED+ &rarr; log
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Traveling packet on the elliptical orbit */}
                  {loopInView && activeStep >= 0 && !prefersReducedMotion && (
                    <g>
                      <circle
                        r="5"
                        fill={feedbackLoopSteps[activeStep >= 0 ? activeStep : 0]?.color ?? "#a78bfa"}
                        style={{
                          filter: `drop-shadow(0 0 10px ${feedbackLoopSteps[activeStep >= 0 ? activeStep : 0]?.color ?? "#a78bfa"})`,
                        }}
                      >
                        <animateMotion
                          dur={`${totalSteps * 2}s`}
                          repeatCount="indefinite"
                          path={ellipsePath}
                        />
                      </circle>
                      <circle
                        r="12"
                        fill={feedbackLoopSteps[activeStep >= 0 ? activeStep : 0]?.color ?? "#a78bfa"}
                        opacity="0.1"
                        style={{ filter: "blur(6px)" }}
                      >
                        <animateMotion
                          dur={`${totalSteps * 2}s`}
                          repeatCount="indefinite"
                          path={ellipsePath}
                        />
                      </circle>
                    </g>
                  )}

                  {/* Center metrics */}
                  <text
                    x={cx}
                    y={cy - 8}
                    textAnchor="middle"
                    fill="white"
                    fontSize="38"
                    fontWeight="bold"
                    style={{
                      opacity: loopInView ? 1 : 0,
                      transition: "opacity 0.6s ease 0.8s",
                    }}
                  >
                    {metrics.optimizationsApplied}
                  </text>
                  <text
                    x={cx}
                    y={cy + 16}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.3)"
                    fontSize="11"
                    style={{
                      opacity: loopInView ? 1 : 0,
                      transition: "opacity 0.6s ease 1s",
                    }}
                  >
                    optimizations deployed
                  </text>
                </svg>

                {/* Step indicator dots below the diagram */}
                <div className="mt-2 flex justify-center gap-1.5">
                  {feedbackLoopSteps.map((step, i) => (
                    <div
                      key={step.id}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: activeStep === i ? 20 : 6,
                        background:
                          activeStep === i
                            ? step.color
                            : "rgba(255,255,255,0.1)",
                        boxShadow:
                          activeStep === i
                            ? `0 0 8px ${step.color}50`
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlight optimizations */}
          <ScrollReveal delay={0.4} className="mb-16">
            <h3 className="mb-8 text-center text-h3 text-white">
              Most Impactful Optimizations
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              {highlightOptimizations.map((opt, i) => (
                <ScrollReveal key={opt.id} delay={0.5 + i * 0.1}>
                  <GlowingStarsCard className="h-full">
                    <p className="mb-1 font-mono text-3xl font-bold text-white">
                      {opt.metric}
                    </p>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent-400">
                      {opt.metricLabel}
                    </p>
                    <h4 className="mb-2 text-sm font-semibold text-white">
                      {opt.label}
                    </h4>
                    <p className="text-xs leading-relaxed text-text-tertiary">
                      {opt.description}
                    </p>
                  </GlowingStarsCard>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>

          {/* Evolution timeline */}
          <div ref={timelineRef}>
            <h3 className="mb-8 text-center text-h3 text-white">
              Evolution Timeline
            </h3>
            <div className="relative mx-auto max-w-3xl">
              {/* Horizontal line - desktop */}
              <div className="absolute top-5 left-0 right-0 hidden h-px bg-white/[0.04] sm:block">
                <div
                  className="h-full bg-gradient-to-r from-accent-500 to-brand-500 transition-all ease-out"
                  style={{
                    width: timelineInView ? "100%" : "0%",
                    transitionDuration: "1.5s",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-5 sm:gap-2">
                {timeline.map((milestone, i) => (
                  <ScrollReveal
                    key={milestone.version}
                    delay={0.4 + i * 0.15}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className="relative z-10 h-3 w-3 rounded-full transition-all duration-500"
                        style={{
                          background: timelineInView
                            ? i === timeline.length - 1
                              ? "#fb923c"
                              : "#a78bfa"
                            : "rgba(255,255,255,0.1)",
                          boxShadow: timelineInView
                            ? `0 0 12px ${i === timeline.length - 1 ? "#fb923c" : "#a78bfa"}60`
                            : "none",
                          transitionDelay: `${i * 200 + 800}ms`,
                        }}
                      />
                      <span className="mt-3 font-mono text-xs font-semibold text-white">
                        {milestone.version}
                      </span>
                      <span className="mt-1 text-center text-[10px] leading-tight text-text-tertiary">
                        {milestone.label}
                      </span>
                      <span className="mt-0.5 text-center text-[9px] text-text-muted">
                        {milestone.date}
                      </span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Guardrails callout */}
          <ScrollReveal
            delay={0.6}
            className="mx-auto mt-12 max-w-2xl rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-5 text-center"
          >
            <p className="text-sm text-amber-400/80">
              Kill switch:{" "}
              <code className="rounded bg-surface-1 px-1.5 py-0.5 font-mono text-xs">
                touch .claude/optimizer/DISABLED
              </code>
              . Every optimization creates a backup for instant rollback. 0
              failed deployments. 0 manual reverts needed.
            </p>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
