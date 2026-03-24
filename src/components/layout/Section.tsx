import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "light" | "tint" | "feature";
}

const sectionVariants = {
  light: "",
  tint:
    "relative overflow-hidden border-y border-primary/10 bg-[linear-gradient(180deg,rgba(248,246,255,0.92)_0%,rgba(255,255,255,0.98)_100%)] dark:border-white/8 dark:bg-[linear-gradient(180deg,rgba(26,21,46,0.96)_0%,rgba(18,16,31,0.96)_100%)]",
  feature:
    "relative overflow-hidden border-y border-white/10 bg-[linear-gradient(135deg,rgba(15,12,28,1)_0%,rgba(28,19,56,1)_58%,rgba(70,42,133,1)_100%)] text-white",
} as const;

export function Section({
  className,
  children,
  variant = "light",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24 lg:py-32", sectionVariants[variant], className)}
      {...props}
    >
      {children}
    </section>
  );
}
