import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Philosophy } from "@/components/home/philosophy";
import { Capabilities } from "@/components/home/capabilities";
import { FeaturedWork } from "@/components/home/featured-work";
import { Approach } from "@/components/home/approach";
import { Metrics } from "@/components/home/metrics";
import { Contact } from "@/components/home/contact";
import { Footer } from "@/components/layout/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />
        <TrustStrip />
        <Philosophy />
        <Capabilities />
        <SectionDivider variant="brand" />
        <FeaturedWork />
        <Approach />
        <SectionDivider variant="mixed" />
        <Metrics />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
