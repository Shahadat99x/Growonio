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
  items: LocalizedWorkItem[];
  primaryLabel: string;
  cardCtaLabel: string;
  emptyTitle: string;
  emptyDescription: string;
}

function getWorkSupportingLine(item: LocalizedWorkItem) {
  const description = item.description?.trim();
  if (description) {
    return description;
  }

  const overview = item.overview?.trim();
  if (overview) {
    return overview;
  }

  const results = item.results?.trim();
  if (results) {
    return results;
  }

  return "";
}

export function HomeWorkPreview({
  badge,
  title,
  description,
  items,
  primaryLabel,
  cardCtaLabel,
  emptyTitle,
  emptyDescription,
}: HomeWorkPreviewProps) {
  const previewItems = items.slice(0, 3);

  return (
    <Section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(251,251,253,0.98)_0%,rgba(246,247,250,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(93,69,209,0.06),transparent_24%),radial-gradient(circle_at_right_bottom,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-3xl [&_div]:border-slate-200/80 [&_div]:bg-white/92 [&_div]:text-slate-700 [&_h2]:text-slate-950 [&_h2]:md:text-[3rem] [&_p]:max-w-xl [&_p]:text-slate-600"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <Link
              href="/work"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden rounded-full px-7 lg:inline-flex",
              )}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionReveal>
        </div>

        {previewItems.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:mt-8 xl:grid-cols-3 xl:gap-5">
            {previewItems.map((item, index) => (
              <MotionReveal key={item.id} delay={0.06 + index * 0.05} className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-slate-200/85 bg-white/96 shadow-[0_18px_46px_-36px_rgba(19,16,38,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:shadow-[0_24px_58px_-38px_rgba(55,42,123,0.16)] sm:rounded-[1.7rem]">
                  <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.1),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-200/75 bg-slate-100">
                    <WorkItemCardImage
                      src={item.image_url}
                      alt={getWorkItemImageAlt(item)}
                      title={item.title}
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/76">
                      {item.client_name}
                    </p>

                    <h3 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.03em] text-slate-950 sm:text-[1.15rem]">
                      <Link
                        href={`/work/${item.slug}`}
                        className="rounded-sm transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                      >
                        {item.title}
                      </Link>
                    </h3>

                    <p className="mt-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-slate-500">
                      {item.industry}
                    </p>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                      {getWorkSupportingLine(item)}
                    </p>

                    <div className="mt-auto pt-4">
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
          <div className="mt-5 flex flex-wrap gap-3 lg:hidden sm:mt-6">
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
