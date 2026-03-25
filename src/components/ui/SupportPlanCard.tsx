import { Check, ShieldCheck } from "lucide-react";

interface SupportPlanCardProps {
  title: string;
  price: string;
  features: string[];
}

export function SupportPlanCard({
  title,
  price,
  features,
}: SupportPlanCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-border/60 bg-white/82 p-6 shadow-[0_20px_55px_-40px_rgba(24,18,51,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_60px_-36px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/8 text-primary">
        <ShieldCheck className="h-5 w-5" />
      </div>
      <div className="mt-6">
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-foreground">{title}</h3>
        <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {price}
        </div>
      </div>
      <div className="mt-6 flex-1">
        <ul className="space-y-3 text-sm text-foreground/88">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="leading-6">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
