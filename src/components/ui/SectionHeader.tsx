import { cn } from "@/lib/utils";

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  badge?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  description,
  badge,
  align = "center",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex max-w-3xl flex-col md:mb-16",
        align === "center" ? "mx-auto text-center items-center" : "text-left items-start",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_25px_-20px_color-mix(in_oklab,var(--color-primary)_40%,transparent)]">
          {badge}
        </div>
      )}
      <h2 className="mb-5 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-foreground md:text-4xl lg:text-[3.35rem] lg:leading-[1.02]">
        {title}
      </h2>
      {description && (
        <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg lg:text-[1.15rem]">
          {description}
        </p>
      )}
    </div>
  );
}
