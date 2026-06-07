import { Marquee } from "@/components/ui/marquee";

const STACK = [
  "Claude Code",
  "Next.js",
  "React",
  "TypeScript",
  "Model Context Protocol",
  "Qdrant",
  "UniFi",
  "Wazuh SIEM",
  "1Password",
  "Tailscale",
  "Podman",
  "Bazzite",
];

export function TrustStrip() {
  return (
    <section aria-label="Technology stack" className="relative border-y border-hairline py-8">
      <p className="mb-6 text-center font-mono text-overline text-text-tertiary">
        The stack behind the system
      </p>
      <Marquee durationSeconds={42}>
        {STACK.map((item) => (
          <span
            key={item}
            className="mx-1 whitespace-nowrap rounded-full border border-hairline bg-white/[0.02] px-4 py-2 text-sm font-medium text-text-secondary"
          >
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
