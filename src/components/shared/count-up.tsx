"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValue,
  useTransform,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
  decimals?: number;
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 1.5,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toLocaleString()
  );
  const [display, setDisplay] = useState(
    prefersReducedMotion ? value.toLocaleString() : "0"
  );

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplay(
        decimals > 0 ? value.toFixed(decimals) : value.toLocaleString()
      );
      return;
    }

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (v) => setDisplay(String(v)));

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, value, duration, motionValue, rounded, prefersReducedMotion, decimals]);

  return (
    <span ref={ref} className={cn(className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
