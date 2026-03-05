"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MovingBorderProps {
  children: React.ReactNode;
  duration?: number;
  className?: string;
  containerClassName?: string;
  borderClassName?: string;
  borderRadius?: string;
  offset?: number;
  as?: React.ElementType;
  [key: string]: unknown;
}

export function MovingBorder({
  children,
  duration = 4000,
  className,
  containerClassName,
  borderClassName,
  borderRadius = "1rem",
  offset = 0,
  as: Component = "div",
  ...otherProps
}: MovingBorderProps) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength?.();
    if (length) {
      const pxPerMs = length / duration;
      progress.set(((time + offset) * pxPerMs) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x ?? 0
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y ?? 0
  );

  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${x}px ${y}px, white, transparent 80%)`;

  return (
    <Component
      className={cn(
        "relative overflow-hidden p-[1px]",
        containerClassName
      )}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={borderRadius}
            ry={borderRadius}
            ref={pathRef}
          />
        </svg>
        <motion.div
          className={cn(
            "absolute inset-0 border border-white/20",
            borderClassName
          )}
          style={{
            borderRadius,
            WebkitMaskImage: maskImage,
            maskImage,
          }}
        />
      </div>
      <div
        className={cn("relative z-10", className)}
        style={{ borderRadius }}
      >
        {children}
      </div>
    </Component>
  );
}
