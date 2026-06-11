import { Eyebrow } from "@/components/ui/eyebrow";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { attribution } from "@/data/narrative";
import {
  capabilities,
  fleet,
  heroNumbers,
  memory,
  security,
  substrate,
  VERIFIED_AT,
} from "@/data/system";

// source: build brief — the generic-concept footnote, rendered verbatim (no numeric claim)
const GENERIC_CONCEPT_LINE =
  "Any sufficiently capable agent runtime could host a harness like this; this one is built on Claude Code and says so.";

// source: src/data/system.ts heroNumbers[0].display ("~33,900", verified 2026-06-12)
const SUBSTRATE_LINES_DISPLAY = heroNumbers[0].display ?? "~33,900";

const fmt = (n: number) => n.toLocaleString("en-US");

/* ----------------------------------------------------------------------------
 * The boundary, row by row. Derived from narrative.ts → attribution and the
 * dossier's "Attribution boundary" facts; every figure resolves to
 * src/data/system.ts.
 * ------------------------------------------------------------------------- */

interface BoundaryRow {
  layer: string;
  platform: string;
  hermes: string;
}

const ROWS: BoundaryRow[] = [
  {
    layer: "Runtime & engine",
    platform:
      "The Claude Code CLI — the terminal agent runtime, the tool loop, and the models themselves. The reasoning engine is entirely the platform's.",
    hermes: `The ${SUBSTRATE_LINES_DISPLAY} lines of substrate arranged around that engine — every piece replaceable, none of it pretending to be the model.`,
  },
  {
    layer: "Hook API",
    platform: `${substrate.lifecycleEventsUsed} lifecycle events — SessionStart through Stop — plus the settings wiring and response contract. The extension points are platform features.`,
    hermes: `${substrate.hookScripts} hook scripts (${fmt(substrate.hookLines)} lines) across ${substrate.hookRegistrations} registrations, saturating all ${substrate.lifecycleEventsUsed} events into one pipeline: routing, retrieval, interception, capture.`,
  },
  {
    layer: "Subagents & skills",
    platform:
      "The Task orchestration surface and the loaders — agent definitions, skill packaging, spawning and reporting.",
    hermes: `The content of all ${capabilities.agents} agent definitions and ${capabilities.skills} skills: the homelab expert, the security auditor, the closeout pipeline, the discovery teams.`,
  },
  {
    layer: "MCP protocol",
    platform: "The open protocol for typed tool servers, and the client that speaks it.",
    hermes: `${fleet.customBuilt} of the ${fleet.serversLive} live servers are custom-built — media-stack intelligence, banking, and the remote-site lazy proxy. The rest are third-party, and credited as third-party.`,
  },
  {
    layer: "Memory mechanism",
    platform:
      "CLAUDE.md project instructions and the auto-memory files that persist across sessions.",
    hermes: `Everything around them: a ${memory.captureLevels}-level capture pipeline, ${fmt(memory.vectors)} vectors in a local store, ${substrate.warmQueryMedianMs} ms median retrieval on every prompt, and a working memory that thinks between turns.`,
  },
  {
    layer: "Permission system",
    platform: "Permission modes and allowlists — what the runtime will and won't execute.",
    hermes: `Guardian + Sentinel layered on top: ${security.credentials} credentials the model can use but never read, ${security.sentinelRules} interception rules, and trust-tiered approval gates in front of network mutations.`,
  },
];

/**
 * AttributionTable — the full platform/engineering boundary as one quiet,
 * server-rendered table. Deliberately the stillest section on the page: no
 * tickers, no draw-ons — a single hairline between the columns is the line
 * the whole site promises never to blur. This is the trust anchor.
 */
export function AttributionTable() {
  return (
    <Section id="attribution" max="5xl">
      {/* Header — intentionally plain, no display heading */}
      <Reveal className="max-w-3xl">
        <Eyebrow>Attribution</Eyebrow>
        <h2 className="text-h2 mt-4 text-white">The boundary, in full.</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-pretty text-text-secondary">
          Hermes is built on Claude Code and never blurs whose work is whose. This table is the
          whole claim — what the platform provides, and what was engineered on top of it.
        </p>
      </Reveal>

      {/* The table */}
      <Reveal className="mt-10" delay={0.08}>
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)]">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <caption className="sr-only">
              The attribution boundary: what Claude Code provides versus what Hermes builds on it.
            </caption>
            <thead>
              <tr className="border-b border-hairline-strong">
                <th
                  scope="col"
                  className="w-[17%] px-5 py-4 font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase"
                >
                  boundary
                </th>
                <th scope="col" className="w-[38%] px-5 py-4 text-[13px] font-medium text-ink-muted">
                  {attribution.platform.title}
                </th>
                <th
                  scope="col"
                  className="border-l border-hairline px-5 py-4 text-[13px] font-medium text-brand-300"
                >
                  {attribution.hermes.title}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {ROWS.map((row) => (
                <tr key={row.layer} className="align-top">
                  <th
                    scope="row"
                    className="px-5 py-5 text-left font-mono text-[11px] leading-relaxed font-normal tracking-[0.1em] text-ink-faint uppercase"
                  >
                    {row.layer}
                  </th>
                  <td className="px-5 py-5 text-[13px] leading-relaxed text-ink-subtle">
                    {row.platform}
                  </td>
                  <td className="border-l border-hairline px-5 py-5 text-[13px] leading-relaxed text-ink-muted">
                    {row.hermes}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-hairline-strong">
                <td colSpan={3} className="px-5 py-5 font-mono text-[12px] leading-relaxed text-ink-subtle">
                  {GENERIC_CONCEPT_LINE}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Reveal>

      {/* Receipts */}
      <Reveal className="mt-6" delay={0.12}>
        <div className="flex flex-wrap items-center gap-2">
          <PathChip
            path=".claude/settings.local.json"
            note={`${substrate.hookRegistrations} hook registrations`}
          />
          <PathChip
            path=".claude/capabilities.yaml"
            note={`${capabilities.registered} capabilities`}
          />
          <PathChip
            path=".credentials/credential-map.yaml"
            note={`${security.credentials} keys — values only in the vault`}
          />
          <span className="ml-1 font-mono text-[11px] text-ink-faint">
            boundary verified {VERIFIED_AT}
          </span>
        </div>
      </Reveal>
    </Section>
  );
}
