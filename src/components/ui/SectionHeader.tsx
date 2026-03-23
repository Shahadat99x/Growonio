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
        "mb-12 md:mb-16 max-w-3xl flex flex-col",
        align === "center" ? "mx-auto text-center items-center" : "text-left items-start",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-5">
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
        {title}
      </h2>
      {description && (
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
