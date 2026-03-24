import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col items-start overflow-hidden rounded-[1.75rem] border border-border/55 bg-white/82 p-8 shadow-[0_18px_45px_-30px_rgba(24,18,51,0.25)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_24px_55px_-28px_color-mix(in_oklab,var(--color-primary)_30%,transparent)] dark:bg-card/85",
        className
      )}
      {...props}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {icon && (
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.15rem] border border-primary/12 bg-primary/9 text-primary ring-1 ring-white/45 transition-transform duration-300 group-hover:scale-[1.04]">
          {icon}
        </div>
      )}
      <h3 className="mb-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
        {title}
      </h3>
      <p className="text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
