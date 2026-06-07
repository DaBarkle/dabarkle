import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "accent" | "brand" | "neutral" | "mixed";
  className?: string;
}

/**
 * SectionDivider — a hairline gradient rule with a soft glow bloom. Retuned to
 * the lavender system; `variant` only shifts intensity now (kept for back-compat).
 */
export function SectionDivider({ variant = "mixed", className }: SectionDividerProps) {
  const line: Record<string, string> = {
    brand: "linear-gradient(90deg, transparent 5%, rgba(94,105,210,0.35) 50%, transparent 95%)",
    accent: "linear-gradient(90deg, transparent 5%, rgba(130,143,255,0.30) 50%, transparent 95%)",
    neutral: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.07) 50%, transparent 95%)",
    mixed:
      "linear-gradient(90deg, transparent 5%, rgba(94,105,210,0.28) 35%, rgba(130,143,255,0.28) 65%, transparent 95%)",
  };
  const glow: Record<string, string> = {
    brand: "radial-gradient(ellipse at 50% 0%, rgba(94,105,210,0.07), transparent 70%)",
    accent: "radial-gradient(ellipse at 50% 0%, rgba(130,143,255,0.06), transparent 70%)",
    neutral: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02), transparent 70%)",
    mixed: "radial-gradient(ellipse at 50% 0%, rgba(94,105,210,0.05), transparent 70%)",
  };

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div className="h-px w-full" style={{ background: line[variant] }} />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-16 w-[50%] -translate-x-1/2"
        style={{ background: glow[variant] }}
      />
    </div>
  );
}
