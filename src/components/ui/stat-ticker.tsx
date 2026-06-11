"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { tickerSpring } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * How a stat should be printed mid-flight, derived from its `display` string
 * (e.g. "~33,900" → prefix "~", grouped, 0 decimals; "20.8" → 1 decimal) so
 * every animation frame is formatted exactly like the verified final value.
 */
interface DisplayFormat {
  prefix: string;
  suffix: string; // glyphs embedded in `display` itself, not the `suffix` prop
  grouped: boolean;
  decimals: number;
}

function parseDisplay(display: string | undefined, value: number, decimals?: number): DisplayFormat {
  if (display) {
    const m = display.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(\D*)$/);
    if (m) {
      const [, prefix, num, suffix] = m;
      return {
        prefix,
        suffix,
        grouped: num.includes(","),
        decimals: decimals ?? (num.split(".")[1]?.length ?? 0),
      };
    }
  }
  return { prefix: "", suffix: "", grouped: Math.abs(value) >= 1000, decimals: decimals ?? 0 };
}

function formatValue(v: number, f: DisplayFormat): string {
  const num = v.toLocaleString("en-US", {
    minimumFractionDigits: f.decimals,
    maximumFractionDigits: f.decimals,
    useGrouping: f.grouped,
  });
  return f.prefix + num + f.suffix;
}

/**
 * StatTicker — count-up for verified numbers. A motion value springs 0 → value
 * once the span scrolls into view (overdamped: it never overshoots the truth)
 * and is rendered through `useTransform` — no React re-render per frame.
 * When `display` is provided its prefix/separators/decimals are reused for
 * every frame. Reduced motion renders the final figure statically.
 */
export function StatTicker({
  value,
  display,
  suffix = "",
  decimals,
  className,
}: {
  value: number;
  /** Verified display string from the data layer, e.g. "~33,900" or "20.8". */
  display?: string;
  /** Rendered after the number, outside the animated portion (e.g. "ms"). */
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const fmt = useMemo(() => parseDisplay(display, value, decimals), [display, value, decimals]);

  const raw = useMotionValue(0);
  const spring = useSpring(raw, tickerSpring);
  // Clamp at the target — a stat must never display above its verified value.
  const text = useTransform(spring, (v) => formatValue(Math.min(v, value), fmt));

  useEffect(() => {
    if (inView && !reduced) raw.set(value);
  }, [inView, reduced, value, raw]);

  if (reduced) {
    return (
      <span ref={ref} className={cn("tabular-nums", className)}>
        {display ?? formatValue(value, fmt)}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  );
}
