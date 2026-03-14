"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { memoryDataFlow } from "@/data/hermes";

export function MemoryDataFlow() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!pipelineInView || prefersReducedMotion) {
      if (pipelineInView && prefersReducedMotion) {
        setActiveStep(memoryDataFlow.length - 1);
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
      if (currentStep >= memoryDataFlow.length) {
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
    <div ref={pipelineRef}>
      <ScrollReveal delay={0.2}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/[0.06] bg-surface-0/50 p-6 backdrop-blur-sm sm:p-8">
          {/* Desktop: Horizontal pipeline */}
          <div className="hidden sm:block">
            <div className="flex items-start justify-between">
              {memoryDataFlow.map((step, i) => {
                const isActive = i <= activeStep;
                const isCurrentStep = i === activeStep;
                return (
                  <div
                    key={step.step}
                    className="flex flex-1 flex-col items-center"
                  >
                    <div className="flex w-full items-center">
                      {/* Connector before */}
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
                              background: `linear-gradient(to right, ${memoryDataFlow[i - 1].color}60, ${step.color}60)`,
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
                        style={{ border: "1.5px solid" }}
                      >
                        {step.step}
                      </motion.div>

                      {/* Connector after */}
                      {i < memoryDataFlow.length - 1 && (
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
                              background: `linear-gradient(to right, ${step.color}60, ${memoryDataFlow[i + 1].color}60)`,
                            }}
                          />
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
                                  ? `${memoryDataFlow[i + 1].color}80`
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
                    <div className="mt-3 w-full px-0.5 text-center">
                      <span
                        className="text-[10px] font-bold transition-colors duration-500"
                        style={{
                          color: isActive
                            ? step.color
                            : "rgba(255,255,255,0.25)",
                        }}
                      >
                        {step.level}
                      </span>
                      <p
                        className="mt-0.5 text-[9px] leading-snug transition-colors duration-500"
                        style={{
                          color: isActive
                            ? "rgba(255,255,255,0.45)"
                            : "rgba(255,255,255,0.15)",
                        }}
                      >
                        {step.action}
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
              {memoryDataFlow.map((step, i) => {
                const isActive = i <= activeStep;
                const isCurrentStep = i === activeStep;
                return (
                  <div key={step.step}>
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
                          className="text-xs font-bold transition-colors duration-500"
                          style={{
                            color: isActive
                              ? step.color
                              : "rgba(255,255,255,0.4)",
                          }}
                        >
                          {step.level}
                        </span>
                        <p
                          className="mt-0.5 text-[10px] leading-snug transition-colors duration-500"
                          style={{
                            color: isActive
                              ? "rgba(255,255,255,0.45)"
                              : "rgba(255,255,255,0.15)",
                          }}
                        >
                          {step.action}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-5 flex justify-center gap-1.5">
            {memoryDataFlow.map((step, i) => (
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

          {/* Caption */}
          <p className="mt-4 text-center text-[10px] text-text-muted italic">
            Example: User checks Gluetun VPN, edits docker-compose, documents reasoning
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
