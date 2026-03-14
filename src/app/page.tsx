import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { ContactSection } from "@/components/home/contact-section";
import { Footer } from "@/components/layout/footer";
import { SectionDivider } from "@/components/shared/section-divider";

export default function HomePage() {
  return (
    <>
      <main id="main">
        <section id="hero">
          <HeroSection />
        </section>
        <AboutSection />
        <SectionDivider variant="mixed" />
        <ProjectsSection />
        <SectionDivider variant="accent" />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
