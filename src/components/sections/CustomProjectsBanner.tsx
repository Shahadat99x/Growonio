import { ArrowRight, Workflow } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface CustomProjectsBannerProps {
  badge: string;
  title: string;
  description: string;
  priceText: string;
  ctaText: string;
  ctaHref: string;
  supportTiles: string[];
}

export function CustomProjectsBanner({
  badge,
  title,
  description,
  priceText,
  ctaText,
  ctaHref,
  supportTiles,
}: CustomProjectsBannerProps) {
  return (
    <div className="relative mt-16 overflow-hidden rounded-[2.3rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.92)_100%)] px-6 py-10 shadow-[0_26px_65px_-42px_color-mix(in_oklab,var(--color-primary)_24%,transparent)] md:px-10 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,93,255,0.14),transparent_28%)]" />
      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/14 bg-primary/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/82">
            <Workflow className="h-3.5 w-3.5" />
            {badge}
          </div>
          <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-[2rem]">
            {title}
          </h3>
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
            {description}
          </p>
          <div className="mt-5 inline-flex items-center rounded-full border border-border/60 bg-background/86 px-4 py-2 text-sm font-medium shadow-[0_16px_35px_-28px_rgba(24,18,51,0.18)]">
            {priceText}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[18rem]">
          {supportTiles.slice(0, 2).map((tile) => (
            <div
              key={tile}
              className="rounded-[1.5rem] border border-border/60 bg-background/76 px-5 py-4 text-sm font-medium text-foreground/88"
            >
              {tile}
            </div>
          ))}
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "sm:col-span-2 w-full rounded-full font-semibold")}
          >
            {ctaText}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
