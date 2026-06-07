import { cn } from "@/lib/utils";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/**
 * BentoGrid — responsive 6-col grid (1col mobile → 6col desktop). Children set
 * their own span via className (e.g. "md:col-span-4"). Use BentoCell for a
 * ready-made glass tile with cursor spotlight.
 */
export function BentoGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:auto-rows-[minmax(11rem,auto)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoCell({
  children,
  className,
  glow,
  span = "md:col-span-3",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: string;
  span?: string;
}) {
  return (
    <SpotlightCard glow={glow} className={cn("h-full", span, className)}>
      {children}
    </SpotlightCard>
  );
}
