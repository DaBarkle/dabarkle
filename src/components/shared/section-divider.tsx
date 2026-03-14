import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "accent" | "brand" | "neutral" | "mixed";
  className?: string;
}

export function SectionDivider({
  variant = "mixed",
  className,
}: SectionDividerProps) {
  const gradients: Record<string, string> = {
    accent:
      "linear-gradient(90deg, transparent 5%, rgba(251,191,36,0.25) 50%, transparent 95%)",
    brand:
      "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.25) 50%, transparent 95%)",
    neutral:
      "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 50%, transparent 95%)",
    mixed:
      "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.2) 35%, rgba(251,191,36,0.2) 65%, transparent 95%)",
  };

  const glowGradients: Record<string, string> = {
    accent:
      "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.05), transparent 70%)",
    brand:
      "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.05), transparent 70%)",
    neutral:
      "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.02), transparent 70%)",
    mixed:
      "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.04), transparent 70%)",
  };

  return (
    <div className={cn("relative", className)} aria-hidden="true">
      <div
        className="h-px w-full"
        style={{ background: gradients[variant] }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-[50%] pointer-events-none"
        style={{ background: glowGradients[variant] }}
      />
    </div>
  );
}
