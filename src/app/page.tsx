import { NarrativeHero } from "@/components/narrative/hero";
import { Explainer } from "@/components/narrative/explainer";
import { Attribution } from "@/components/narrative/attribution";
import { LifeOfAPrompt } from "@/components/narrative/life-of-a-prompt";
import { MindSection } from "@/components/narrative/mind";
import { Guardrails } from "@/components/narrative/guardrails";
import { SelfMaintenance } from "@/components/narrative/self-maintenance";
import { ByTheNumbers } from "@/components/narrative/by-the-numbers";
import { BuiltWithIt } from "@/components/narrative/built-with-it";
import { TheEngineer } from "@/components/narrative/engineer";
import { Footer } from "@/components/layout/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <main id="main">
        {/* Act I — demonstration, then definition */}
        <NarrativeHero />
        <Explainer />
        <Attribution />

        {/* Act II — the system, traced end to end */}
        <LifeOfAPrompt />
        <MindSection />
        <Guardrails />
        <SelfMaintenance />
        <SectionDivider variant="brand" />

        {/* Act III — proof, then the person */}
        <ByTheNumbers />
        <BuiltWithIt />
        <TheEngineer />
      </main>
      <Footer />
    </>
  );
}
