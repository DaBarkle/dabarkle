"use client";

import { useEffect, useState, useRef } from "react";

export function AmbientLayer() {
  const [visible, setVisible] = useState(false);
  const displayX = useRef(0);
  const displayY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const divRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouch || reducedMotion) return;

    setVisible(true);

    function handleMouseMove(e: MouseEvent) {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    }

    function tick() {
      displayX.current += (targetX.current - displayX.current) * 0.08;
      displayY.current += (targetY.current - displayY.current) * 0.08;
      if (divRef.current) {
        divRef.current.style.background = `radial-gradient(400px circle at ${displayX.current}px ${displayY.current}px, rgba(99,102,241,0.10), transparent 60%)`;
      }
      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          ref={divRef}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-30"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.04]"
      >
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
    </>
  );
}
