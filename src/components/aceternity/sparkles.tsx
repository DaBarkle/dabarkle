"use client";

import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparkleType {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

function generateSparkle(color: string): SparkleType {
  return {
    id: Math.random().toString(36).slice(2),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color,
    delay: Math.random() * 2,
    scale: Math.random() * 0.5 + 0.5,
    lifespan: Math.random() * 2 + 1,
  };
}

interface SparklesProps {
  className?: string;
  children?: React.ReactNode;
  color?: string;
  count?: number;
}

export function Sparkles({
  className,
  children,
  color = "#FFC700",
  count = 12,
}: SparklesProps) {
  const [sparkles, setSparkles] = useState<SparkleType[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const initial = Array.from({ length: count }, () => generateSparkle(color));
    setSparkles(initial);

    const interval = setInterval(() => {
      setSparkles((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = generateSparkle(color);
        return next;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [color, count, prefersReducedMotion]);

  return (
    <span className={cn("relative inline-block", className)}>
      {sparkles.map((sparkle) => (
        <Sparkle key={sparkle.id} {...sparkle} />
      ))}
      <span className="relative z-10">{children}</span>
    </span>
  );
}

function Sparkle({ x, y, color, delay, scale, lifespan }: SparkleType) {
  return (
    <motion.span
      className="pointer-events-none absolute z-20 block"
      style={{ left: x, top: y }}
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{
        scale: [0, scale, 0],
        rotate: [0, 180],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: lifespan,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1,
        ease: "easeInOut",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
          fill={color}
        />
      </svg>
    </motion.span>
  );
}
