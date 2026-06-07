"use client";

import * as React from "react";
import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * SpotlightCard — a glass card with a cursor-following radial glow. The glow is
 * driven by CSS custom properties updated on pointermove (no React re-render per
 * frame). Disabled for coarse pointers; respects reduced motion via opacity only
 * (no movement). Strong text contrast preserved.
 */
export function SpotlightCard({
  children,
  className,
  glow = "rgba(130,143,255,0.16)",
  tone = "default",
  interactive = true,
  radius = 360,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  glow?: string;
  tone?: "default" | "strong" | "subtle";
  interactive?: boolean;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") setActive(true);
      }}
      onPointerLeave={() => setActive(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        tone === "strong" && "glass-strong",
        tone === "default" && "glass",
        tone === "subtle" && "border border-hairline bg-white/[0.025] backdrop-blur-md",
        interactive &&
          "transition-[transform,border-color] duration-300 ease-[var(--ease-transition)] hover:-translate-y-1 hover:border-border-strong",
        className,
      )}
      style={
        {
          "--spot": glow,
          "--r": `${radius}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      {/* cursor glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(var(--r) circle at var(--mx, 50%) var(--my, 50%), var(--spot), transparent 60%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
