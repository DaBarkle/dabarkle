"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { maskRise, maskRiseContainer, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type HeadingTag = "h1" | "h2" | "h3";

/**
 * SplitHeading — word-level masked rise for h1/h2 display headings. Each word
 * sits in an `overflow-hidden` wrapper and rises y 110% → 0 with a 45ms
 * stagger (variants from lib/motion), once, in view. A11y-safe: the full
 * string is visually hidden for screen readers; the animated copy is
 * aria-hidden. Reduced motion renders the plain heading.
 */
export function SplitHeading({
  as = "h2",
  children,
  className,
}: {
  as?: HeadingTag;
  children: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) return <Tag className={cn(className)}>{children}</Tag>;

  const words = children.split(/\s+/).filter(Boolean);

  return (
    <Tag className={cn(className)}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={maskRiseContainer}
      >
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            {/* Mask: clips the rising word. The 0.1em pad/neg-margin pair keeps
                descenders unclipped at the tight display line-heights. */}
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <motion.span variants={maskRise} className="inline-block">
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
