import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
  tone?: "default" | "inverse";
};

export function BrandMark({
  className,
  compact = false,
  tone = "default",
}: BrandMarkProps) {
  const isInverse = tone === "inverse";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-full border backdrop-blur-md",
          isInverse
            ? "border-white/14 bg-white/10 shadow-[0_20px_40px_-28px_rgba(95,59,199,0.6)]"
            : "border-primary/20 bg-white/70 shadow-[0_14px_30px_-20px_color-mix(in_oklab,var(--color-primary)_65%,transparent)]",
          compact ? "h-9 w-9" : "h-11 w-11",
        )}
      >
        <span
          className={cn(
            "absolute rounded-full",
            isInverse ? "border-white/12 bg-white/6" : "border-primary/18 bg-primary/6",
            compact ? "inset-1.5" : "inset-2",
          )}
        />
        <span
          className={cn(
            "absolute rounded-full",
            isInverse ? "border-white/16 bg-white/10" : "border-primary/25 bg-primary/12",
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
        <span
          className={cn(
            "block text-lg font-semibold tracking-[-0.03em]",
            isInverse ? "text-white" : "text-foreground",
          )}
        >
          Growonio
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 block text-[0.7rem] font-medium uppercase tracking-[0.26em]",
              isInverse ? "text-white/58" : "text-muted-foreground",
            )}
          >
            Growth Systems
          </span>
        )}
      </div>
    </div>
  );
}
