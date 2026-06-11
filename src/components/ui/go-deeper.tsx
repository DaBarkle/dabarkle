import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * GoDeeper — a styled native `<details>` for expert-level detail that most
 * readers can skip. Server-renderable (zero JS): the chevron rotation rides
 * the `group-open:` variant, content carries a hairline left border. The
 * mono "Go deeper —" affordance keeps the receipts-layer voice.
 */
export function GoDeeper({
  summary,
  children,
  className,
}: {
  summary: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <details className={cn("group", className)}>
      <summary
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 select-none",
          "font-mono text-[13px] text-brand-300 transition-colors duration-150 hover:text-brand-200",
          // Hide the native disclosure marker across engines.
          "list-none [&::-webkit-details-marker]:hidden",
        )}
      >
        <ChevronRight
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 text-brand-400 transition-transform duration-200 ease-[var(--ease-micro)] group-open:rotate-90"
        />
        <span>
          Go deeper — <span className="text-ink-muted">{summary}</span>
        </span>
      </summary>
      <div className="mt-4 ml-[5px] border-l border-hairline pl-5 text-sm leading-relaxed text-ink-muted">
        {children}
      </div>
    </details>
  );
}
