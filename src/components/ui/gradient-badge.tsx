import { cn } from "@/lib/utils";

/**
 * GradientBadge — a small glass pill with a hairline gradient border. Use for
 * status chips, tags, "Featured", section labels. `tone` shifts the accent.
 */
export function GradientBadge({
  children,
  className,
  tone = "primary",
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "primary" | "neutral" | "success" | "warning";
  icon?: React.ReactNode;
}) {
  const toneCls = {
    primary: "text-brand-200",
    neutral: "text-text-secondary",
    success: "text-teal-300",
    warning: "text-accent-300",
  }[tone];

  return (
    <span
      className={cn(
        "gradient-border inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-3 py-1 text-xs font-medium backdrop-blur-sm",
        toneCls,
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
