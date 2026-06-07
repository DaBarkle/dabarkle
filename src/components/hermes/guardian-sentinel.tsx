"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { CountUp } from "@/components/shared/count-up";
import {
  guardianEndpoints,
  credentialDomains,
  sentinelStats,
} from "@/data/hermes";

function ArchitectureDiagram() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6 sm:p-8">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
        How a credential gets to a service without touching the LLM
      </p>
      <h3 className="mb-6 text-lg font-semibold text-white">The trust boundary</h3>

      <div className="grid grid-cols-1 items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
        <Node label="1Password vault" sub="Service account · Guardian vault only" color="#0f766e" />
        <Arrow />
        <Node label="Guardian broker" sub="localhost:3400 · hermes-guardian OS user" color="#6366f1" highlight />
        <Arrow />
        <Node label="Target service" sub="Receives credential as env var, never as text" color="#f59e0b" />
      </div>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-red-300">
          Credentials cannot cross this line
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Node label="LLM (Claude)" sub="Issues commands; never sees values" color="#818cf8" muted />
        <Node label="Sentinel hooks" sub="PreToolUse rewriting · PostToolUse leak detection" color="#fbbf24" muted />
        <Node label="Operator" sub="Approves provisions and rotations" color="#a5b4fc" muted />
      </div>
    </div>
  );
}

function Node({
  label,
  sub,
  color,
  highlight,
  muted,
}: {
  label: string;
  sub: string;
  color: string;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-bg/60 p-4 text-center"
      style={{
        borderColor: highlight ? `${color}66` : "rgba(255,255,255,0.06)",
        boxShadow: highlight ? `0 0 24px ${color}22, inset 0 0 0 1px ${color}30` : undefined,
        opacity: muted ? 0.85 : 1,
      }}
    >
      <div className="mb-1 text-sm font-semibold text-white">{label}</div>
      <div className="font-mono text-[10.5px] text-text-tertiary">{sub}</div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }} />
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex items-center justify-center text-text-muted">
      <svg viewBox="0 0 24 12" className="hidden h-3 w-10 md:block" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M0 6h22m0 0l-4-4m4 4l-4 4" />
      </svg>
      <svg viewBox="0 0 12 24" className="h-10 w-3 md:hidden" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 0v22m0 0l-4-4m4 4l4-4" />
      </svg>
    </div>
  );
}

function RewriteExample() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
        PreToolUse rewriting · transparent
      </p>
      <h3 className="mb-4 text-lg font-semibold text-white">What the LLM actually sees</h3>

      <div className="space-y-3">
        <CodeRow
          intent="The LLM asks to read a file with secrets"
          intentColor="#a5b4fc"
          rewriteLabel="The hook rewrites it before execution"
          before='cat /etc/hermes/credentials.yaml'
          after='POST /read-redacted { path: "/etc/hermes/credentials.yaml" }'
        />
        <ResultBlock
          lines={[
            ["ssh.nyx.password:", "[GUARDIAN:ssh.nyx.password]"],
            ["sabnzbd.api_key:", "[GUARDIAN:sabnzbd.api_key]"],
            ["tartarus.wifi:", "[GUARDIAN:tartarus.wifi]"],
          ]}
        />
      </div>
      <p className="mt-4 font-mono text-[11px] text-text-muted">
        The LLM reasons over the placeholders. Guardian injects real values into target commands at the
        moment of execution — they live in a separate process, never in the conversation.
      </p>
    </div>
  );
}

function CodeRow({
  intent,
  intentColor,
  rewriteLabel,
  before,
  after,
}: {
  intent: string;
  intentColor: string;
  rewriteLabel: string;
  before: string;
  after: string;
}) {
  return (
    <div>
      <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-widest" style={{ color: intentColor }}>
        {intent}
      </p>
      <pre className="overflow-x-auto rounded-lg border border-white/[0.05] bg-bg/70 p-3 font-mono text-[11.5px] text-text-secondary">
        <code>{before}</code>
      </pre>
      <p className="mb-1.5 mt-3 font-mono text-[10.5px] uppercase tracking-widest text-accent-400">
        {rewriteLabel}
      </p>
      <pre className="overflow-x-auto rounded-lg border border-accent-500/20 bg-accent-500/[0.04] p-3 font-mono text-[11.5px] text-accent-100">
        <code>{after}</code>
      </pre>
    </div>
  );
}

