"use client";

import { useEffect, useRef } from "react";

/**
 * AmbientLayer — a soft lavender spotlight that eases toward the cursor on
 * desktop, adding life and depth to the dark canvas. Pointer-coarse and
 * reduced-motion users simply get no listeners (the div stays transparent; the
 * SiteBackground already carries the base grain/vignette). Driven via rAF +
 * direct style writes — no React re-renders.
 */
export function AmbientLayer() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight * 0.25 };
    const target = { ...pos };
    let raf = 0;

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
    }
    function tick() {
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;
      if (ref.current) {
        ref.current.style.background = `radial-gradient(520px circle at ${pos.x}px ${pos.y}px, rgba(94,105,210,0.10), transparent 65%)`;
      }
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
    />
  );
}
