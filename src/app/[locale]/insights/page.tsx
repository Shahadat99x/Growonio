import { ArrowRight, Calendar, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedArticles, getPublishedArticles } from "@/lib/content";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
import { Link } from "@/i18n/routing";
import { buildBlogSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/insights",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getEditorialExcerpt(excerpt: string | null | undefined, maxLength: number) {
  const normalized = excerpt?.replace(/\s+/g, " ").trim() ?? "";
  if (!normalized) return "";

  const firstSentence = normalized.match(/.*?[.!?](?:\s|$)/)?.[0]?.trim() ?? "";
  const preferredExcerpt =
    firstSentence && firstSentence.length <= maxLength ? firstSentence : normalized;

  if (preferredExcerpt.length <= maxLength) {
    return preferredExcerpt;
  }

  const slice = preferredExcerpt.slice(0, maxLength + 1);
  const lastSpace = slice.lastIndexOf(" ");
  const cutoff = lastSpace > Math.floor(maxLength * 0.6) ? lastSpace : maxLength;

  return `${slice.slice(0, cutoff).trimEnd()}...`;
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  const articles = await getPublishedArticles(locale);
  const featured = await getFeaturedArticles(locale);
  const finalCtaPoints = t.raw("finalCtaPoints") as string[];

  const featuredArticle = featured[0] ?? null;
  const restArticles = articles.filter((a) => a.id !== featuredArticle?.id);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd
        data={buildBlogSchema(
          locale as AppLocale,
          articles.map((article) => ({ slug: article.slug, title: article.title })),
        )}
      />

      <Section className="relative overflow-hidden bg-background pt-24 pb-10 md:pt-32 md:pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.08),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />

        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <MotionReveal delay={0.04}>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_14px_28px_-24px_color-mix(in_oklab,var(--color-primary)_44%,transparent)]">
                {t("heroBadge")}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="mt-6 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl md:text-[3.75rem] md:leading-[1.02]">
                {t("title")}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                {t("description")}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.22}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full rounded-full px-7 text-base font-semibold sm:w-auto")}
                >
                  {t("heroPrimaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full rounded-full px-7 text-base font-semibold sm:w-auto")}
                >
                  {t("heroSecondaryCta")}
                </Link>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("featuredBadge")}
              align="left"
              title={t("featuredTitle")}
              description={t("featuredDescription")}
              className="mb-10 max-w-3xl md:mb-12 [&_h2]:text-[2rem] md:[&_h2]:text-[2.6rem] lg:[&_h2]:text-[3rem] [&_p]:max-w-xl [&_p]:leading-7 md:[&_p]:leading-8"
            />
          </MotionReveal>

          {featuredArticle ? (
            <MotionReveal delay={0.06}>
              <Link href={`/insights/${featuredArticle.slug}`} className="group block">
                <article className="overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/88 shadow-[0_24px_70px_-40px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--color-primary)_24%,transparent)] md:grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[18rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900/70 md:min-h-[20rem]">
                    {featuredArticle.cover_image_url ? (
                      <Image
                        src={buildCloudinaryImageUrl(featuredArticle.cover_image_url, { width: 1200, crop: "fill" })}
                        alt={featuredArticle.cover_image_alt || featuredArticle.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Sparkles className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                      {featuredArticle.category && (
                        <span className="rounded-full border border-primary/14 bg-primary/6 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary">
                          {featuredArticle.category}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredArticle.published_at, locale)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredArticle.reading_time} min
                      </span>
                    </div>

                    <h3 className="mt-5 text-[1.85rem] font-semibold tracking-[-0.045em] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                      {featuredArticle.title}
                    </h3>
                    <p className="mt-4 max-w-xl line-clamp-3 text-base leading-7 text-muted-foreground">
                      {getEditorialExcerpt(featuredArticle.excerpt, 180)}
                    </p>

                    <div className="mt-7 inline-flex items-center text-sm font-semibold text-primary">
                      {t("readMore")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </MotionReveal>
          ) : (
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-10 text-center shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md">
              <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-4 text-lg text-muted-foreground">{t("empty")}</p>
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("latestBadge")}
              align="left"
              title={t("latestTitle")}
              description={t("latestDescription")}
              className="mb-10 max-w-3xl md:mb-12 [&_h2]:text-[2rem] md:[&_h2]:text-[2.6rem] lg:[&_h2]:text-[3rem] [&_p]:max-w-xl [&_p]:leading-7 md:[&_p]:leading-8"
            />
          </MotionReveal>

          {restArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 xl:gap-7">
              {restArticles.map((article, index) => (
                <MotionReveal key={article.id} delay={0.05 + index * 0.04}>
                  <Link href={`/insights/${article.slug}`} className="group block">
                    <article className="flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/60 bg-white/86 shadow-[0_20px_55px_-38px_rgba(24,18,51,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_70px_-38px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900/70">
                        {article.cover_image_url ? (
                          <Image
                            src={buildCloudinaryImageUrl(article.cover_image_url, { width: 800, crop: "fill" })}
                            alt={article.cover_image_alt || article.title}
                            fill
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                            unoptimized
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
                          {article.category && (
                            <span className="rounded-full border border-primary/14 bg-primary/6 px-3 py-1 font-semibold uppercase tracking-[0.16em] text-primary">
                              {article.category}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(article.published_at, locale)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.reading_time} min
                          </span>
                        </div>

                        <h3 className="mt-4 line-clamp-2 text-xl font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-primary">
                          {article.title}
                        </h3>
                        <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground line-clamp-3">
                          {getEditorialExcerpt(article.excerpt, 120)}
                        </p>

                        <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                          {t("readMore")}
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </MotionReveal>
              ))}
            </div>
          ) : !featuredArticle ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-10 text-center shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md">
              <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <p className="mt-4 text-lg text-muted-foreground">{t("empty")}</p>
            </div>
          ) : null}
        </Container>
      </Section>

      <Section className="pt-16 md:pt-24">
        <Container className="max-w-6xl">
          <MotionReveal>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.98)_100%)] px-6 py-8 shadow-[0_30px_80px_-48px_rgba(54,29,105,0.26)] md:px-10 md:py-10 lg:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,155,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.12),transparent_24%)]" />

              <div className="relative z-10 grid gap-7 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    {t("finalCtaBadge")}
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                    {t("finalCtaTitle")}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                    {t("finalCtaDescription")}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full rounded-full px-7 text-base font-semibold sm:w-auto")}
                    >
                      {t("finalCtaPrimary")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/services"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full rounded-full px-7 text-base font-semibold sm:w-auto")}
                    >
                      {t("finalCtaSecondary")}
                    </Link>
                  </div>
                </div>

                <div className="rounded-[1.9rem] border border-border/60 bg-white/84 p-6 shadow-[0_22px_50px_-36px_rgba(24,18,51,0.18)] backdrop-blur-md md:p-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary/82">
                    {t("finalCtaPanelLabel")}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {t("finalCtaPanelTitle")}
                  </h3>

                  <div className="mt-6 grid gap-3">
                    {finalCtaPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-[1.35rem] border border-border/55 bg-background/78 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.14)]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-primary" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>
    </div>
  );
}
