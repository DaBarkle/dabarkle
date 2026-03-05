"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowingStarsCardProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlowingStarsCard({
  className,
  children,
}: GlowingStarsCardProps) {
  const [mouseEntered, setMouseEntered] = useState(false);
  const [stars, setStars] = useState<{ x: number; y: number; id: number }[]>(
    []
  );

  useEffect(() => {
    const generated = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      id: i,
    }));
    setStars(generated);
  }, []);

  return (
    <div
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border-subtle bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0.005))] p-6 antialiased",
        className
      )}
    >
      <div className="absolute inset-0" aria-hidden="true">
        {stars.map((star) => (
          <StarDot
            key={star.id}
            x={star.x}
            y={star.y}
            isActive={mouseEntered}
            delay={star.id * 0.03}
          />
        ))}
      </div>
      <AnimatePresence>
        {mouseEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_60%)]"
          />
        )}
      </AnimatePresence>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StarDot({
  x,
  y,
  isActive,
  delay,
}: {
  x: number;
  y: number;
  isActive: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute h-1 w-1 rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: isActive
          ? `rgba(139, 92, 246, ${Math.random() * 0.5 + 0.3})`
          : "rgba(255, 255, 255, 0.06)",
      }}
      animate={{
        scale: isActive ? [1, 1.5, 1] : 1,
        opacity: isActive ? [0.3, 1, 0.3] : 0.15,
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: isActive ? Infinity : 0,
        ease: "easeInOut",
      }}
    />
  );
}

interface GlowingStarsDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlowingStarsDescription({
  className,
  children,
}: GlowingStarsDescriptionProps) {
  return (
    <p className={cn("max-w-[16rem] text-sm text-text-tertiary", className)}>
      {children}
    </p>
  );
}

interface GlowingStarsTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function GlowingStarsTitle({
  className,
  children,
}: GlowingStarsTitleProps) {
  return (
    <h3 className={cn("text-lg font-bold text-white", className)}>
      {children}
    </h3>
  );
}
