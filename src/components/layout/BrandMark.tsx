import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border border-primary/20 bg-white/70 shadow-[0_14px_30px_-20px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] backdrop-blur-md",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      >
        <span
          className={cn(
            "absolute rounded-full border border-primary/18 bg-primary/6",
            compact ? "inset-1.5" : "inset-2",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full border border-primary/25 bg-primary/12",
            compact ? "inset-3" : "inset-3.5",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full bg-gradient-to-br from-primary via-violet-400 to-fuchsia-400 shadow-[0_0_20px_-8px_color-mix(in_oklab,var(--color-primary)_90%,transparent)]",
            compact ? "h-2.5 w-2.5" : "h-3 w-3",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full bg-primary/80",
            compact ? "right-1.5 top-1.5 h-1.5 w-1.5" : "right-2 top-2 h-2 w-2",
          )}
        />
      </div>

      <div className="leading-none">
        <span className="block text-lg font-semibold tracking-[-0.03em] text-foreground">
          Growonio
        </span>
        {!compact && (
          <span className="mt-1 block text-[0.7rem] font-medium uppercase tracking-[0.26em] text-muted-foreground">
            Growth Systems
          </span>
        )}
      </div>
    </div>
  );
}
