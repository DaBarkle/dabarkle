import { cn } from "@/lib/utils";

/**
 * Marquee — seamless horizontal auto-scroll (CSS-driven, pauses on hover,
 * stops under reduced-motion). Duplicates children once for a seamless loop.
 * Edges are masked to fade. Great for a trust / tech strip.
 */
export function Marquee({
  children,
  className,
  durationSeconds = 38,
  reverse = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  durationSeconds?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group/marquee relative w-full overflow-hidden", className)}
      style={{
        maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-3",
          pauseOnHover && "group-hover/marquee:[animation-play-state:paused]",
        )}
        style={{
          animation: `marquee ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-3">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-3">
          {children}
        </div>
      </div>
    </div>
  );
}
