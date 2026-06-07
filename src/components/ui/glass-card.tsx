import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GlassCard — the foundational frosted surface. Semi-transparent, blurred,
 * hairline border, soft top-edge highlight. Use `tone="strong"` over busy
 * backgrounds for readability. `interactive` adds a hover lift + border warm.
 */
export const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    tone?: "default" | "strong" | "subtle";
    interactive?: boolean;
    gradientBorder?: boolean;
  }
>(function GlassCard(
  { className, tone = "default", interactive = false, gradientBorder = false, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl",
        tone === "strong" && "glass-strong",
        tone === "default" && "glass",
        tone === "subtle" &&
          "border border-hairline bg-white/[0.025] shadow-[var(--edge-highlight)] backdrop-blur-md",
        interactive &&
          "transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-transition)] hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--edge-highlight),var(--shadow-lg)]",
        gradientBorder && "gradient-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
