import { Github } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GlassCard } from "@/components/ui/glass-card";
import { GlowButton } from "@/components/ui/glow-button";
import { Magnetic } from "@/components/ui/magnetic";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { selfModelQuotes } from "@/data/mind";
import { selfImprovement, VERIFIED_AT } from "@/data/system";

// source: narrative.ts → explainerBeats[2] ("run in production on one
// engineer's real infrastructure since January 2026")
const PRODUCTION_SINCE = "January 2026";

// source: existing site contact surfaces (src/components/layout/footer.tsx) —
// the operator's public email and GitHub, already published on this site.
const EMAIL = "davidbarker774@gmail.com";
const GITHUB_URL = "https://github.com/DaBarkle";

// The hard-stop lesson — the only swarm-night quote vetted for publication.
const hardStop = selfModelQuotes[1];

/**
 * TheEngineer — the closing section (BUILD-SPEC §2.10). The flow inverts
 * here: after the system, the person. Asymmetric 7/5 split — bio-as-stance
 * on the left (three paragraphs grounded in what the page has already
 * shown, plus the hard-stop lesson as a human beat), working discipline and
 * the contact CTA on the right. Replaces the old Contact section; the
 * `#contact` anchor lands on the CTA card.
 *
 * Server component — motion lives in the imported client leaves.
 */

const HOW_I_WORK = [
  {
    k: "01",
    title: "Plan → approve → implement",
    body: "Substrate changes start life as design documents, not diffs.",
  },
  {
    k: "02",
    title: "Land end-to-end",
    body: "No phased rollouts, no observation periods. A change ships whole or it doesn't ship.",
  },
  {
    k: "03",
    title: "Read the telemetry",
    body: "Metrics nobody reads back are decoration. Telemetry exists to be acted on.",
  },
  {
    k: "04",
    title: "Structural beats behavioral",
    body: "A guarantee built into the runtime outranks an instruction the model is asked to follow.",
  },
] as const;

export function TheEngineer() {
  return (
    <Section id="engineer">
      <div className="mb-12 flex flex-col gap-4 sm:mb-16">
        <Eyebrow>The builder</Eyebrow>
        <SplitHeading as="h2" className="text-h1 text-white">
          The builder behind it.
        </SplitHeading>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
        {/* LEFT — bio as stance */}
        <div className="lg:col-span-7">
          <Reveal className="flex flex-col gap-6 text-body-lg text-pretty text-text-secondary">
            <p>
              David Barker is a systems builder, and Hermes is how he works: one ambient system,
              on his own hardware, in production since {PRODUCTION_SINCE}.{" "}
              <span className="font-medium text-white">Not just a user of AI; an operator of it.</span>{" "}
              A user prompts a model and hopes. An operator builds the runtime around it — memory,
              retrieval, guardrails, verification — until hope isn&apos;t part of the workflow.
            </p>
            <p>
              The discipline is unglamorous on purpose. Substrate changes start as design documents
              — {selfImprovement.planDocuments} of them on file — get approved, then land end-to-end.
              No phased rollouts, no quiet observation periods: a change ships whole, or it
              doesn&apos;t ship.
            </p>
            <p>
              And nothing gets to claim it works. Every number on this page was counted from disk on{" "}
              {VERIFIED_AT}; a nightly verifier re-audits {selfImprovement.verifierContracts}{" "}
              behavioral contracts; and when {selfImprovement.round2Agents} review agents were turned
              loose on the substrate itself, the run ended {selfImprovement.round2FindingsClosed} —
              every finding closed.
            </p>
            <p>
              He&apos;s also the kind of builder whose system remembers the night he had to pull the
              power — and whose response was to design so it can never happen again. In the
              system&apos;s own words, from its own identity file:
            </p>
          </Reveal>

          {/* The hard-stop lesson — vetted quote, rendered as the system's voice */}
          <Reveal delay={0.1} className="mt-8">
            <GlassCard tone="subtle" className="border-l-2 border-l-brand-400/40 p-6 sm:p-7">
              <blockquote className="font-mono text-[13px] leading-relaxed text-ink-muted">
                &ldquo;{hardStop.quote}&rdquo;
              </blockquote>
              <p className="mt-4 text-sm leading-relaxed text-ink-subtle">{hardStop.context}</p>
              <PathChip path={hardStop.source} className="mt-4" />
            </GlassCard>
          </Reveal>
        </div>

        {/* RIGHT — working discipline + contact */}
        <div className="flex flex-col gap-6 lg:col-span-5">
          <Reveal delay={0.1}>
            <GlassCard tone="subtle" className="p-6 sm:p-7">
              <p className="font-mono text-overline text-brand-300">How I work</p>
              <ul className="mt-6 flex flex-col gap-5">
                {HOW_I_WORK.map((item) => (
                  <li key={item.k} className="flex gap-4">
                    <span aria-hidden="true" className="font-mono text-[11px] leading-6 text-ink-faint">
                      {item.k}
                    </span>
                    <div>
                      <p className="text-sm leading-6 font-medium text-ink">{item.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-subtle">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>

          {/* Contact — replaces the old Contact section; #contact lands here */}
          <Reveal delay={0.18}>
            <div id="contact" className="scroll-mt-28">
              <GlassCard tone="strong" gradientBorder className="p-7 sm:p-8">
                <p className="font-mono text-overline text-brand-300">Contact</p>
                <h3 className="mt-4 text-h3 text-white">Talk to the builder, not the system.</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Harness design, ambient systems, or how any of this actually works under the hood —
                  I read every email.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Magnetic strength={0.2} className="inline-block">
                    <GlowButton href={`mailto:${EMAIL}`} size="lg" withArrow>
                      Email David
                    </GlowButton>
                  </Magnetic>
                  <GlowButton href={GITHUB_URL} external variant="secondary" size="lg">
                    <Github aria-hidden="true" className="h-4 w-4" />
                    GitHub
                  </GlowButton>
                </div>
                <p className="mt-6 font-mono text-xs text-ink-faint">
                  Plain email, read by a human — no forms, no tracking.
                </p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
