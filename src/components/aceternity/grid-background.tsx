"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  dotSize?: number;
  gridSize?: number;
  color?: string;
  variant?: "dots" | "grid" | "grid-small";
}

export function GridBackground({
  className,
  children,
  dotSize = 1,
  gridSize = 32,
  color = "rgba(255, 255, 255, 0.04)",
  variant = "dots",
}: GridBackgroundProps) {
  const bgStyle: React.CSSProperties =
    variant === "dots"
      ? {
          backgroundImage: `radial-gradient(circle at ${dotSize}px ${dotSize}px, ${color} ${dotSize}px, transparent 0)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }
      : variant === "grid"
        ? {
            backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }
        : {
            backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(to right, ${color} 1px, transparent 1px)`,
            backgroundSize: `${gridSize / 2}px ${gridSize / 2}px`,
          };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={bgStyle}
      />
      {/* Radial fade from center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, var(--color-bg, #050505) 80%)",
        }}
      />
      {children}
    </div>
  );
}
