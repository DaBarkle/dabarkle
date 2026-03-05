"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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

  useEffect(() => {
    if (!loopInView || prefersReducedMotion) return;
    const startDelay = setTimeout(() => {
      setActiveStep(0);
    }, 800);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % feedbackLoopSteps.length);
    }, 1500);
    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [loopInView, prefersReducedMotion]);

  const packetAngle =
    activeStep >= 0
      ? (activeStep / feedbackLoopSteps.length) * Math.PI * 2 - Math.PI / 2
      : -Math.PI / 2;
  const packetX = 300 + Math.cos(packetAngle) * 240;
  const packetY = 150 + Math.sin(packetAngle) * 100;
  const packetColor =
    activeStep >= 0
      ? feedbackLoopSteps[activeStep]?.color ?? "#a78bfa"
      : "#a78bfa";

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={36} color="rgba(249,115,22,0.02)">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            overline="The Optimizer"
            title="A System That Rewrites Itself"
            subtitle={`After every session, the Optimizer agent analyzes performance across four layers and auto-applies safe improvements. ${metrics.optimizationsApplied} optimizations deployed over ${metrics.sessions} sessions. It can modify orchestration flow, but cannot touch its own safety rules.`}
          />

          {/* Feedback loop */}
          <div ref={loopRef} className="relative mb-16 mt-10 sm:mt-16">
            <ScrollReveal delay={0.2}>
              <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 600 300"
                  className="w-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <ellipse
                    cx="300"
                    cy="150"
                    rx="240"
                    ry="100"
                    fill="none"
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="2"
                  />

                  {feedbackLoopSteps.map((step, i) => {
                    const angle =
                      (i / feedbackLoopSteps.length) * Math.PI * 2 -
                      Math.PI / 2;
                    const cx = 300 + Math.cos(angle) * 240;
                    const cy = 150 + Math.sin(angle) * 100;
                    const isActive = activeStep === i;
                    return (
                      <g key={step.id}>
                        {isActive && (
                          <circle
                            cx={cx}
                            cy={cy}
                            r="18"
                            fill="none"
                            stroke={step.color}
                            strokeWidth="1"
                            opacity="0.4"
                          >
                            <animate
                              attributeName="r"
                              values="18;28;18"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                            <animate
                              attributeName="opacity"
                              values="0.4;0;0.4"
                              dur="1.5s"
                              repeatCount="indefinite"
                            />
                          </circle>
                        )}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isActive ? 18 : 14}
                          fill={
                            isActive
                              ? step.color + "30"
                              : "rgba(255,255,255,0.02)"
                          }
                          stroke={step.color}
                          strokeWidth={isActive ? 2 : 1}
                          style={{
                            filter: isActive
                              ? `drop-shadow(0 0 12px ${step.color}60)`
                              : "none",
                            transition: "all 0.5s ease",
                          }}
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r="3"
                          fill={step.color}
                          style={{
                            opacity: isActive ? 1 : 0.3,
                            transition: "opacity 0.5s",
                          }}
                        />
                        <text
                          x={cx}
                          y={cy + (cy > 150 ? 30 : -24)}
                          textAnchor="middle"
                          fill={
                            isActive ? step.color : "rgba(255,255,255,0.3)"
                          }
                          fontSize="10"
                          fontWeight={isActive ? "600" : "400"}
                          style={{ transition: "fill 0.5s" }}
                        >
                          {step.label}
                        </text>
                        {step.id === "risk" && (
                          <g>
                            <rect
                              x={cx + 24}
                              y={cy - 18}
                              width="72"
                              height="14"
                              rx="3"
                              fill="rgba(52, 211, 153, 0.1)"
                            />
                            <text
                              x={cx + 30}
                              y={cy - 8}
                              fill="rgba(52, 211, 153, 0.7)"
                              fontSize="9"
                              className="font-mono"
                            >
                              LOW &rarr; auto
                            </text>
                            <rect
                              x={cx + 24}
                              y={cy - 2}
                              width="72"
                              height="14"
                              rx="3"
                              fill="rgba(251, 191, 36, 0.1)"
                            />
                            <text
                              x={cx + 30}
                              y={cy + 8}
                              fill="rgba(251, 191, 36, 0.5)"
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

                  {/* Traveling packet */}
                  {loopInView && activeStep >= 0 && !prefersReducedMotion && (
                    <>
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r="5"
                        fill={packetColor}
                        style={{
                          filter: `drop-shadow(0 0 10px ${packetColor})`,
                          transition:
                            "cx 0.6s ease-in-out, cy 0.6s ease-in-out, fill 0.3s",
                        }}
                      />
                      <circle
                        cx={packetX}
                        cy={packetY}
                        r="14"
                        fill={packetColor}
                        opacity="0.12"
                        style={{
                          filter: "blur(8px)",
                          transition:
                            "cx 0.6s ease-in-out, cy 0.6s ease-in-out",
                        }}
                      />
                    </>
                  )}

                  <text
                    x="300"
                    y="145"
                    textAnchor="middle"
                    fill="white"
                    fontSize="32"
                    fontWeight="bold"
                    style={{
                      opacity: loopInView ? 1 : 0,
                      transition: "opacity 0.5s ease 0.8s",
                    }}
                  >
                    {metrics.optimizationsApplied}
                  </text>
                  <text
                    x="300"
                    y="168"
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.3)"
                    fontSize="10"
                    style={{
                      opacity: loopInView ? 1 : 0,
                      transition: "opacity 0.5s ease 1s",
                    }}
                  >
                    optimizations deployed
                  </text>
                </svg>
              </div>
            </ScrollReveal>
          </div>

          {/* Highlight optimizations - GlowingStarsCards */}
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
              <div className="absolute top-5 left-0 right-0 h-px bg-white/[0.04] hidden sm:block">
                <div
                  className="h-full bg-gradient-to-r from-accent-500 to-brand-500 transition-all ease-out"
                  style={{
                    width: timelineInView ? "100%" : "0%",
                    transitionDuration: "1.5s",
                  }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2">
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
                      <span className="mt-1 text-center text-[10px] text-text-tertiary leading-tight">
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
