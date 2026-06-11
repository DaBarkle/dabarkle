import { Eyebrow } from "@/components/ui/eyebrow";
import { GoDeeper } from "@/components/ui/go-deeper";
import { PathChip } from "@/components/ui/path-chip";
import { Reveal, Stagger } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { infrastructure, selfImprovement, VERIFIED_AT } from "@/data/system";

/* ----------------------------------------------------------------------------
 * Verbatim figures from the discovery dossier (harness → "Infrastructure
 * managed by Hermes") that don't live in src/data/system.ts. Privacy rule:
 * the second UniFi site is only ever "a relative's remote site".
 * ------------------------------------------------------------------------- */

// source: "Host hardware: Ryzen 7 7800X3D, 64GB DDR5, RTX 3090, immutable Bazzite" — as-built §2.1
const HOST_HARDWARE = "Ryzen 7 7800X3D · 64 GB DDR5 · RTX 3090";
// source: "Nyx VM (Ubuntu 24.04.3, 2 vCPU / 4GB RAM, LUKS+LVM encrypted)" — as-built §6.1
const VM_PLATFORM = "Ubuntu 24.04.3 · LUKS-encrypted";
// source: as-built §7.2/§14.9 — 7 services in one compose file, 6 of them via
// network_mode: service:<gateway>. Real service names generalised to roles for
// publication (personal stack).
const VPN_TENANTS = [
  "tv-automation",
  "film-automation",
  "download-client",
  "indexer-manager",
  "request-portal",
  "quality-sync",
] as const;
// source: host runs Wazuh Manager (containerized), Uptime Kuma, and the Hermes substrate — as-built §1.3/§3.1/§15.1; Qdrant is live at localhost:6333 (system.ts memory source)
const HOST_SERVICES = ["Hermes substrate", "Wazuh SIEM", "Qdrant vector store", "Uptime Kuma monitoring"] as const;
// source: "static blackhole routes for the full IPv4 space (0.0.0.0/1 and 128.0.0.0/1) persisted in the UniFi controller DB" — as-built §2.11
const BLACKHOLE_ROUTES = "0.0.0.0/1 + 128.0.0.0/1";
// source: "tears down after 5 minutes idle; writes require a fresh phone tap via Guardian force_approval" — as-built §21.4–21.5
const REMOTE_IDLE_TEARDOWN_MIN = 5;
// source: "was 3 boot-race incidents in 2 months" — system.ts infrastructure.cascadeFailuresAfterFix note; as-built §14.9
const BOOT_INCIDENTS_BEFORE = 3;
// source: "Archived as-built versions: 39 (v4.7 → v9.2) + exactly 1 current" — docs/asbuilt/archive listing
const ARCHIVED_VERSIONS = 39;
// source: "~25TB across 3 NTFS drives" — system.ts infrastructure.mediaLibraryTb note; as-built §2.1 drive table
const LIBRARY_DRIVES = 3;

/* ---- Defence-in-depth instrument row -------------------------------------- */

const DEFENSES: ReadonlyArray<{ value: string; label: string; detail: string }> = [
  {
    value: String(infrastructure.stackedVpnTunnels),
    label: "stacked VPN tunnels",
    detail: "UDM tunnel + gateway WireGuard",
  },
  {
    value: String(infrastructure.killSwitchLayers),
    label: "kill-switch layers",
    detail: "fail-closed at the routing table",
  },
  {
    value: `${infrastructure.leakCheckIntervalSeconds}s`,
    label: "egress leak checks",
    detail: "container IP vs gateway IP",
  },
  {
    value: String(infrastructure.uptimeKumaMonitors),
    label: "Uptime Kuma monitors",
    detail: "media stack, VPN, SIEM, host",
  },
  {
    value: `~${infrastructure.mediaLibraryTb} TB`,
    label: "library under management",
    detail: `across ${LIBRARY_DRIVES} drives`,
  },
];

/* ---- The documentation pipeline, step by step ------------------------------ */

const PIPELINE: ReadonlyArray<{ k: string; label: string; detail: string }> = [
  {
    k: "01",
    label: "change spec",
    detail: "every substantive session auto-produces a structured change-set proposal from what actually happened",
  },
  {
    k: "02",
    label: "surgical update",
    detail: "a maintenance agent applies it mechanically to the as-built doc — edits, never rewrites",
  },
  {
    k: "03",
    label: "GO / NO-GO",
    detail: "a skeptical evaluator judges the result before the new version is allowed to land",
  },
];

