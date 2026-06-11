"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TerminalLine {
  /** Operator input — rendered with a lavender "❯" prompt glyph. */
  prompt?: boolean;
  /** System/meta output — rendered in ink-subtle. */
  dim?: boolean;
  text: string;
}

/** Per-line type-on cadence. Slow enough to read, fast enough to feel live. */
const LINE_CADENCE_MS = 450;

/**
 * TerminalWindow — a glass-framed mono terminal for real session excerpts.
 * With `typeOn`, lines reveal sequentially (opacity only — no layout shift:
 * every line occupies its slot from first paint) once the frame scrolls into
 * view, with a soft blinking block cursor on the last revealed line. Reduced
 * motion renders the full transcript instantly. Traffic-light dots are purely
 * decorative (muted, aria-hidden).
 */
export function TerminalWindow({
  title,
  lines,
  typeOn = false,
  className,
}: {
  title: string;
  lines: ReadonlyArray<TerminalLine>;
  typeOn?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    if (!typeOn || reduced || !inView) return;
    // First line lands on the next macrotask after entering view; the rest
    // follow on the cadence. (Async tick keeps setState out of the effect body.)
    let id: number;
    const tick = () => {
      setRevealed((r) => {
        const next = Math.min(r + 1, lines.length);
        if (next < lines.length) id = window.setTimeout(tick, LINE_CADENCE_MS);
        return next;
      });
    };
    id = window.setTimeout(tick, 0);
    return () => window.clearTimeout(id);
  }, [typeOn, reduced, inView, lines.length]);

  // Static render paths (no typeOn, or reduced motion) show everything.
  const shown = !typeOn || reduced ? lines.length : revealed;
  const cursorAt = shown - 1;

  return (
    <div ref={ref} className={cn("glass overflow-hidden rounded-2xl", className)}>
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
        <span aria-hidden="true" className="flex shrink-0 gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-error/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/30" />
        </span>
        <span className="truncate font-mono text-xs text-ink-subtle">{title}</span>
      </div>

      {/* Transcript */}
      <div className="px-4 py-4 font-mono text-[13px] leading-relaxed sm:px-5">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "transition-opacity duration-300",
              i < shown ? "opacity-100" : "opacity-0",
            )}
          >
            {line.prompt && (
              <span aria-hidden="true" className="mr-2 select-none text-brand-400">
                ❯
              </span>
            )}
            <span className={line.dim ? "text-ink-subtle" : line.prompt ? "text-ink" : "text-ink-muted"}>
              {line.text}
            </span>
            {i === cursorAt && (
              <span
                aria-hidden="true"
                className="ml-1.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.18em] rounded-[1px] bg-brand-400/80 animate-[glow-pulse_1.1s_ease-in-out_infinite]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
