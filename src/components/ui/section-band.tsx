import { GridOverlay } from "@/components/visuals/grid-overlay";
import { cn } from "@/lib/utils";

/** Faint dot field for the "mono" tone (paired with scanlines below). */
const MONO_DOTS = "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)";
/** Hairline scanlines — static texture, suited to the Technical Mono band. */
const MONO_SCANLINES =
  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)";
/** Fade the texture toward the band edges so it never fights the content. */
const MONO_MASK = "radial-gradient(ellipse 95% 85% at 50% 45%, #000 30%, transparent 100%)";

/**
 * SectionBand — full-bleed tonal wrapper for editorial scale-breaks.
 * - "default": transparent passthrough.
 * - "deep":    slightly darker layered background + edge hairlines + a very
 *              subtle dot grid (the mind / soul sections).
 * - "mono":    deep plus a faint dot+scanline texture for the Technical Mono
 *              numbers band.
 * Children render inside a centered max-w-6xl container. Pure CSS server
 * component — all texture is static background-image, nothing animates.
 */
export function SectionBand({
  tone = "default",
  children,
  className,
  id,
}: {
  tone?: "default" | "deep" | "mono";
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const layered = tone !== "default";
  return (
    <div
      id={id}
      className={cn("relative w-full", layered && "border-y border-hairline bg-[#050507]", className)}
    >
      {tone === "deep" && <GridOverlay variant="dots" size={30} opacity={0.5} fade="radial" />}
      {tone === "mono" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `${MONO_DOTS}, ${MONO_SCANLINES}`,
            backgroundSize: "22px 22px, 100% 3px",
            opacity: 0.55,
            maskImage: MONO_MASK,
            WebkitMaskImage: MONO_MASK,
          }}
        />
      )}
      <div className="relative mx-auto w-full max-w-6xl px-6">{children}</div>
    </div>
  );
}
