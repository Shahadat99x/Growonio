import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface CustomProjectsBannerProps {
  title: string;
  description: string;
  priceText: string;
  ctaText: string;
  ctaHref: string;
}

export function CustomProjectsBanner({
  title,
  description,
  priceText,
  ctaText,
  ctaHref,
}: CustomProjectsBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 md:px-12 md:py-16 mt-16 shadow-sm">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex-1 max-w-2xl">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
            {title}
          </h3>
          <p className="text-muted-foreground text-lg mb-4">
            {description}
          </p>
          <div className="inline-flex items-center rounded-full bg-background px-4 py-1.5 text-sm font-medium border shadow-sm">
            {priceText}
          </div>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Link
            href={ctaHref}
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full md:w-auto font-semibold px-8")}
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
}
