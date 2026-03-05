"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CountUp } from "@/components/shared/count-up";
import { GlowingStarsCard } from "@/components/aceternity/glowing-stars";
import { GridBackground } from "@/components/aceternity/grid-background";
import { Sparkles } from "@/components/aceternity/sparkles";
import { metrics, sessionData, timelineAnnotations } from "@/data/hermes";

const tierColors: Record<number, string> = {
  1: "#34d399",
  2: "#fbbf24",
  3: "#a78bfa",
};

export function MetricsDashboard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  // Area chart calculations
  const areaW = 800;
  const areaH = 200;
  const maxTime = Math.max(...sessionData.map((s) => s.time));
  const points = sessionData.map((s, i) => ({
    x: (i / (sessionData.length - 1)) * areaW,
    y: areaH - (s.time / maxTime) * (areaH - 20) - 10,
    tier: s.tier,
    session: s.session,
  }));
  const linePath = "M " + points.map((p) => `${p.x} ${p.y}`).join(" L ");
  const areaPath = linePath + ` L ${areaW} ${areaH} L 0 ${areaH} Z`;
  const lineLength = 2000;

  const annotationPoints = timelineAnnotations
    .map((a) => {
      const idx = sessionData.findIndex((s) => s.session === a.session);
      if (idx === -1) return null;
      return { ...a, x: points[idx].x, y: points[idx].y };
    })
    .filter(Boolean) as Array<{
    session: string;
    label: string;
    description: string;
    x: number;
    y: number;
  }>;

  const headlineStats = [
    {
      value: metrics.documentLines,
      suffix: "",
      label: "lines maintained",
      sublabel: "zero manual edits",
      color: "#a78bfa",
    },
    {
      value: 40,
      suffix: "/40",
      label: "credentials preserved",
      sublabel: "across every session",
      color: "#fb923c",
    },
    {
      value: metrics.optimizationsApplied,
      suffix: "",
      label: "self-applied optimizations",
      sublabel: "zero failures",
      color: "#34d399",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="dots" gridSize={32} color="rgba(139,92,246,0.02)">
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="mb-3 text-overline font-mono text-accent-400">
              Production Results
            </p>
            <h2 className="mb-4 text-h1 text-white">
              <Sparkles color="#34d399" count={5}>
                {metrics.sessions} Sessions. Zero Data Loss.
              </Sparkles>
            </h2>
            <p className="mb-10 max-w-lg text-lg text-text-secondary sm:mb-16">
              Real metrics from {metrics.systemUptime} days of production
              operation (January 8 &ndash; March 2, 2026).
            </p>
          </ScrollReveal>

          {/* Headline metrics */}
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {headlineStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <GlowingStarsCard className="h-full text-center">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    className="text-4xl font-bold text-white"
                  />
                  <p className="mt-2 text-xs text-text-secondary">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-text-muted">{stat.sublabel}</p>
                </GlowingStarsCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Area chart */}
          <div
            ref={chartRef}
            className="rounded-2xl border border-white/[0.06] bg-surface-1/80 p-6 backdrop-blur-sm"
          >
            <h3 className="mb-1 text-sm font-semibold text-white">
              Execution Time Trend
            </h3>
            <p className="mb-4 text-xs text-text-tertiary">
              Across all sessions (seconds) &mdash; dots colored by tier
            </p>
            <div
              className="rounded-xl bg-surface-0/50 p-4"
              style={{ minHeight: 220 }}
            >
              <svg
                viewBox={`0 0 ${areaW} ${areaH + 40}`}
                preserveAspectRatio="none"
                role="img"
                aria-label="Session execution time trend chart"
                className="h-56 w-full sm:h-64"
              >
                <defs>
                  <linearGradient
                    id="hermesAreaGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor="rgba(139,92,246,0.25)"
                    />
                    <stop
                      offset="100%"
                      stopColor="rgba(139,92,246,0)"
                    />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((fraction) => {
                  const gy = areaH - fraction * (areaH - 20) - 10;
                  return (
                    <line
                      key={fraction}
                      x1="0"
                      y1={gy}
                      x2={areaW}
                      y2={gy}
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                })}
                <path
                  d={areaPath}
                  fill="url(#hermesAreaGrad)"
                  style={{
                    clipPath: chartInView
                      ? "inset(0 0% 0 0)"
                      : "inset(0 100% 0 0)",
                    transition: prefersReducedMotion
                      ? "none"
                      : "clip-path 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: lineLength,
                    strokeDashoffset: chartInView ? 0 : lineLength,
                    transition: prefersReducedMotion
                      ? "none"
                      : "stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />
                {points.map((point, i) => (
                  <circle
                    key={point.session}
                    cx={point.x}
                    cy={point.y}
                    r="5"
                    fill={tierColors[point.tier]}
                    stroke="#050505"
                    strokeWidth="2"
                    style={{
                      opacity: chartInView ? 1 : 0,
                      transform: chartInView ? "scale(1)" : "scale(0)",
                      transition: prefersReducedMotion
                        ? "none"
                        : `opacity 0.3s ease ${600 + i * 80}ms, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${600 + i * 80}ms`,
                      transformOrigin: `${point.x}px ${point.y}px`,
                      transformBox: "fill-box",
                      filter: chartInView
                        ? `drop-shadow(0 0 4px ${tierColors[point.tier]}60)`
                        : "none",
                    }}
                  />
                ))}
                {annotationPoints.map((anno, i) => (
                  <g
                    key={anno.session}
                    style={{
                      opacity: chartInView ? 1 : 0,
                      transition: `opacity 0.5s ease ${1200 + i * 200}ms`,
                    }}
                  >
                    <line
                      x1={anno.x}
                      y1={anno.y + 8}
                      x2={anno.x}
                      y2={areaH + 5}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <text
                      x={anno.x}
                      y={areaH + 20}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="8"
                      className="font-mono"
                    >
                      {anno.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <div className="mt-2 hidden justify-between px-4 sm:flex">
              {sessionData.map((s) => (
                <span
                  key={s.session}
                  className="text-[11px] text-text-tertiary"
                >
                  {s.session}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-4">
              {[
                { label: "Tier 1", color: "#34d399" },
                { label: "Tier 2", color: "#fbbf24" },
                { label: "Tier 3", color: "#a78bfa" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1.5">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: t.color,
                      boxShadow: `0 0 6px ${t.color}40`,
                    }}
                  />
                  <span className="text-xs text-text-secondary">
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency callout */}
          <ScrollReveal
            delay={0.3}
            className="mt-6 rounded-2xl border border-white/[0.06] bg-surface-1/80 p-6 text-center backdrop-blur-sm sm:p-8"
          >
            <p className="text-sm text-text-tertiary">
              Intelligent routing delivers
            </p>
            <div className="my-2 flex items-baseline justify-center gap-2">
              <CountUp
                value={metrics.tokenSavings}
                suffix="%"
                className="text-4xl font-bold text-white"
              />
              <span className="text-lg text-text-secondary">token savings</span>
            </div>
            <div className="mx-auto mt-3 h-2.5 w-48 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-500"
                style={{
                  width: `${metrics.tokenSavings}%`,
                  boxShadow: "0 0 12px rgba(139,92,246,0.4)",
                }}
              />
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Tier 2 handles 62% of sessions in 8.3 minutes average. Tier 3
              hasn&apos;t been needed.
            </p>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
