"use client";

import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 12, className }: MeteorsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const meteorStyles = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        left: `${Math.floor(Math.random() * 100)}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${Math.floor(Math.random() * 3) + 2}s`,
      })),
    [number]
  );

  if (!mounted || prefersReducedMotion) return null;

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-brand-400 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-brand-400 before:to-transparent before:content-['']",
            className
          )}
          style={{
            top: 0,
            left: style.left,
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
            animation: "meteor-fall linear infinite",
          }}
        />
      ))}
      <style>{`
        @keyframes meteor-fall {
          0% {
            transform: rotate(215deg) translateX(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: rotate(215deg) translateX(-400px);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
