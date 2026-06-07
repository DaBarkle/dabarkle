import { cn } from "@/lib/utils";

/**
 * NoiseOverlay — fine grain texture via an inline SVG feTurbulence filter
 * (avoids CSS data-URIs, which can trip the dev bundler). Sits above its
 * container; purely decorative.
 */
export function NoiseOverlay({
  className,
  opacity = 0.04,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full mix-blend-overlay", className)}
      style={{ opacity }}
    >
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