/**
 * DeepInfrastructure — the two-machine topology drawn as nested panels (the
 * VPN-gateway ring physically contains its six tenants: remove the ring and
 * the chips have no edges out), the defence-in-depth instrument row, the
 * trust-tiered UniFi fleet, and the self-maintaining as-built doc with its
 * boot-cascade receipt.
 */
export function DeepInfrastructure() {
  return (
    <Section id="infrastructure" max="6xl">
      {/* Header */}
      <Reveal className="max-w-3xl">
        <Eyebrow>Infrastructure</Eyebrow>
        <SplitHeading as="h2" className="text-h1 mt-4 text-white">
          Real infrastructure, real stakes.
        </SplitHeading>
        <p className="text-body-lg mt-5 text-pretty text-text-secondary">
          Not a lab exercise: a two-machine homelab — hypervisor, SIEM, GPU transcode,
          ~{infrastructure.mediaLibraryTb} TB of media — where a careless restart has
          consequences. The system this page describes operates it daily, under approval gates.
        </p>
      </Reveal>

      {/* Topology panel */}
      <Reveal className="mt-14">
        <div className="rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] p-6 sm:p-8">
          {/* WAN rail */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-ink-subtle">
            <span className="text-ink-faint">internet</span>
            <span aria-hidden="true" className="text-ink-faint">
              →
            </span>
            <span className="text-ink">UDM gateway</span>
            <span aria-hidden="true" className="text-ink-faint">
              ·
            </span>
            <span>policy-routes the VM&apos;s VLAN into VPN tunnel №1 — the VM stacks №2 inside</span>
          </div>

          <div className="mt-6 grid items-stretch gap-5 lg:grid-cols-[minmax(0,5fr)_auto_minmax(0,7fr)]">
            {/* Bazzite host */}
            <div className="rounded-xl border border-hairline bg-white/[0.02] p-5">
              <p className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
                bazzite host
              </p>
              <h3 className="mt-1.5 text-[15px] font-medium text-white">
                Immutable Fedora Atomic
              </h3>
              <p className="mt-1 font-mono text-[11px] text-ink-subtle">{HOST_HARDWARE}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {HOST_SERVICES.map((svc) => (
                  <li
                    key={svc}
                    className="rounded-md border border-hairline bg-white/[0.03] px-2 py-1 font-mono text-[11px] text-ink-muted"
                  >
                    {svc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bridge connector */}
            <div className="flex items-center justify-center gap-2 lg:flex-col">
              <span aria-hidden="true" className="h-px w-10 bg-hairline-strong lg:h-10 lg:w-px" />
              <span className="font-mono text-[10px] tracking-[0.14em] text-ink-faint uppercase lg:[writing-mode:vertical-rl]">
                host-only bridge
              </span>
              <span aria-hidden="true" className="h-px w-10 bg-hairline-strong lg:h-10 lg:w-px" />
            </div>

            {/* Nyx VM with the VPN-gateway ring */}
            <div className="rounded-xl border border-hairline bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.14em] text-brand-300 uppercase">
                    nyx vm
                  </p>
                  <h3 className="mt-1.5 text-[15px] font-medium text-white">{VM_PLATFORM}</h3>
                </div>
                <PathChip
                  path="/srv/docker/docker-compose.yml"
                  note={`${infrastructure.mediaStackServices} services`}
                />
              </div>
              <div className="mt-4 rounded-lg border border-dashed border-brand-400/40 bg-brand-500/5 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[12px] text-brand-300">vpn-gateway — sole WAN egress</p>
                  <p className="font-mono text-[10px] tracking-[0.1em] text-ink-faint uppercase">
                    tunnel №2 · WireGuard
                  </p>
                </div>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {VPN_TENANTS.map((svc) => (
                    <li
                      key={svc}
                      className="rounded-md border border-hairline bg-[rgba(10,10,14,0.85)] px-2 py-1 font-mono text-[11px] text-ink-muted"
                    >
                      {svc}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-subtle">
                {infrastructure.containersInVpnNamespace} containers share the gateway&apos;s
                network namespace. If the tunnel drops they don&apos;t leak — they have no network
                path at all. VPN-or-nothing, by construction.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Defence-in-depth instrument row */}
      <Stagger className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" gap={0.06}>
        {DEFENSES.map((d) => (
          <Reveal asChild key={d.label}>
            <div className="rounded-xl border border-hairline bg-white/[0.02] p-4">
              <p className="font-mono text-2xl font-medium tracking-tight text-white tabular-nums">
                {d.value}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-ink-subtle">{d.label}</p>
              <p className="mt-0.5 font-mono text-[10px] text-ink-faint">{d.detail}</p>
            </div>
          </Reveal>
        ))}
      </Stagger>

      {/* UniFi fleet — trust tiers */}
      <Reveal className="mt-12">
        <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
          UniFi fleet — two sites, two trust tiers
        </p>
      </Reveal>
      <Stagger className="mt-5 grid gap-3 sm:grid-cols-2" gap={0.08}>
        <Reveal asChild>
          <div className="rounded-xl border border-hairline bg-white/[0.02] p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[12px] text-ink">home UDM</p>
              <p className="font-mono text-[10px] tracking-[0.12em] text-teal-400 uppercase">
                trust · high
              </p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-subtle">
              Direct on the LAN — and still not trusted blindly: network writes are default-deny,
              gated by a PreToolUse hook in front of every mutating tool.
            </p>
          </div>
        </Reveal>
        <Reveal asChild>
          <div className="rounded-xl border border-hairline bg-white/[0.02] p-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-[12px] text-ink">a relative&apos;s remote site</p>
              <p className="font-mono text-[10px] tracking-[0.12em] text-accent-400 uppercase">
                trust · medium
              </p>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-subtle">
              Reached only through an ephemeral WireGuard tunnel inside an isolated network
              namespace — lazy-spawned on first call, torn down after {REMOTE_IDLE_TEARDOWN_MIN}{" "}
              idle minutes. Every write requires a fresh phone approval.
            </p>
          </div>
        </Reveal>
      </Stagger>

      {/* The documentation pipeline */}
      <Reveal className="mt-14">
        <div className="rounded-2xl border border-hairline bg-[rgba(16,16,22,0.8)] p-6 sm:p-8">
          <p className="font-mono text-[11px] tracking-[0.14em] text-ink-subtle uppercase">
            The documentation pipeline — drift, solved structurally
          </p>
          <div className="mt-5 grid divide-y divide-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {PIPELINE.map((step) => (
              <div key={step.k} className="py-4 sm:px-5 sm:py-1 sm:first:pl-0 sm:last:pr-0">
                <p className="font-mono text-[11px] text-ink-faint">{step.k}</p>
                <p className="mt-1 font-mono text-[13px] text-ink">{step.label}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-subtle">{step.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-6">
            <p className="font-mono text-[13px] text-ink">
              {selfImprovement.asbuiltVersion} ·{" "}
              {selfImprovement.asbuiltLines.toLocaleString("en-US")} lines ·{" "}
              {selfImprovement.asbuiltVersionsArchived} versions retained
            </p>
            <PathChip
              path="docs/asbuilt/current/"
              note={`exactly 1 current · ${ARCHIVED_VERSIONS} archived`}
            />
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-muted">
            Receipt: a gateway boot race caused {BOOT_INCIDENTS_BEFORE} cascade failures in 2
            months. Orchestration moved from Docker to systemd —{" "}
            {infrastructure.cascadeFailuresAfterFix} since. The incident, the root cause, and the
            fix are all in the doc.
          </p>
        </div>
      </Reveal>
      <Reveal className="mt-6">
        <p className="font-mono text-[11px] text-ink-faint">verified {VERIFIED_AT}</p>
      </Reveal>

      {/* Expert detail */}
      <div className="mt-14">
        <GoDeeper summary="kill switches, leak checks, and the SIEM split">
          <p>
            The {infrastructure.killSwitchLayers} kill-switch layers are independent: blackhole
            routes covering the full IPv4 space ({BLACKHOLE_ROUTES}) persisted in the router&apos;s
            controller database; a hardened split-VPN config that refuses to remove them on exit;
            and continuous health monitoring with a dedicated probe server on the VM. A crash of
            the VPN tooling leaves traffic blackholed, not leaking.
          </p>
          <p className="mt-3">
            Leak detection is empirical, per container: every{" "}
            {infrastructure.leakCheckIntervalSeconds} seconds a cron job compares each media
            container&apos;s actual egress IP against the VPN gateway&apos;s and pushes pass/fail
            to a monitor — so silence itself raises the alert. Healthy state is defined as the
            container&apos;s egress differing from the VM&apos;s own.
          </p>
          <p className="mt-3">
            The SIEM respects the immutable host: the Wazuh manager runs containerized on Bazzite,
            while the VM — the machine doing the risky work — runs a native agent reporting back
            over the mesh VPN.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <PathChip path="vpn-check.sh" note="per-container egress check" />
            <PathChip path="nyx-media-stack.service" note="boot orchestration" />
          </div>
        </GoDeeper>
      </div>
    </Section>
  );
}
