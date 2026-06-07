import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { CountUp } from "@/components/ui/count-up";

/**
 * StatCard — a single metric: big animated number + label + caption. Glass
 * surface, hairline border, optional accent tint on the value.
 */
export function StatCard({
  value,
  label,
  caption,
  suffix,
  prefix,
  accent,
  className,
}: {
  value: number;
  label: string;
  caption?: string;
  suffix?: string;
  prefix?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <GlassCard interactive className={cn("p-5 sm:p-6", className)}>
      <div
        className="text-[2rem] font-semibold leading-none tracking-tight sm:text-[2.4rem]"
        style={accent ? { color: accent } : { color: "var(--color-ink)" }}
      >
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-3 text-sm font-medium text-white">{label}</div>
      {caption && <div className="mt-1 text-xs leading-relaxed text-text-tertiary">{caption}</div>}
    </GlassCard>
  );
}
