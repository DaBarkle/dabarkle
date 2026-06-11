import {
  Cable,
  Clapperboard,
  Globe,
  Inbox,
  Network,
  PanelsTopLeft,
  Presentation,
  Unplug,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SplitHeading } from "@/components/ui/split-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { projects, type Project } from "@/data/projects";

/**
 * BuiltWithIt — the projects bento (BUILD-SPEC §2.9). Cell size = real
 * significance (`projects.ts → size`), every cell earns its place with the
 * one concrete factual hook from the data layer — rendered in full, never
 * truncated. Typography + one small icon per cell; no images.
 *
 * The lg layout is an explicitly packed 3-column bento (18 grid units = 6
 * full rows, no holes), with the two flagship 2×2 cells on opposite sides
 * so the grid doesn't metronome. Internal alignment also varies per cell
 * ("feature" / "top" / "bottom"). Cells are keyed by project id; any
 * featured project without a placement entry still renders via fallback.
 *
 * Server component — motion lives in the imported client leaves.
 */

type CellAlign = "feature" | "top" | "bottom";

interface CellSpec {
  id: string;
  icon: LucideIcon;
  /** Placement classes. Row/col starts are lg-only; spans cascade from sm. */
  classes: string;
  align: CellAlign;
}

/**
 * Explicit lg placement (3 cols × 6 rows, fully packed):
 *   r1–2: [ hermes-pane 2×2          ][ tartarus   ]
 *         [                          ][ onboarding ]
 *   r3–4: [ logo tall ][ network-fleet 2×2         ]
 *         [           ][                           ]
 *   r5:   [ better-email 2×1         ][ slide      ]
 *   r6:   [ this-site ][ residential-unifi 2×1     ]
 */
const CELLS: CellSpec[] = [
  {
    id: "hermes-pane",
    icon: PanelsTopLeft,
    classes: "sm:col-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2",
    align: "feature",
  },
  { id: "tartarus", icon: Wifi, classes: "lg:col-start-3 lg:row-start-1", align: "top" },
  { id: "onboarding-expert", icon: Unplug, classes: "lg:col-start-3 lg:row-start-2", align: "top" },
  {
    id: "logo-motion",
    icon: Clapperboard,
    classes: "sm:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-3 lg:row-span-2",
    align: "bottom",
  },
  {
    id: "network-fleet",
    icon: Network,
    classes: "sm:col-span-2 lg:col-start-2 lg:row-start-3 lg:row-span-2",
    align: "feature",
  },
  {
    id: "better-email",
    icon: Inbox,
    classes: "sm:col-span-2 lg:col-start-1 lg:row-start-5",
    align: "top",
  },
  { id: "slide-engine", icon: Presentation, classes: "lg:col-start-3 lg:row-start-5", align: "top" },
  { id: "this-site", icon: Globe, classes: "lg:col-start-1 lg:row-start-6", align: "top" },
  {
    id: "residential-unifi",
    icon: Cable,
    classes: "sm:col-span-2 lg:col-start-2 lg:row-start-6",
    align: "top",
  },
];

function TechChips({ tech }: { tech: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded border border-hairline bg-white/[0.03] px-2 py-0.5 font-mono text-[10.5px] leading-relaxed text-ink-subtle"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectCell({ project, icon: Icon, align }: { project: Project; icon: LucideIcon; align: CellAlign }) {
  const feature = align === "feature";
  return (
    // Perf (BUILD-SPEC §0): only the two flagship cells get real glass blur;
    // the rest fake the surface with an opaque tint (≤3 blur panes/viewport).
    <SpotlightCard
      tone={feature ? "default" : "subtle"}
      className={feature ? "h-full" : "h-full bg-[rgba(16,16,22,0.8)] backdrop-blur-none"}
    >
      <div className="flex h-full flex-col p-6 sm:p-7">
        {/* Tagline as mono eyebrow + the cell's one icon */}
        <div className={align === "bottom" ? "flex items-start justify-between gap-4 pb-10" : "flex items-start justify-between gap-4"}>
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.14em] text-brand-300 uppercase">
            {project.tagline}
          </p>
          <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300/70" />
        </div>

        {/* "bottom" cells push the substance to the foot of the card */}
        <div className={align === "bottom" ? "mt-auto" : undefined}>
          <h3 className={feature ? "mt-3 text-xl font-semibold text-ink" : "mt-2.5 text-lg font-semibold text-ink"}>
            {project.name}
          </h3>
          <p
            className={
              feature
                ? "mt-3 max-w-prose text-[15px] leading-relaxed text-ink-muted"
                : "mt-2.5 text-sm leading-relaxed text-ink-muted"
            }
          >
            {project.hook}
          </p>
        </div>

        <div className={align === "bottom" ? "pt-5" : "mt-auto pt-5"}>
          <TechChips tech={project.tech} />
        </div>
      </div>
    </SpotlightCard>
  );
}

export function BuiltWithIt() {
  const featured = projects.filter((p) => p.featured);
  const byId = new Map(featured.map((p) => [p.id, p]));
  // Placed cells first (explicit bento), then any featured stragglers.
  const placedIds = new Set(CELLS.map((c) => c.id));
  const stragglers = featured.filter((p) => !placedIds.has(p.id));

  return (
    <Section id="projects">
      <div className="mb-12 flex flex-col gap-4 sm:mb-14">
        <Eyebrow>Projects</Eyebrow>
        <SplitHeading as="h2" className="text-h1 text-white">
          Built with it.
        </SplitHeading>
        <Reveal direction="none" delay={0.15}>
          <p className="max-w-xl text-body-lg text-pretty text-text-secondary">
            Hermes isn&apos;t a demo — it ships things.
          </p>
        </Reveal>
      </div>

      <Stagger
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[minmax(10.5rem,auto)]"
        gap={0.07}
      >
        {CELLS.map((cell) => {
          const project = byId.get(cell.id);
          if (!project) return null;
          return (
            <StaggerItem key={cell.id} className={cell.classes}>
              <ProjectCell project={project} icon={cell.icon} align={cell.align} />
            </StaggerItem>
          );
        })}
        {stragglers.map((project) => (
          <StaggerItem key={project.id} className={project.size === "sm" ? undefined : "sm:col-span-2"}>
            <ProjectCell project={project} icon={Globe} align="top" />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
