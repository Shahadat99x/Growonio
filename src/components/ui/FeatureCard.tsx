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
        "group flex flex-col items-start p-8 rounded-2xl bg-card border border-border/40 hover:border-border/80 hover:shadow-sm transition-all duration-300",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 ring-1 ring-primary/20 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}
