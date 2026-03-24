import { ArrowRight } from "lucide-react";

import { WorkItemCardImage } from "@/components/media/WorkItemCardImage";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { getWorkItemImageAlt } from "@/lib/cloudinary";
import type { LocalizedWorkItem } from "@/types/content";
import { cn } from "@/lib/utils";

import { CaseStudyStats } from "./CaseStudyStats";

type WorkCaseStudyCardProps = {
  item: LocalizedWorkItem;
  ctaLabel: string;
  featuredLabel: string;
  featured?: boolean;
  className?: string;
};

function getWorkCardSummary(item: LocalizedWorkItem) {
  const overview = item.overview?.trim();
  if (overview) {
    return overview;
  }

  return item.description;
}

export function WorkCaseStudyCard({
  item,
  ctaLabel,
  featuredLabel,
  featured = false,
  className,
}: WorkCaseStudyCardProps) {
  const visibleStats = item.stats.slice(0, featured ? 4 : 2);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-background shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-2xl hover:shadow-primary/5",
        featured ? "md:col-span-2 xl:grid xl:grid-cols-[1.1fr_0.9fr]" : "",
        className,
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden border-b border-border/50 bg-zinc-100 dark:bg-zinc-900/70",
          featured
            ? "aspect-[16/10] xl:aspect-auto xl:min-h-full xl:border-r xl:border-b-0"
            : "aspect-[16/10]",
        )}
      >
        <WorkItemCardImage
          src={item.image_url}
          alt={getWorkItemImageAlt(item)}
          title={item.title}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-primary/15 bg-primary/5 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary"
          >
            {item.industry}
          </Badge>
          {item.is_featured && (
            <Badge
              variant="secondary"
              className="rounded-full bg-secondary px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
            >
              {featuredLabel}
            </Badge>
          )}
        </div>

        <p className="mt-5 text-sm font-medium text-primary/80">{item.client_name}</p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
          <Link href={`/work/${item.slug}`} className="transition-colors group-hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p
          className={cn(
            "mt-4 leading-7 text-muted-foreground",
            featured ? "text-base" : "text-sm",
          )}
        >
          {getWorkCardSummary(item)}
        </p>

        {visibleStats.length > 0 && (
          <CaseStudyStats
            stats={visibleStats}
            className="mt-6"
            variant="compact"
          />
        )}

        <div className="mt-auto pt-7">
          <Link
            href={`/work/${item.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
