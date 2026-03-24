import { cn } from "@/lib/utils";

type CaseStudyStat = {
  label: string;
  value: string;
};

type CaseStudyStatsProps = {
  stats: CaseStudyStat[];
  className?: string;
  variant?: "compact" | "highlight";
};

export function CaseStudyStats({
  stats,
  className,
  variant = "compact",
}: CaseStudyStatsProps) {
  const visibleStats = stats.filter(
    (stat) => stat.label.trim().length > 0 && stat.value.trim().length > 0,
  );

  if (visibleStats.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid gap-3",
        variant === "compact"
          ? "sm:grid-cols-2"
          : "sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {visibleStats.map((stat) => (
        <div
          key={`${stat.label}-${stat.value}`}
          className={cn(
            "rounded-[1.5rem] border border-border/60 bg-background/90 backdrop-blur",
            variant === "compact"
              ? "px-4 py-4 shadow-sm shadow-black/5"
              : "px-5 py-5 shadow-lg shadow-primary/5",
          )}
        >
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {stat.label}
          </p>
          <p
            className={cn(
              "mt-3 font-bold tracking-tight text-foreground",
              variant === "compact" ? "text-xl" : "text-3xl",
            )}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
