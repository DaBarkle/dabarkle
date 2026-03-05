"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const prefersReducedMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (prefersReducedMotion) return;
    animate(
      "span",
      { opacity: 1, filter: filter ? "blur(0px)" : "none" },
      { duration, delay: stagger(0.08) }
    );
  }, [animate, duration, filter, prefersReducedMotion]);

  return (
    <div className={cn("font-normal", className)}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="inline-block"
            style={{
              opacity: prefersReducedMotion ? 1 : 0,
              filter: prefersReducedMotion
                ? "none"
                : filter
                  ? "blur(10px)"
                  : "none",
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
