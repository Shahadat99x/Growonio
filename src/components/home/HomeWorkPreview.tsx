import { ArrowRight } from "lucide-react";

import { WorkItemCardImage } from "@/components/media/WorkItemCardImage";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { getWorkItemImageAlt } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { LocalizedWorkItem } from "@/types/content";

interface HomeWorkPreviewProps {
  badge: string;
  title: string;
  description: string;
  panelTitle: string;
  panelDescription: string;
  items: LocalizedWorkItem[];
  primaryLabel: string;
  cardCtaLabel: string;
  emptyTitle: string;
  emptyDescription: string;
}

function getWorkSummary(item: LocalizedWorkItem) {
  const overview = item.overview?.trim();
  if (overview) {
    return overview;
  }

  return item.description;
}

export function HomeWorkPreview({
  badge,
  title,
  description,
  panelTitle,
  panelDescription,
  items,
  primaryLabel,
  cardCtaLabel,
  emptyTitle,
  emptyDescription,
}: HomeWorkPreviewProps) {
  const previewItems = items.slice(0, 3);
  const leadItem = previewItems[0] ?? null;
  const secondaryItems = leadItem ? previewItems.slice(1) : [];
  const industryChips = [...new Set(previewItems.map((item) => item.industry).filter(Boolean))].slice(0, 3);

  return (
    <Section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(251,251,253,0.98)_0%,rgba(246,247,250,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(93,69,209,0.06),transparent_24%),radial-gradient(circle_at_right_bottom,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-end">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-none [&_div]:border-slate-200/80 [&_div]:bg-white/92 [&_div]:text-slate-700 [&_h2]:text-slate-950 [&_p]:text-slate-600"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="rounded-[2.1rem] border border-slate-200/85 bg-white/96 p-7 shadow-[0_28px_72px_-46px_rgba(19,16,38,0.2)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                {panelTitle}
              </p>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-[1.02rem]">
                {panelDescription}
              </p>

              {industryChips.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {industryChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-full border border-slate-200/85 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_28px_-24px_rgba(19,16,38,0.14)]"
                    >
                      <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </MotionReveal>
        </div>

        {leadItem ? (
          <div className="mt-14 grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_minmax(0,0.86fr)] xl:items-stretch">
            <MotionReveal>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/85 bg-white/96 shadow-[0_24px_64px_-42px_rgba(19,16,38,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_30px_74px_-42px_rgba(55,42,123,0.2)] xl:grid xl:grid-cols-[1.04fr_0.96fr]">
                <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.12),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative aspect-[16/11] overflow-hidden border-b border-slate-200/75 bg-slate-100 xl:min-h-full xl:border-r xl:border-b-0">
                  <WorkItemCardImage
                    src={leadItem.image_url}
                    alt={getWorkItemImageAlt(leadItem)}
                    title={leadItem.title}
                  />
                </div>

                <div className="relative flex flex-1 flex-col p-6 md:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                      {leadItem.industry}
                    </span>
                    <span className="text-[0.76rem] font-semibold uppercase tracking-[0.2em] text-primary/78">
                      {leadItem.client_name}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[1.85rem] font-semibold tracking-[-0.045em] text-slate-950">
                    <Link
                      href={`/work/${leadItem.slug}`}
                      className="rounded-sm transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                    >
                      {leadItem.title}
                    </Link>
                  </h3>

                  <p className="mt-4 line-clamp-4 text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                    {getWorkSummary(leadItem)}
                  </p>

                  {Array.isArray(leadItem.features) && leadItem.features.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {leadItem.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-[0.78rem] font-medium leading-5 text-slate-700"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {leadItem.stats.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {leadItem.stats.slice(0, 2).map((stat) => (
                        <div
                          key={`${leadItem.id}-${stat.label}`}
                          className="rounded-[1.25rem] border border-slate-200/80 bg-slate-50/80 px-4 py-3"
                        >
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                            {stat.label}
                          </p>
                          <p className="mt-2 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                            {stat.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-7">
                    <Link
                      href={`/work/${leadItem.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary"
                    >
                      {cardCtaLabel}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </MotionReveal>

            {secondaryItems.length > 0 && (
              <div className="grid gap-6">
                {secondaryItems.map((item, index) => (
                  <MotionReveal key={item.id} delay={0.08 + index * 0.05}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-slate-200/85 bg-white/96 shadow-[0_22px_58px_-40px_rgba(19,16,38,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_28px_70px_-42px_rgba(55,42,123,0.18)]">
                      <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200/75 bg-slate-100">
                        <WorkItemCardImage
                          src={item.image_url}
                          alt={getWorkItemImageAlt(item)}
                          title={item.title}
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-600">
                            {item.industry}
                          </span>
                          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/76">
                            {item.client_name}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold tracking-[-0.035em] text-slate-950">
                          <Link
                            href={`/work/${item.slug}`}
                            className="rounded-sm transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                          >
                            {item.title}
                          </Link>
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                          {getWorkSummary(item)}
                        </p>

                        <div className="mt-auto pt-6">
                          <Link
                            href={`/work/${item.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary"
                          >
                            {cardCtaLabel}
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </MotionReveal>
                ))}
              </div>
            )}
          </div>
        ) : (
          <MotionReveal delay={0.08}>
            <div className="mt-14 rounded-[2rem] border border-slate-200/80 bg-white/96 px-7 py-10 shadow-[0_22px_56px_-42px_rgba(19,16,38,0.16)]">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {emptyTitle}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {emptyDescription}
              </p>
            </div>
          </MotionReveal>
        )}

        <MotionReveal delay={0.16}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/work"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
