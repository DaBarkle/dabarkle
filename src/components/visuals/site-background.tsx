import { cn } from "@/lib/utils";
import { NoiseOverlay } from "@/components/visuals/noise";

/**
 * SiteBackground — the global, fixed ambient base that sits behind ALL content.
 * Pure CSS (server component, zero JS). Layered: deep canvas → soft lavender
 * mesh glows → faint grid → vignette → grain. Deliberately subtle so it lifts
 * content without competing with it. Sections layer their own richer visuals
 * on top.
 */
export function SiteBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
    >
      {/* base */}
      <div className="absolute inset-0 bg-canvas" />

      {/* ambient lavender mesh — two soft pools, top-left + right */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60rem 40rem at 12% -8%, rgba(94,105,210,0.18), transparent 60%)," +
            "radial-gradient(50rem 38rem at 92% 6%, rgba(130,143,255,0.10), transparent 60%)," +
            "radial-gradient(70rem 50rem at 50% 120%, rgba(94,105,210,0.10), transparent 60%)",
        }}
      />

      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 70% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* grain */}
      <NoiseOverlay opacity={0.035} />
    </div>
  );
}
