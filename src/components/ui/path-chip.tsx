import { cn } from "@/lib/utils";

/**
 * PathChip — a tiny mono "receipt" citing a real file path, with an optional
 * note (line count, verification stamp) after a middot. The Technical Mono
 * layer's smallest unit of credibility. Pure server component.
 */
export function PathChip({
  path,
  note,
  className,
}: {
  path: string;
  note?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-baseline gap-1.5 rounded-md border border-hairline bg-white/[0.03] px-2 py-1",
        "font-mono text-[11px] leading-none text-ink-subtle",
        className,
      )}
    >
      <span className="truncate">{path}</span>
      {note && (
        <>
          <span aria-hidden="true" className="text-ink-faint">
            ·
          </span>
          <span className="whitespace-nowrap text-ink-faint">{note}</span>
        </>
      )}
    </span>
  );
}
