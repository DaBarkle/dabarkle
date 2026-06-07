import { cn } from "@/lib/utils";

/**
 * Spotlight — a large soft conic/elliptical light beam, used behind hero
 * headlines. Pure CSS, no JS. Position with `className` (left/top/translate).
 */
export function Spotlight({
  className,
  fill = "rgba(130,143,255,0.18)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-[60rem] w-[60rem] -translate-x-1/2 blur-[120px]",
        className,
      )}
      style={{
        background: `radial-gradient(ellipse 50% 60% at 50% 40%, ${fill}, transparent 70%)`,
      }}
    />
  );
}
