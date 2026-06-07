"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const TEXT =
  "Most people use AI one prompt at a time. I design ambient intelligence — systems that remember across sessions, route intent to the right capability, protect their own secrets, and act before being asked. My work sits where harness design meets infrastructure operation.";

/**
 * Philosophy — a scroll-linked word-by-word reveal of the core statement.
 * Words brighten from faint to full ink as the band passes through the viewport.
 */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });
  const words = TEXT.split(" ");

  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div ref={ref} className="mx-auto max-w-4xl">
        <p className="mb-7 font-mono text-overline text-brand-300">{"// the work"}</p>
        <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl md:text-[2.4rem] md:leading-[1.2]">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]} reduced={reduced}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean | null;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: reduced ? 1 : opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
}
