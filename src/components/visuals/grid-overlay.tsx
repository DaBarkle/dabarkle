import { cn } from "@/lib/utils";

/**
 * GridOverlay — a faint grid or dot field, masked to fade at the edges.
 * Pure CSS server component.
 */
export function GridOverlay({
  className,
  variant = "grid",
  size = 56,
  opacity = 0.6,
  fade = "radial",
}: {
  className?: string;
  variant?: "grid" | "dots";
  size?: number;
  opacity?: number;
  fade?: "radial" | "top" | "none";
}) {
  const line = "rgba(255,255,255,0.03)";
  const backgroundImage =
    variant === "dots"
      ? `radial-gradient(${line} 1px, transparent 1px)`
      : `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`;

  const mask =
    fade === "radial"
      ? "radial-gradient(ellipse 80% 80% at 50% 50%, #000 30%, transparent 100%)"
      : fade === "top"
      ? "linear-gradient(to bottom, #000, transparent)"
      : undefined;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage,
        backgroundSize: `${size}px ${size}px`,
        opacity,
        ...(mask ? { maskImage: mask, WebkitMaskImage: mask } : {}),
      }}
    />
  );
}
