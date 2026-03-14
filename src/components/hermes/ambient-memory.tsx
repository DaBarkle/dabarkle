"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { memoryLayers, memoryLifecycle } from "@/data/hermes";

export function AmbientMemory() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!pipelineInView || prefersReducedMotion) {
      if (pipelineInView && prefersReducedMotion) {
        // Show all steps immediately when reduced motion is preferred
        setActiveStep(memoryLifecycle.length - 1);
      }
      return;
    }

    let currentStep = 0;
    const startDelay = setTimeout(() => {
      setActiveStep(0);
      currentStep = 0;
    }, 400);

    const interval = setInterval(() => {
      currentStep += 1;
      if (currentStep >= memoryLifecycle.length) {
        clearInterval(interval);
        return;
      }
      setActiveStep(currentStep);
    }, 600);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
    };
  }, [pipelineInView, prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <BackgroundBeams />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          overline="Memory System"
          title="Three Layers of Memory"
          subtitle="Continuous memory capture across three layers -- from lightweight ambient entries to semantic vector search -- ensures nothing learned is ever lost."
        />

        {/* 3-Layer stacked cards */}
        <ScrollReveal delay={0.15} className="mt-10 sm:mt-14">
          <div className="mx-auto max-w-2xl space-y-[-8px]">
            {memoryLayers.map((layer, i) => (
              <ScrollReveal key={layer.id} delay={0.2 + i * 0.12}>
                <div
                  className="relative rounded-xl border p-5 transition-all duration-300 hover:scale-[1.01]"
                  style={{
                    borderColor: `${layer.color}20`,
                    background: `linear-gradient(135deg, ${layer.color}06, rgba(5,5,5,0.95))`,
                    marginLeft: `${i * 16}px`,
                    marginRight: `${(memoryLayers.length - 1 - i) * 16}px`,
                    zIndex: memoryLayers.length - i,
                    position: "relative",
                  }}
                >
                  <div className="flex items-start gap-4">
                    {/* Level indicator */}
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-mono text-lg font-bold"
                      style={{
                        color: layer.color,
                        background: `${layer.color}12`,
                        border: `1px solid ${layer.color}20`,
                        boxShadow: `0 0 16px ${layer.color}10`,
                      }}
                    >
                      {layer.level}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3
                          className="text-sm font-semibold"
                          style={{ color: layer.color }}
                        >
                          {layer.label}
                        </h3>
                        <div
                          className="h-px flex-1"
                          style={{
                            background: `linear-gradient(to right, ${layer.color}20, transparent)`,
                          }}
                        />
                      </div>
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {layer.description}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {layer.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>

        {/* Memory lifecycle pipeline */}
        <div ref={pipelineRef} className="mt-16">
          <h3 className="mb-8 text-center text-h3 text-white">
            Memory Lifecycle
          </h3>

          <ScrollReveal delay={0.2}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm sm:p-8">
              {/* Desktop: Horizontal pipeline */}
              <div className="hidden sm:block">
                <div className="flex items-start justify-between">
                  {memoryLifecycle.map((step, i) => {
                    const isActive = i <= activeStep;
                    const isCurrentStep = i === activeStep;
                    return (
                      <div
                        key={step.step}
                        className="flex flex-1 flex-col items-center"
                      >
                        <div className="flex w-full items-center">
                          {/* Arrow connector before (skip for first) */}
                          {i > 0 && (
                            <div className="relative h-px flex-1">
                              <div className="absolute inset-0 bg-white/[0.04]" />
                              <motion.div
                                className="absolute inset-y-0 left-0"
                                initial={{ width: "0%" }}
                                animate={
                                  i <= activeStep
                                    ? { width: "100%" }
                                    : { width: "0%" }
                                }
                                transition={{
                                  duration: prefersReducedMotion ? 0 : 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{
                                  background: `linear-gradient(to right, ${memoryLifecycle[i - 1].color}60, ${step.color}60)`,
                                  boxShadow: isActive
                                    ? `0 0 8px ${step.color}30`
                                    : "none",
                                }}
                              />
                            </div>
                          )}

                          {/* Step circle */}
                          <motion.div
                            className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold transition-all duration-500"
                            animate={{
                              background: isActive
                                ? `${step.color}20`
                                : "rgba(255,255,255,0.03)",
                              borderColor: isActive
                                ? `${step.color}50`
                                : "rgba(255,255,255,0.06)",
                              color: isActive
                                ? step.color
                                : "rgba(255,255,255,0.2)",
                              boxShadow: isCurrentStep
                                ? `0 0 20px ${step.color}30`
                                : "none",
                            }}
                            style={{
                              border: "1.5px solid",
                            }}
                          >
                            {step.step}
                          </motion.div>

                          {/* Arrow connector after (skip for last) */}
                          {i < memoryLifecycle.length - 1 && (
                            <div className="relative h-px flex-1">
                              <div className="absolute inset-0 bg-white/[0.04]" />
                              <motion.div
                                className="absolute inset-y-0 left-0"
                                initial={{ width: "0%" }}
                                animate={
                                  i < activeStep
                                    ? { width: "100%" }
                                    : { width: "0%" }
                                }
                                transition={{
                                  duration: prefersReducedMotion ? 0 : 0.4,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                                style={{
                                  background: `linear-gradient(to right, ${step.color}60, ${memoryLifecycle[i + 1].color}60)`,
                                }}
                              />
                              {/* Arrow head */}
                              <svg
                                className="absolute -right-1 top-1/2 -translate-y-1/2"
                                width="6"
                                height="8"
                                viewBox="0 0 6 8"
                                fill="none"
                              >
                                <path
                                  d="M1 1L5 4L1 7"
                                  stroke={
                                    i < activeStep
                                      ? `${memoryLifecycle[i + 1].color}80`
                                      : "rgba(255,255,255,0.08)"
                                  }
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ transition: "stroke 0.5s ease" }}
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Label + description */}
                        <div className="mt-3 w-full px-1 text-center">
                          <span
                            className="text-xs font-semibold transition-colors duration-500"
                            style={{
                              color: isActive
                                ? step.color
                                : "rgba(255,255,255,0.25)",
                            }}
                          >
                            {step.label}
                          </span>
                          <p
                            className="mt-1 text-[10px] leading-snug transition-colors duration-500"
                            style={{
                              color: isActive
                                ? "rgba(255,255,255,0.45)"
                                : "rgba(255,255,255,0.15)",
                            }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile: Vertical pipeline */}
              <div className="sm:hidden">
                <div className="space-y-0">
                  {memoryLifecycle.map((step, i) => {
                    const isActive = i <= activeStep;
                    const isCurrentStep = i === activeStep;
                    return (
                      <div key={step.step}>
                        {/* Vertical connector */}
                        {i > 0 && (
                          <div className="flex justify-start pl-[18px]">
                            <div className="relative h-6 w-px">
                              <div className="absolute inset-0 bg-white/[0.06]" />
                              <motion.div
                                className="absolute inset-x-0 top-0"
                                initial={{ height: "0%" }}
                                animate={
                                  isActive
                                    ? { height: "100%" }
                                    : { height: "0%" }
                                }
                                transition={{
                                  duration: prefersReducedMotion ? 0 : 0.3,
                                }}
                                style={{
                                  background: step.color,
                                  boxShadow: isActive
                                    ? `0 0 6px ${step.color}40`
                                    : "none",
                                }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Step row */}
                        <motion.div
                          className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500"
                          animate={{
                            borderColor: isCurrentStep
                              ? `${step.color}40`
                              : "rgba(255,255,255,0.04)",
                            backgroundColor: isCurrentStep
                              ? `${step.color}08`
                              : "transparent",
                          }}
                        >
                          <div
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-500"
                            style={{
                              background: isActive
                                ? `${step.color}20`
                                : "rgba(255,255,255,0.03)",
                              color: isActive
                                ? step.color
                                : "rgba(255,255,255,0.3)",
                              boxShadow: isCurrentStep
                                ? `0 0 12px ${step.color}30`
                                : "none",
                            }}
                          >
                            {step.step}
                          </div>
                          <div className="min-w-0 flex-1">
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
                            <p
                              className="mt-0.5 text-[10px] leading-snug transition-colors duration-500"
                              style={{
                                color: isActive
                                  ? "rgba(255,255,255,0.45)"
                                  : "rgba(255,255,255,0.15)",
                              }}
                            >
                              {step.desc}
                            </p>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step progress dots */}
              <div className="mt-5 flex justify-center gap-1.5">
                {memoryLifecycle.map((step, i) => (
                  <div
                    key={step.step}
                    className="h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeStep ? 20 : 6,
                      background:
                        i <= activeStep
                          ? step.color
                          : "rgba(255,255,255,0.1)",
                      boxShadow:
                        i === activeStep
                          ? `0 0 8px ${step.color}50`
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
