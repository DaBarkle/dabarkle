"use client";

import { SectionHeader } from "@/components/shared/section-header";
import { GridBackground } from "@/components/aceternity/grid-background";
import { TieredRouting } from "./tiered-routing";
import { ProtocolView } from "./protocol-view";
import { ValidationGates } from "./validation-gates";

export function IntelligenceLayer() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <GridBackground variant="grid-small" gridSize={48} color="rgba(139,92,246,0.02)">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeader
            overline="Decision Making"
            title="The Intelligence Layer"
            subtitle="Not every session needs the same treatment. The system analyzes change complexity, routes to the right tier, communicates through a structured protocol, and validates every output through three independent gates."
          />
        </div>
        <TieredRouting />
        <ProtocolView />
        <ValidationGates />
      </GridBackground>
    </section>
  );
}
