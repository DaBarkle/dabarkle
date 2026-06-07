import { cn } from "@/lib/utils";

/**
 * Eyebrow — a small mono label with a leading tick. Sets up section headers.
 */
export function Eyebrow({
  children,
  className,
  dotless = false,
}: {
  children: React.ReactNode;
  className?: string;
  dotless?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-overline text-brand-300",
        className,
      )}
    >
      {!dotless && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(94,105,210,0.8)]"
        />
      )}
      {children}
    </span>
  );
}
