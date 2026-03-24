import type { Metadata } from "next";
import { cache } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WorkItemCardImage } from "@/components/media/WorkItemCardImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyGallery } from "@/components/work/CaseStudyGallery";
import { CaseStudyStats } from "@/components/work/CaseStudyStats";
import { WorkCaseStudyCard } from "@/components/work/WorkCaseStudyCard";
import { Link } from "@/i18n/routing";
import { buildCloudinaryImageUrl, getWorkItemImageAlt } from "@/lib/cloudinary";
import { getWorkItemBySlug, getWorkItems } from "@/lib/content";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWorkItemSchema,
  type AppLocale,
} from "@/lib/seo";
import type { LocalizedWorkItem } from "@/types/content";
import { cn } from "@/lib/utils";

const getCachedWorkItem = cache((slug: string, locale: string) =>
  getWorkItemBySlug(slug, locale),
);

const getCachedWorkItems = cache((locale: string) => getWorkItems(locale));

function normalizeText(value: string | null | undefined) {
  return value?.trim() || "";
}

function normalizeLiveUrl(value: string | null | undefined) {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  if (/^https?:\/\//i.test(normalized)) {
    return normalized;
  }

  return `https://${normalized}`;
}

function getSummary(workItem: LocalizedWorkItem) {
  return normalizeText(workItem.overview) || workItem.description;
}

function getVisibleFeatures(workItem: LocalizedWorkItem) {
  return (workItem.features ?? []).filter((feature) => feature.trim().length > 0);
}

function getVisibleStats(workItem: LocalizedWorkItem) {
  return workItem.stats.filter(
    (stat) => stat.label.trim().length > 0 && stat.value.trim().length > 0,
  );
}

