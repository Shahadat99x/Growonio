import { ArrowRight, Check, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
  popularLabel?: string;
  startingLabel: string;
  recommendedLabel: string;
  investmentLabel: string;
}

export function PricingCard({
  title,
  description,
  price,
  features,
  ctaText,
  ctaHref,
  isPopular,
  popularLabel = "Most Popular",
  startingLabel,
  recommendedLabel,
  investmentLabel,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-white/88 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_28px_70px_-36px_color-mix(in_oklab,var(--color-primary)_24%,transparent)]",
        isPopular && "border-primary/28 bg-[linear-gradient(180deg,rgba(247,243,255,0.98)_0%,rgba(255,255,255,0.94)_100%)] shadow-[0_34px_80px_-42px_color-mix(in_oklab,var(--color-primary)_35%,transparent)] md:-translate-y-3",
      )}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.12),transparent_72%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100",
          isPopular && "bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.2),transparent_74%)]",
        )}
      />
      {isPopular && (
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-primary/16 bg-primary/92 px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]">
          <Sparkles className="h-3.5 w-3.5" />
          {popularLabel}
        </div>
      )}
      <div className="relative flex flex-1 flex-col">
        <div className={cn("pt-2", isPopular && "pt-12")}>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary/75">
            {isPopular ? recommendedLabel : startingLabel}
          </p>
          <h3 className="mt-4 text-[1.65rem] font-semibold tracking-[-0.04em] text-foreground">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        </div>

        <div className="mt-8 rounded-[1.6rem] border border-border/55 bg-background/86 px-5 py-5 shadow-[0_18px_40px_-34px_rgba(24,18,51,0.18)]">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {investmentLabel}
          </p>
          <div className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">
            {price}
          </div>
        </div>

        <div className="mt-8 flex-1">
          <ul className="space-y-3 text-sm text-foreground/88">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="leading-6">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-border/55 pt-6">
          <Link
            href={ctaHref}
            className={cn(
              buttonVariants({ variant: isPopular ? "default" : "outline", size: "lg" }),
              "w-full rounded-full",
            )}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
