import type { Metadata } from "next";
import { DeepHero } from "@/components/deep/deep-hero";
import { DeepNav } from "@/components/deep/deep-nav";
import { DeepSubstrate } from "@/components/deep/substrate";
import { DeepMemory } from "@/components/deep/memory";
import { DeepSecurity } from "@/components/deep/security";
import { DeepCapabilities } from "@/components/deep/capabilities";
import { DeepFleet } from "@/components/deep/fleet";
import { DeepSelfImprove } from "@/components/deep/selfimprove";
import { DeepInfrastructure } from "@/components/deep/infrastructure";
import { AttributionTable } from "@/components/deep/attribution-table";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Hermes — the deep dive",
  description:
    "The engineering record of Hermes, an ambient AI harness: 56 hook scripts across all 9 lifecycle events, 20.8ms semantic retrieval, structural credential security over 37 secrets, a 4-zone working memory on a 60s heartbeat, and a nightly 23-contract self-verifier. Built on Claude Code; every number verified from disk.",
  openGraph: {
    title: "Hermes — the deep dive",
    description:
      "Subsystem-by-subsystem engineering record of an ambient AI harness, with receipts. Built on Claude Code.",
    type: "article",
  },
};

export default function HermesDeepDivePage() {
  return (
    <>
      <main id="main">
        <DeepHero />
        <DeepNav />
        {/* DeepNav is sticky (~top-20 + rail height); give anchored sections extra clearance */}
        <div className="[&_section[id]]:scroll-mt-36">
          <DeepSubstrate />
          <DeepMemory />
          <DeepSecurity />
          <DeepCapabilities />
          <DeepFleet />
          <DeepSelfImprove />
          <DeepInfrastructure />
          <AttributionTable />
        </div>
      </main>
      <Footer />
    </>
  );
}