function getVisibleGalleryItems(workItem: LocalizedWorkItem) {
  return (workItem.gallery_items ?? []).filter((item) => item.image_url.trim().length > 0);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkDetailPage" });
  const workItem = await getCachedWorkItem(slug, locale);

  if (!workItem) {
    return buildPageMetadata({
      locale: locale as AppLocale,
      pathname: `/work/${slug}`,
      title: t("metaFallbackTitle"),
      description: t("metaFallbackDescription"),
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: `/work/${slug}`,
    title: workItem.title,
    description: getSummary(workItem),
    image: workItem.image_url
      ? {
          url: buildCloudinaryImageUrl(workItem.image_url, {
            width: 1200,
            height: 630,
            crop: "fill",
            gravity: "auto",
          }),
          alt: getWorkItemImageAlt(workItem),
          width: 1200,
          height: 630,
        }
      : undefined,
  });
}

export default async function WorkItemPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "WorkDetailPage" });
  const tWork = await getTranslations({ locale, namespace: "WorkPage" });
  const workItem = await getCachedWorkItem(slug, locale);

  if (!workItem) {
    notFound();
  }

  const allWorkItems = await getCachedWorkItems(locale);
  const relatedWorkItems = allWorkItems
    .filter((item) => item.slug !== workItem.slug)
    .sort((left, right) => {
      if (left.is_featured === right.is_featured) {
        return left.order - right.order;
      }

      return left.is_featured ? -1 : 1;
    })
    .slice(0, 2);

  const summary = getSummary(workItem);
  const overview = normalizeText(workItem.overview);
  const challenge = normalizeText(workItem.challenge);
  const solution = normalizeText(workItem.solution);
  const results = normalizeText(workItem.results);
  const features = getVisibleFeatures(workItem);
  const stats = getVisibleStats(workItem);
  const galleryItems = getVisibleGalleryItems(workItem);
  const liveUrl = normalizeLiveUrl(workItem.live_url);

  const structuredData = [
    buildBreadcrumbSchema(appLocale, [
      { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
      { name: tWork("title"), pathname: "/work" },
      { name: workItem.title, pathname: `/work/${workItem.slug}` },
    ]),
    buildWorkItemSchema(appLocale, workItem),
  ].filter(Boolean);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={structuredData} />

      <Section className="relative overflow-hidden bg-background pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/12 via-background to-background" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <Container className="relative z-10">
          <Link
            href="/work"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "rounded-full",
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToWork")}
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  {workItem.industry}
                </span>
                <span className="rounded-full border border-border/60 bg-background/80 px-4 py-1.5 text-sm font-medium text-foreground/80">
                  {workItem.client_name}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {workItem.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {summary}
              </p>

              {stats.length > 0 && (
                <CaseStudyStats
                  stats={stats.slice(0, 4)}
                  className="mt-8"
                  variant="compact"
                />
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold shadow-lg",
                  )}
                >
                  {t("heroPrimaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full px-7 text-base",
                    )}
                  >
                    {t("heroSecondaryCta")}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>

              <div className="mt-8 rounded-[1.75rem] border border-border/60 bg-background/85 p-6 shadow-sm shadow-black/5 backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                  {t("snapshotTitle")}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {t("snapshotDescription")}
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("clientLabel")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-foreground">
                      {workItem.client_name}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-muted/30 px-4 py-4">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {t("industryLabel")}
                    </p>
                    <p className="mt-3 text-base font-semibold text-foreground">
                      {workItem.industry}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                  >
                    {t("servicesLinkLabel")}
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                  >
                    {t("pricingLinkLabel")}
                  </Link>
                  <Link
                    href="/solutions"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                  >
                    {t("solutionsLinkLabel")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-zinc-100 shadow-xl shadow-primary/5 dark:bg-zinc-900/70">
              <div className="relative aspect-[16/11] w-full">
                <WorkItemCardImage
                  src={workItem.image_url}
                  alt={getWorkItemImageAlt(workItem)}
                  title={workItem.title}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {overview && overview !== workItem.description && (
        <Section className="py-16 md:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <SectionHeader align="left" title={t("overviewTitle")} className="mb-0" />
              <div className="rounded-[2rem] border border-border/60 bg-background p-8 shadow-sm shadow-black/5">
                <p className="text-base leading-8 text-muted-foreground md:text-lg">
                  {overview}
                </p>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {(challenge || solution) && (
        <Section className="border-y border-border/50 bg-zinc-50 py-16 dark:bg-zinc-900/40 md:py-24">
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              {challenge && (
                <article className="rounded-[2rem] border border-border/60 bg-background p-8 shadow-sm shadow-black/5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {t("challengeTitle")}
                  </p>
                  <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                    {challenge}
                  </p>
                </article>
              )}

              {solution && (
                <article className="rounded-[2rem] border border-primary/15 bg-primary/5 p-8 shadow-sm shadow-primary/5">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                    {t("solutionTitle")}
                  </p>
                  <p className="mt-5 text-base leading-8 text-foreground/90 md:text-lg">
                    {solution}
                  </p>
                </article>
              )}
            </div>
          </Container>
        </Section>
      )}

      {features.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              align="left"
              title={t("featuresTitle")}
              description={summary}
              className="mb-10"
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-3 rounded-[1.5rem] border border-border/60 bg-background p-5 shadow-sm shadow-black/5"
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-foreground/90">{feature}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {(results || stats.length > 0) && (
        <Section className="bg-primary/5 py-16 md:py-24">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeader
                align="left"
                title={t("resultsTitle")}
                description={results || summary}
                className="mb-0"
              />

              <div className="space-y-6">
                {stats.length > 0 && <CaseStudyStats stats={stats} variant="highlight" />}

                <div className="rounded-[2rem] border border-primary/15 bg-background/85 p-7 shadow-sm shadow-primary/5">
                  <p className="text-base leading-8 text-muted-foreground">
                    {results || summary}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                    >
                      {t("ctaPrimary")}
                    </Link>
                    <Link
                      href="/pricing"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                    >
                      {t("pricingLinkLabel")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {galleryItems.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <SectionHeader
              align="left"
              title={t("galleryTitle")}
              description={summary}
              className="mb-10"
            />
            <CaseStudyGallery items={galleryItems} projectTitle={workItem.title} />
          </Container>
        </Section>
      )}

      {relatedWorkItems.length > 0 && (
        <Section className="border-y border-border/50 bg-zinc-50 py-16 dark:bg-zinc-900/40 md:py-24">
          <Container>
            <SectionHeader
              title={t("moreWorkTitle")}
              description={t("moreWorkDescription")}
              className="mb-12 md:mb-16"
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
              {relatedWorkItems.map((item) => (
                <WorkCaseStudyCard
                  key={item.id}
                  item={item}
                  ctaLabel={tWork("viewProject")}
                  featuredLabel={tWork("featuredLabel")}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="pt-16 md:pt-24">
        <Container className="max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-primary px-6 py-10 text-primary-foreground shadow-2xl shadow-primary/20 md:px-12 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/18 via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-5 text-base leading-8 text-primary-foreground/90 md:text-lg">
                  {t("ctaText")}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-full px-7 text-base font-semibold",
                  )}
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/25 bg-white/10 px-7 text-base text-white hover:bg-white/15 hover:text-white",
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
