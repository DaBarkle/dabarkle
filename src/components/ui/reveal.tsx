"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { viewportOnce, easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Dir = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

const OFFSET: Record<Dir, { x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { y: 22 },
  down: { y: -22 },
  left: { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.95 },
  blur: { y: 22, filter: "blur(8px)" },
  none: {},
};

/**
 * Reveal — scroll-triggered entrance. Reveals once. Fully reduced-motion safe
 * (renders instantly visible, no transform). Compose with <Stagger> for lists.
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
  as = "div",
  asChild = false,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Dir;
  delay?: number;
  duration?: number;
  as?: "div" | "span" | "li" | "section";
  asChild?: boolean;
}) {
  const reduced = useReducedMotion();
  const off = OFFSET[direction];
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  // When used inside a <Stagger>, defer to the parent variants.
  if (asChild) {
    const variants: Variants = {
      hidden: { opacity: 0, ...off },
      visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
    };
    return (
      <MotionTag variants={variants} transition={{ duration, ease: easings.entrance }} className={className}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...off }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={viewportOnce}
      transition={{ duration, delay, ease: easings.entrance }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger — viewport-triggered container that staggers <Reveal asChild> (or any
 * motion child using `hidden`/`visible` variants).
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0.05,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  as?: "div" | "ul" | "section";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    >
      {children}
    </MotionTag>
  );
}

/** Item helper for use inside <Stagger>. */
export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.55,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Dir;
  duration?: number;
}) {
  return (
    <Reveal asChild direction={direction} duration={duration} className={cn(className)}>
      {children}
    </Reveal>
  );
}
