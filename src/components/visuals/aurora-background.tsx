import { cn } from "@/lib/utils";

/**
 * AuroraBackground — a section-scoped animated aurora field. Pure CSS; the
 * motion is `prefers-reduced-motion`-aware via the global reduced-motion block.
 * Drop it as the first child of a `relative overflow-hidden` section.
 */
export function AuroraBackground({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}) {
  const opacity = intensity === "strong" ? 0.9 : intensity === "soft" ? 0.4 : 0.65;
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <div
        className="absolute -left-[10%] top-[-20%] h-[40rem] w-[40rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(94,105,210,0.5), transparent 60%)",
          animation: "aurora-orb-0 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-8%] top-[6%] h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(130,143,255,0.4), transparent 60%)",
          animation: "aurora-orb-1 34s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[36rem] w-[36rem] rounded-full blur-[130px]"
        style={{
          background: "radial-gradient(circle, rgba(94,105,210,0.32), transparent 60%)",
          animation: "aurora-orb-2 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
