"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CountUp } from "@/components/shared/count-up";
import { CardSpotlight } from "@/components/aceternity/card-spotlight";
import { GridBackground } from "@/components/aceternity/grid-background";
import {
  ChartContainer,
  type ChartConfig,
} from "@/components/ui/chart";
import { metrics, sessionData, timelineAnnotations } from "@/data/hermes";

const tierColors: Record<number, string> = {
  1: "#14b8a6",
  2: "#fbbf24",
  3: "#818cf8",
};

const tierLabels: Record<number, string> = {
  1: "Tier 1",
  2: "Tier 2",
  3: "Tier 3",
};

const chartConfig = {
  time: {
    label: "Execution Time",
    color: "#818cf8",
  },
} satisfies ChartConfig;

// Prepare data for Recharts
const chartData = sessionData.map((s) => ({
  session: s.session,
  time: s.time,
  tier: s.tier,
  fill: tierColors[s.tier],
}));

// Map annotation sessions to their labels
const annotationMap = new Map(
  timelineAnnotations.map((a) => [a.session, a.label])
);

function CustomDot(props: Record<string, unknown>) {
  const { cx, cy, payload } = props as {
    cx: number;
    cy: number;
    payload: { tier: number; fill: string };
  };
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  const color = payload.fill || tierColors[payload.tier] || "#818cf8";
  return (
    <g>
      {/* Glow */}
      <circle
        cx={cx}
        cy={cy}
        r={10}
        fill={color}
        opacity={0.15}
        style={{ filter: "blur(4px)" }}
      />
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        opacity={0.4}
      />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill={color}
        stroke="#0a0a0a"
        strokeWidth={1.5}
        style={{
          filter: `drop-shadow(0 0 4px ${color}80)`,
        }}
      />
    </g>
  );
}

function CustomActiveDot(props: Record<string, unknown>) {
  const { cx, cy, payload } = props as {
    cx: number;
    cy: number;
    payload: { tier: number; fill: string };
  };
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  const color = payload.fill || tierColors[payload.tier] || "#818cf8";
  return (
    <g>
      {/* Pulse glow */}
      <circle
        cx={cx}
        cy={cy}
        r={16}
        fill={color}
        opacity={0.12}
        style={{ filter: "blur(8px)" }}
      />
      {/* Outer ring */}
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.7}
      />
      {/* Inner dot */}
      <circle
        cx={cx}
        cy={cy}
        r={4.5}
        fill={color}
        stroke="#0a0a0a"
        strokeWidth={2}
        style={{
          filter: `drop-shadow(0 0 8px ${color})`,
        }}
      />
    </g>
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      session: string;
      time: number;
      tier: number;
      fill: string;
    };
  }>;
}

function CustomChartTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.[0]) return null;
  const data = payload[0].payload;
  const color = data.fill || tierColors[data.tier];
  const annotation = annotationMap.get(data.session);
  return (
    <div
      className="rounded-xl border bg-surface-0/95 px-4 py-3 shadow-2xl backdrop-blur-sm"
      style={{
        borderColor: `${color}40`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${color}15`,
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
        <span className="text-sm font-semibold text-white">
          {data.session}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            background: `${color}15`,
            color,
          }}
        >
          {tierLabels[data.tier]}
        </span>
      </div>
      <div className="mt-1.5 flex items-baseline gap-1">
        <span className="font-mono text-lg font-bold text-white">
          {data.time}s
        </span>
        <span className="text-xs text-text-tertiary">execution time</span>
      </div>
      {annotation && (
        <div className="mt-1.5 border-t border-white/[0.06] pt-1.5">
          <span className="text-[10px] font-medium" style={{ color }}>
            {annotation}
          </span>
        </div>
      )}
    </div>
  );
}

const headlineStats = [
  {
    value: metrics.documentLines,
    suffix: "",
    label: "lines maintained",
    sublabel: "zero manual edits",
    color: "#818cf8",
  },
  {
    value: 40,
    suffix: "/40",
    label: "credentials preserved",
    sublabel: "across every session",
    color: "#fbbf24",
  },
  {
    value: metrics.optimizationsApplied,
    suffix: "",
    label: "self-applied optimizations",
    sublabel: "zero failures",
    color: "#14b8a6",
  },
];

export function MetricsDashboard() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground
        variant="dots"
        gridSize={32}
        color="rgba(99,102,241,0.02)"
      >
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <ScrollReveal>
            <p className="mb-3 font-mono text-overline text-accent-400">
              Production Results
            </p>
            <h2 className="mb-4 text-h1">
              <span className="bg-gradient-to-r from-brand-400 via-accent-400 to-teal-400 bg-clip-text text-transparent">
                {metrics.sessions} Sessions.
              </span>{" "}
              <span className="text-white">Zero Data Loss.</span>
            </h2>
            <p className="mb-10 max-w-lg text-lg text-text-secondary sm:mb-16">
              Real metrics from {metrics.systemUptime} days of production
              operation (January 8 &ndash; March 14, 2026).
            </p>
          </ScrollReveal>

          {/* Headline metrics */}
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            {headlineStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <CardSpotlight
                  className="h-full"
                  spotlightColor={`${stat.color}10`}
                >
                  <div className="p-5 text-center">
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl font-bold text-white"
                    />
                    <p className="mt-2 text-xs text-text-secondary">
                      {stat.label}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {stat.sublabel}
                    </p>
                  </div>
                </CardSpotlight>
              </ScrollReveal>
            ))}
          </div>

          {/* Chart */}
          <div ref={chartRef}>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-white/[0.06] bg-surface-1/80 p-4 backdrop-blur-sm sm:p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Execution Time Trend
                    </h3>
                    <p className="text-xs text-text-tertiary">
                      Across all {metrics.sessions} sessions (seconds) &mdash;
                      dots colored by tier
                    </p>
                  </div>
                  {/* Legend */}
                  <div className="flex gap-3">
                    {[
                      { label: "Tier 1", color: "#14b8a6" },
                      { label: "Tier 2", color: "#fbbf24" },
                      { label: "Tier 3", color: "#818cf8" },
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

                <motion.div
                  className="rounded-xl bg-surface-0/50 p-2 sm:p-4"
                  initial={{ opacity: 0 }}
                  animate={chartInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.8,
                    delay: 0.2,
                  }}
                >
                  <ChartContainer
                    config={chartConfig}
                    className="h-[220px] w-full sm:h-[280px]"
                  >
                    <AreaChart
                      data={chartData}
                      margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
                      accessibilityLayer
                    >
                      <defs>
                        <linearGradient
                          id="chartAreaGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#818cf8"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="60%"
                            stopColor="#818cf8"
                            stopOpacity={0.05}
                          />
                          <stop
                            offset="95%"
                            stopColor="#818cf8"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.04)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="session"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{
                          fill: "rgba(255,255,255,0.2)",
                          fontSize: 10,
                        }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tick={{
                          fill: "rgba(255,255,255,0.2)",
                          fontSize: 10,
                        }}
                        tickFormatter={(value: number) => `${value}s`}
                        domain={[0, "dataMax + 100"]}
                      />
                      <Tooltip
                        content={<CustomChartTooltip />}
                        cursor={{
                          stroke: "rgba(255,255,255,0.06)",
                          strokeWidth: 1,
                        }}
                      />
                      <Area
                        dataKey="time"
                        type="natural"
                        fill="url(#chartAreaGradient)"
                        stroke="#818cf8"
                        strokeWidth={2.5}
                        dot={<CustomDot />}
                        activeDot={<CustomActiveDot />}
                        isAnimationActive={
                          chartInView && !prefersReducedMotion
                        }
                        animationDuration={1400}
                        animationEasing="ease-out"
                      />
                    </AreaChart>
                  </ChartContainer>
                </motion.div>

                {/* Annotation markers below chart */}
                <div className="mt-3 flex flex-wrap justify-center gap-3">
                  {timelineAnnotations.map((anno) => (
                    <div
                      key={anno.session}
                      className="flex items-center gap-1.5 rounded-full border border-white/[0.04] bg-white/[0.02] px-3 py-1"
                    >
                      <span className="font-mono text-[10px] font-semibold text-accent-400">
                        {anno.session}
                      </span>
                      <span className="text-[10px] text-text-tertiary">
                        {anno.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
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
                  boxShadow: "0 0 12px rgba(99,102,241,0.4)",
                }}
              />
            </div>
            <p className="mt-3 text-sm text-text-muted">
              Tier 2 handles 62% of {metrics.sessions} sessions in 8.3 minutes
              average. Tier 3 hasn&apos;t been needed since Session 1.
            </p>
          </ScrollReveal>
        </div>
      </GridBackground>
    </section>
  );
}
