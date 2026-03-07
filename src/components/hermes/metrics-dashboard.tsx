"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
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

const tierLabels: Record<number, string> = {
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
};

// Generate smooth cubic bezier path through points
function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const curr = pts[i];
    const next = pts[i + 1];
    const tension = 0.3;
    const dx = next.x - curr.x;
    const cp1x = curr.x + dx * tension;
    const cp1y = curr.y;
    const cp2x = next.x - dx * tension;
    const cp2y = next.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }
  return d;
}

export function MetricsDashboard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Chart dimensions
  const padding = { top: 20, right: 20, bottom: 50, left: 50 };
  const areaW = 800;
  const areaH = 220;
  const chartW = areaW - padding.left - padding.right;
  const chartH = areaH - padding.top - padding.bottom;

  const maxTime = Math.max(...sessionData.map((s) => s.time));
  const minTime = 0;

  const points = sessionData.map((s, i) => ({
    x: padding.left + (i / (sessionData.length - 1)) * chartW,
    y: padding.top + chartH - ((s.time - minTime) / (maxTime - minTime)) * chartH,
    tier: s.tier,
    session: s.session,
    time: s.time,
  }));

  const linePath = smoothPath(points);
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${padding.top + chartH} L ${points[0].x} ${padding.top + chartH} Z`;
  const lineLength = 3000;

  const annotationPoints = timelineAnnotations
    .map((a) => {
      const idx = sessionData.findIndex((s) => s.session === a.session);
      if (idx === -1) return null;
      return { ...a, x: points[idx].x, y: points[idx].y, time: sessionData[idx].time };
    })
    .filter(Boolean) as Array<{
    session: string;
    label: string;
    description: string;
    x: number;
    y: number;
    time: number;
  }>;

  // Y-axis labels
  const yTicks = [0, 250, 500, 750, 1000].filter((v) => v <= maxTime * 1.1);

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

          {/* Chart */}
          <div
            ref={chartRef}
            className="rounded-2xl border border-white/[0.06] bg-surface-1/80 p-4 backdrop-blur-sm sm:p-6"
          >
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Execution Time Trend
                </h3>
                <p className="text-xs text-text-tertiary">
                  Across all sessions (seconds) &mdash; dots colored by tier
                </p>
              </div>
              {/* Legend */}
              <div className="flex gap-3">
                {[
                  { label: "Tier 1", color: "#34d399" },
                  { label: "Tier 2", color: "#fbbf24" },
                  { label: "Tier 3", color: "#a78bfa" },
                ].map((t) => (
                  <div key={t.label} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        background: t.color,
                        boxShadow: `0 0 6px ${t.color}40`,
                      }}
                    />
                    <span className="text-[11px] text-text-tertiary">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-xl bg-surface-0/50 p-2 sm:p-4">
              <svg
                viewBox={`0 0 ${areaW} ${areaH}`}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label="Session execution time trend chart"
                className="w-full"
                style={{ height: "clamp(200px, 30vw, 280px)" }}
              >
                <defs>
                  <linearGradient
                    id="chartAreaGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
                    <stop offset="60%" stopColor="rgba(139,92,246,0.05)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                  </linearGradient>
                  <filter id="dotGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Y-axis gridlines and labels */}
                {yTicks.map((val) => {
                  const y =
                    padding.top +
                    chartH -
                    ((val - minTime) / (maxTime - minTime)) * chartH;
                  return (
                    <g key={val}>
                      <line
                        x1={padding.left}
                        y1={y}
                        x2={areaW - padding.right}
                        y2={y}
                        stroke="rgba(255,255,255,0.04)"
                        strokeWidth="1"
                      />
                      <text
                        x={padding.left - 8}
                        y={y + 3}
                        textAnchor="end"
                        fill="rgba(255,255,255,0.2)"
                        fontSize="9"
                        className="font-mono"
                      >
                        {val}s
                      </text>
                    </g>
                  );
                })}

                {/* Area fill */}
                <path
                  d={areaPath}
                  fill="url(#chartAreaGrad)"
                  style={{
                    clipPath: chartInView
                      ? "inset(0 0% 0 0)"
                      : "inset(0 100% 0 0)",
                    transition: prefersReducedMotion
                      ? "none"
                      : "clip-path 1.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />

                {/* Smooth line */}
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
                      : "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                />

                {/* Annotation lines and labels */}
                {annotationPoints.map((anno, ai) => (
                  <g
                    key={anno.session}
                    style={{
                      opacity: chartInView ? 1 : 0,
                      transition: `opacity 0.5s ease ${1400 + ai * 200}ms`,
                    }}
                  >
                    <line
                      x1={anno.x}
                      y1={anno.y + 10}
                      x2={anno.x}
                      y2={padding.top + chartH + 8}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={anno.x - 36}
                      y={padding.top + chartH + 12}
                      width="72"
                      height="16"
                      rx="4"
                      fill="rgba(255,255,255,0.03)"
                    />
                    <text
                      x={anno.x}
                      y={padding.top + chartH + 24}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.35)"
                      fontSize="8"
                      className="font-mono"
                    >
                      {anno.label}
                    </text>
                  </g>
                ))}

                {/* Data points */}
                {points.map((point, i) => {
                  const isHovered = hoveredPoint === i;
                  return (
                    <g
                      key={point.session}
                      onMouseEnter={() => setHoveredPoint(i)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: "default" }}
                    >
                      {/* Hover hit area */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="14"
                        fill="transparent"
                      />

                      {/* Glow ring on hover */}
                      {isHovered && (
                        <circle
                          cx={point.x}
                          cy={point.y}
                          r="12"
                          fill={tierColors[point.tier]}
                          opacity="0.1"
                          style={{ filter: "blur(6px)" }}
                        />
                      )}

                      {/* Outer ring */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isHovered ? 8 : 6}
                        fill="none"
                        stroke={tierColors[point.tier]}
                        strokeWidth="1.5"
                        style={{
                          opacity: chartInView ? (isHovered ? 0.8 : 0.3) : 0,
                          transition: prefersReducedMotion
                            ? "none"
                            : `all 0.3s ease ${700 + i * 60}ms`,
                        }}
                      />

                      {/* Inner dot */}
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r={isHovered ? 4.5 : 3.5}
                        fill={tierColors[point.tier]}
                        stroke="#0a0a0a"
                        strokeWidth="1.5"
                        style={{
                          opacity: chartInView ? 1 : 0,
                          transition: prefersReducedMotion
                            ? "none"
                            : `opacity 0.3s ease ${700 + i * 60}ms`,
                          filter: chartInView
                            ? `drop-shadow(0 0 4px ${tierColors[point.tier]}50)`
                            : "none",
                        }}
                      />

                      {/* Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={point.x - 44}
                            y={point.y - 40}
                            width="88"
                            height="28"
                            rx="6"
                            fill="rgba(10,10,10,0.9)"
                            stroke={tierColors[point.tier]}
                            strokeWidth="1"
                            style={{
                              filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.5))`,
                            }}
                          />
                          <text
                            x={point.x}
                            y={point.y - 26}
                            textAnchor="middle"
                            fill="white"
                            fontSize="9"
                            fontWeight="600"
                          >
                            {point.session} &middot; {point.time}s
                          </text>
                          <text
                            x={point.x}
                            y={point.y - 16}
                            textAnchor="middle"
                            fill={tierColors[point.tier]}
                            fontSize="8"
                          >
                            {tierLabels[point.tier]}
                          </text>
                          {/* Arrow */}
                          <path
                            d={`M ${point.x - 4} ${point.y - 12} L ${point.x} ${point.y - 8} L ${point.x + 4} ${point.y - 12}`}
                            fill="rgba(10,10,10,0.9)"
                          />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* X-axis session labels */}
                {points.map((point) => (
                  <text
                    key={`label-${point.session}`}
                    x={point.x}
                    y={padding.top + chartH + 40}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.2)"
                    fontSize="9"
                    className="hidden sm:block"
                  >
                    {point.session}
                  </text>
                ))}
              </svg>
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
