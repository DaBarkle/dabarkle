import { Section } from "@/components/ui/section";
import { BentoGrid, BentoCell } from "@/components/ui/bento";
import { Reveal } from "@/components/ui/reveal";
import { harmonize } from "@/lib/tokens";
import { cn } from "@/lib/utils";
import { bentoTiles, type BentoTile } from "@/data/hermes";

/**
 * Span map. The 6 tiles (2 large + 4 medium, in source order
 * [L, M, M, M, M, L]) tile cleanly across the 6-col bento grid:
 *   row 1 → large(4) + medium(2)
 *   row 2 → medium(2) + medium(2) + medium(2)
 *   row 3 → large(6) full-width finale
 * so the final large reads as a deliberate closing statement rather
 * than leaving an awkward gap.
 */
function spanFor(tile: BentoTile, index: number, total: number): string {
  if (tile.size === "large") {
    return index === total - 1 ? "md:col-span-6" : "md:col-span-4";
  }
  return "md:col-span-2";
}

export function WhatItDoesBento() {
  const total = bentoTiles.length;

  return (
    <Section
      id="what-it-does"
      eyebrow="What it does"
      title="One system, many capabilities"
      lede="Every domain is a capability of one intelligent system — not a separate tool to invoke."
    >
      <Reveal direction="up">
        <BentoGrid>
          {bentoTiles.map((tile, i) => {
            const accent = harmonize(tile.color);
            return (
              <BentoCell key={tile.id} glow="rgba(94,105,210,0.16)" span={spanFor(tile, i, total)}>
                <div className="flex h-full flex-col gap-4 p-6 sm:p-7">
                  {/* icon chip */}
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft ring-1 ring-inset ring-[rgba(94,105,210,0.25)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      className="h-5 w-5 text-brand-300"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={tile.iconPath} />
                    </svg>
                  </span>

                  {/* title + recruiter line */}
                  <div className="flex flex-col gap-2">
                    <h3 className="flex items-start gap-2.5 text-base font-semibold leading-snug text-white sm:text-lg">
                      <span
                        aria-hidden="true"
                        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: accent }}
                      />
                      <span>{tile.title}</span>
                    </h3>
                    <p className="text-sm leading-relaxed text-text-secondary">{tile.recruiterLine}</p>
                  </div>

                  {/* technical detail chip — pinned to the bottom edge */}
                  <p
                    className={cn(
                      "mt-auto rounded-lg border border-hairline bg-white/[0.025] px-3 py-2",
                      "font-mono text-[11px] leading-relaxed text-text-tertiary",
                    )}
                  >
                    {tile.technicalLine}
                  </p>
                </div>
              </BentoCell>
            );
          })}
        </BentoGrid>
      </Reveal>
    </Section>
  );
}