function ResultBlock({ lines }: { lines: readonly (readonly [string, string])[] }) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-bg/70 p-3">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-text-muted">
        Returned to the LLM
      </p>
      <div className="space-y-1 font-mono text-[12px]">
        {lines.map(([k, v]) => (
          <div key={k} className="flex flex-wrap items-baseline gap-2">
            <span className="text-text-tertiary">{k}</span>
            <span className="rounded bg-emerald-400/10 px-1.5 py-0.5 text-emerald-300">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function EndpointGrid() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
        Guardian · localhost:3400
      </p>
      <h3 className="mb-4 text-lg font-semibold text-white">9 endpoints</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {guardianEndpoints.map((ep, i) => (
          <motion.div
            key={ep.path}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: 0.04 * i }}
            className="group rounded-lg border border-white/[0.05] bg-bg/40 p-2.5 transition-colors hover:border-white/[0.12]"
            style={{ boxShadow: ep.primary ? "inset 0 0 0 1px rgba(99,102,241,0.30)" : undefined }}
          >
            <div className="mb-1 flex items-center gap-2">
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] font-bold ${
                  ep.method === "POST"
                    ? "bg-accent-500/15 text-accent-300"
                    : "bg-teal-500/15 text-teal-300"
                }`}
              >
                {ep.method}
              </span>
              <code className="font-mono text-[12px] text-white">{ep.path}</code>
              {ep.primary && (
                <span className="ml-auto rounded-full bg-brand-500/15 px-1.5 py-0.5 font-mono text-[9.5px] text-brand-300">
                  primary
                </span>
              )}
            </div>
            <p className="text-[11px] leading-snug text-text-tertiary">{ep.purpose}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CredentialDomainBars() {
  const max = Math.max(...credentialDomains.map((d) => d.count));
  const total = credentialDomains.reduce((s, d) => s + d.count, 0);
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-surface-1 p-6">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-accent-400">
        Protected credential inventory
      </p>
      <h3 className="mb-1 text-lg font-semibold text-white">
        <CountUp value={total} className="font-mono text-2xl" /> credentials across 8 domains
      </h3>
      <p className="mb-5 text-xs text-text-tertiary">
        Every value lives in a 1Password vault that the operator cannot read directly — only the Guardian
        service account can.
      </p>
      <div className="space-y-3">
        {credentialDomains.map((d, i) => (
          <div key={d.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="text-xs font-medium text-white">{d.label}</span>
              <span className="font-mono text-[11px] text-text-tertiary">{d.count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(d.count / max) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${d.color}, ${d.color}77)` }}
              />
            </div>
            <p className="mt-1 truncate font-mono text-[10px] text-text-muted">
              {d.examples.slice(0, 4).join(" · ")}
              {d.examples.length > 4 ? " · …" : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsRow() {
  const items = [
    { label: "Protected", value: sentinelStats.protectedCredentials, suffix: "" },
    { label: "Leaks intercepted", value: sentinelStats.leaksIntercepted, suffix: "" },
    { label: "Sentinel rules", value: sentinelStats.totalRules, suffix: "" },
    { label: "Reached LLM", value: 0, suffix: "" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 * i }}
          className="rounded-2xl border border-white/[0.06] bg-surface-1 p-4 text-center"
        >
          <div className="font-mono text-3xl font-bold text-white">
            <CountUp value={item.value} duration={1.2} />
          </div>
          <div className="mt-1 text-xs text-text-tertiary">{item.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function GuardianSentinel() {
  return (
    <section className="relative overflow-hidden bg-bg py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(800px circle at 80% 10%, rgba(251, 191, 36, 0.10), transparent 60%), radial-gradient(800px circle at 20% 90%, rgba(99, 102, 241, 0.10), transparent 60%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            overline="Flagship · Security"
            title="Guardian + Sentinel"
            subtitle="Structural credential protection. The LLM never sees a password, an API key, or a WireGuard private key — even when it's executing commands that use them. A brokered execution model with self-learning leak interception keeps the boundary intact as the system grows."
            centered
          />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-12">
          <ArchitectureDiagram />
        </ScrollReveal>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ScrollReveal delay={0.05}>
            <RewriteExample />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <EndpointGrid />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.1} className="mt-8">
          <CredentialDomainBars />
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-8">
          <StatsRow />
        </ScrollReveal>
      </div>
    </section>
  );
}
