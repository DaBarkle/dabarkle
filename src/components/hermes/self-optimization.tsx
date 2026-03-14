"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { GridBackground } from "@/components/aceternity/grid-background";
import {
  metrics,
  timeline,
  feedbackLoopSteps,
  highlightOptimizations,
} from "@/data/hermes";

const analysisLayers = [
  {
    label: "Strategic",
    description: "Cross-session patterns and system-wide improvements",
    color: "#6366f1",
    width: "40%",
  },
  {
    label: "Flow",
    description: "Pipeline routing efficiency and tier optimization",
    color: "#818cf8",
    width: "58%",
  },
  {
    label: "Agent",
    description: "Per-agent performance, token usage, and error rates",
    color: "#a5b4fc",
    width: "76%",
  },
  {
    label: "Telemetry",
    description: "Raw timing, token counts, and session metadata",
    color: "#c7d2fe",
    width: "94%",
  },
];

export function SelfOptimization() {
  const loopRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const loopInView = useInView(loopRef, { once: true, margin: "-100px" });
  const timelineInView = useInView(timelineRef, {
    once: true,
    margin: "-100px",
  });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

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

  const totalSteps = feedbackLoopSteps.length;

  // Desktop: circular layout positions
  const circleR = 160;
  const svgSize = 440;
  const center = svgSize / 2;

  function getPos(i: number) {
    const angle = (i / totalSteps) * Math.PI * 2 - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * circleR,
      y: center + Math.sin(angle) * circleR,
    };
  }

  // Build arc path for the traveling energy packet
  const arcPath = (() => {
    const pts = Array.from({ length: totalSteps + 1 }, (_, i) =>
      getPos(i % totalSteps)
    );
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      d += ` L ${pts[i].x} ${pts[i].y}`;
    }
    return d;
  })();

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={36} color="rgba(99,102,241,0.02)">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            overline="The Optimizer"
            title="A System That Rewrites Itself"
            subtitle={`After every session, the Optimizer agent analyzes performance across four layers and auto-applies safe improvements. ${metrics.optimizationsApplied} optimizations deployed over ${metrics.sessions} sessions. It can modify orchestration flow, but cannot touch its own safety rules.`}
          />

          {/* 4-Layer Analysis Pyramid */}
          <ScrollReveal delay={0.15} className="mb-16 mt-10 sm:mt-16">
            <h3 className="mb-8 text-center text-h3 text-white">
              4-Layer Analysis
            </h3>
            <div className="mx-auto max-w-2xl space-y-3">
              {analysisLayers.map((layer, i) => (
                <ScrollReveal key={layer.label} delay={0.2 + i * 0.1}>
                  <div className="flex flex-col items-center">
                    <div
                      className="relative rounded-lg border px-4 py-3 text-center transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        width: layer.width,
                        borderColor: `${layer.color}30`,
                        background: `linear-gradient(135deg, ${layer.color}08, ${layer.color}03)`,
                      }}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full"
                            style={{
                              background: layer.color,
                              boxShadow: `0 0 8px ${layer.color}60`,
                            }}
                          />
                          <span
                            className="text-sm font-semibold"
                            style={{ color: layer.color }}
                          >
                            {layer.label}
                          </span>
                        </div>
                        <span className="text-xs text-text-tertiary">
                          {layer.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
              <p className="pt-2 text-center text-[10px] uppercase tracking-widest text-text-muted">
                Top = most strategic, bottom = raw data
              </p>
            </div>
          </ScrollReveal>

          {/* Feedback loop visualization */}
          <div ref={loopRef} className="relative mb-16">
            <h3 className="mb-8 text-center text-h3 text-white">
              Continuous Feedback Loop
            </h3>
            <ScrollReveal delay={0.2}>
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm sm:p-8">
                {/* Desktop: Circular orbital layout */}
                <div className="hidden sm:block">
                  <svg
                    aria-hidden="true"
                    viewBox={`0 0 ${svgSize} ${svgSize}`}
                    className="mx-auto w-full max-w-md"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <defs>
                      <linearGradient
                        id="orbitGrad2"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgba(129,140,248,0.3)"
                        />
                        <stop
                          offset="33%"
                          stopColor="rgba(251,191,36,0.3)"
                        />
                        <stop
                          offset="66%"
                          stopColor="rgba(45,212,191,0.3)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(129,140,248,0.3)"
                        />
                      </linearGradient>
                    </defs>

                    {/* Orbital ring */}
                    <circle
                      cx={center}
                      cy={center}
                      r={circleR}
                      fill="none"
                      stroke="rgba(255,255,255,0.03)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={center}
                      cy={center}
                      r={circleR}
                      fill="none"
                      stroke="url(#orbitGrad2)"
                      strokeWidth="1.5"
                      style={{
                        opacity: loopInView ? 0.4 : 0,
                        transition: "opacity 1s ease 0.5s",
                      }}
                    />

                    {/* Connection arcs between sequential steps */}
                    {feedbackLoopSteps.map((step, i) => {
                      const current = getPos(i);
                      const next = getPos((i + 1) % totalSteps);
                      const isActive = activeStep === i;
                      return (
                        <g key={`conn-${step.id}`}>
                          {/* Glow on active */}
                          {isActive && (
                            <line
                              x1={current.x}
                              y1={current.y}
                              x2={next.x}
                              y2={next.y}
                              stroke={step.color}
                              strokeWidth="4"
                              style={{ opacity: 0.15, filter: "blur(3px)" }}
                            />
                          )}
                          <line
                            x1={current.x}
                            y1={current.y}
                            x2={next.x}
                            y2={next.y}
                            stroke={step.color}
                            strokeWidth={isActive ? 2 : 0.5}
                            style={{
                              opacity: isActive ? 0.5 : 0.06,
                              transition: "all 0.6s ease",
                            }}
                          />
                        </g>
                      );
                    })}

                    {/* Step nodes */}
                    {feedbackLoopSteps.map((step, i) => {
                      const pos = getPos(i);
                      const isActive = activeStep === i;
                      const nodeR = isActive ? 24 : 18;

                      return (
                        <g key={step.id}>
                          {/* Pulse ring */}
                          {isActive && !prefersReducedMotion && (
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r={nodeR}
                              fill="none"
                              stroke={step.color}
                              strokeWidth="1.5"
                            >
                              <animate
                                attributeName="r"
                                values={`${nodeR};${nodeR + 16};${nodeR}`}
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
                            r={nodeR + 6}
                            fill={step.color}
                            style={{
                              opacity: isActive ? 0.15 : 0,
                              filter: "blur(12px)",
                              transition: "opacity 0.5s",
                            }}
                          />

                          {/* Node bg */}
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={nodeR}
                            fill={
                              isActive
                                ? `${step.color}20`
                                : "rgba(10,10,10,0.8)"
                            }
                            stroke={step.color}
                            strokeWidth={isActive ? 2 : 1}
                            style={{
                              filter: isActive
                                ? `drop-shadow(0 0 14px ${step.color}50)`
                                : "none",
                              transition: "all 0.5s ease",
                            }}
                          />

                          {/* Step number inside */}
                          <text
                            x={pos.x}
                            y={pos.y + 4}
                            textAnchor="middle"
                            fill={
                              isActive ? step.color : "rgba(255,255,255,0.3)"
                            }
                            fontSize={isActive ? "13" : "11"}
                            fontWeight="700"
                            style={{ transition: "all 0.4s" }}
                          >
                            {i + 1}
                          </text>

                          {/* Label */}
                          <text
                            x={pos.x}
                            y={
                              pos.y +
                              (pos.y > center ? nodeR + 18 : -(nodeR + 8))
                            }
                            textAnchor="middle"
                            fill={
                              isActive ? step.color : "rgba(255,255,255,0.25)"
                            }
                            fontSize="10"
                            fontWeight={isActive ? "600" : "400"}
                            style={{ transition: "fill 0.4s" }}
                          >
                            {step.label}
                          </text>

                          {/* Risk assessment callout */}
                          {step.id === "risk" && isActive && (
                            <g style={{ opacity: 0.9 }}>
                              <rect
                                x={pos.x + 30}
                                y={pos.y - 20}
                                width="76"
                                height="16"
                                rx="4"
                                fill="rgba(20, 184, 166, 0.12)"
                              />
                              <text
                                x={pos.x + 36}
                                y={pos.y - 8}
                                fill="rgba(20, 184, 166, 0.8)"
                                fontSize="9"
                                className="font-mono"
                              >
                                LOW: auto-apply
                              </text>
                              <rect
                                x={pos.x + 30}
                                y={pos.y}
                                width="76"
                                height="16"
                                rx="4"
                                fill="rgba(251, 191, 36, 0.1)"
                              />
                              <text
                                x={pos.x + 36}
                                y={pos.y + 12}
                                fill="rgba(251, 191, 36, 0.6)"
                                fontSize="9"
                                className="font-mono"
                              >
                                MED+: log only
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* Traveling energy packet */}
                    {loopInView && activeStep >= 0 && !prefersReducedMotion && (
                      <g>
                        <circle
                          r="5"
                          fill={
                            feedbackLoopSteps[Math.max(0, activeStep)]?.color ??
                            "#818cf8"
                          }
                          style={{
                            filter: `drop-shadow(0 0 12px ${feedbackLoopSteps[Math.max(0, activeStep)]?.color ?? "#818cf8"})`,
                          }}
                        >
                          <animateMotion
                            dur={`${totalSteps * 2}s`}
                            repeatCount="indefinite"
                            path={arcPath}
                          />
                        </circle>
                        <circle
                          r="14"
                          fill={
                            feedbackLoopSteps[Math.max(0, activeStep)]?.color ??
                            "#818cf8"
                          }
                          opacity="0.08"
                          style={{ filter: "blur(6px)" }}
                        >
                          <animateMotion
                            dur={`${totalSteps * 2}s`}
                            repeatCount="indefinite"
                            path={arcPath}
                          />
                        </circle>
                      </g>
                    )}

                    {/* Center content */}
                    <text
                      x={center}
                      y={center - 10}
                      textAnchor="middle"
                      fill="white"
                      fontSize="42"
                      fontWeight="bold"
                      style={{
                        opacity: loopInView ? 1 : 0,
                        transition: "opacity 0.6s ease 0.8s",
                      }}
                    >
                      {metrics.optimizationsApplied}
                    </text>
                    <text
                      x={center}
                      y={center + 14}
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
                </div>

                {/* Mobile: Vertical step list */}
                <div className="sm:hidden">
                  <div className="mb-6 text-center">
                    <span className="font-mono text-4xl font-bold text-white">
                      {metrics.optimizationsApplied}
                    </span>
                    <p className="mt-1 text-xs text-text-tertiary">
                      optimizations deployed
                    </p>
                  </div>
                  <div className="space-y-0">
                    {feedbackLoopSteps.map((step, i) => {
                      const isActive = activeStep === i;
                      return (
                        <div key={step.id}>
                          {i > 0 && (
                            <div className="flex justify-center">
                              <div
                                className="h-6 w-px transition-all duration-500"
                                style={{
                                  background: isActive
                                    ? step.color
                                    : "rgba(255,255,255,0.06)",
                                  boxShadow: isActive
                                    ? `0 0 6px ${step.color}40`
                                    : "none",
                                }}
                              />
                            </div>
                          )}
                          <motion.div
                            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500"
                            animate={{
                              borderColor: isActive
                                ? `${step.color}50`
                                : "rgba(255,255,255,0.04)",
                              backgroundColor: isActive
                                ? `${step.color}08`
                                : "transparent",
                            }}
                          >
                            <div
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-500"
                              style={{
                                background: isActive
                                  ? `${step.color}20`
                                  : "rgba(255,255,255,0.03)",
                                color: isActive
                                  ? step.color
                                  : "rgba(255,255,255,0.3)",
                                boxShadow: isActive
                                  ? `0 0 12px ${step.color}30`
                                  : "none",
                              }}
                            >
                              {i + 1}
                            </div>
                            <span
                              className="text-sm font-medium transition-colors duration-500"
                              style={{
                                color: isActive
                                  ? step.color
                                  : "rgba(255,255,255,0.4)",
                              }}
                            >
                              {step.label}
                            </span>
                          </motion.div>
                        </div>
                      );
                    })}
                    {/* Cycle return indicator */}
                    <div className="flex justify-center pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        continuous cycle
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step indicator dots */}
                <div className="mt-4 flex justify-center gap-1.5">
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
                  <CardSpotlight
                    className="h-full"
                    spotlightColor="rgba(99, 102, 241, 0.08)"
                  >
                    <div className="p-5">
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
                    </div>
                  </CardSpotlight>
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
              <div className="absolute top-5 right-0 left-0 hidden h-px bg-white/[0.04] sm:block">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-500 to-brand-500"
                  initial={{ width: "0%" }}
                  animate={
                    timelineInView ? { width: "100%" } : { width: "0%" }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0 : 1.5,
                    ease: [0.22, 1, 0.36, 1],
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
                      <motion.div
                        className="relative z-10 h-3.5 w-3.5 rounded-full"
                        initial={{
                          background: "rgba(255,255,255,0.1)",
                          boxShadow: "none",
                        }}
                        animate={
                          timelineInView
                            ? {
                                background:
                                  i === timeline.length - 1
                                    ? "#fbbf24"
                                    : "#818cf8",
                                boxShadow: `0 0 14px ${
                                  i === timeline.length - 1
                                    ? "#fbbf24"
                                    : "#818cf8"
                                }60`,
                              }
                            : {}
                        }
                        transition={{
                          duration: 0.5,
                          delay: i * 0.2 + 0.8,
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
