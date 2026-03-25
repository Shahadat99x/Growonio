import { ArrowRight, Calendar, Clock, Layers3, SearchCheck, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedArticles, getPublishedArticles } from "@/lib/content";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
import { Link } from "@/i18n/routing";
import { buildBlogSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";

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

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  const articles = await getPublishedArticles(locale);
  const featured = await getFeaturedArticles(locale);

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

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("heroPrimaryCta"), href: "/contact" }}
        secondaryAction={{ label: t("heroSecondaryCta"), href: "/services", variant: "outline" }}
        chips={(t.raw("heroPoints") as string[]).map((point, index) => {
          const icons = [Layers3, SearchCheck, Sparkles];
          const Icon = icons[index] || Sparkles;
          return { label: point, icon: <Icon className="h-4 w-4" /> };
        })}
        aside={
          <div className="relative overflow-hidden rounded-[2.1rem] border border-border/60 bg-white/84 p-7 shadow-[0_24px_65px_-40px_rgba(24,18,51,0.24)] backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.16),transparent_72%)]" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
              {t("heroPanelEyebrow")}
            </p>
            <h2 className="relative mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {t("heroPanelTitle")}
            </h2>
            <p className="relative mt-4 text-base leading-8 text-muted-foreground">
              {t("heroPanelDescription")}
            </p>

            <div className="relative mt-6 grid gap-3">
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                {articles.length} {t("publishedLabel")}
              </div>
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                {t("editorialNote")}
              </div>
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("featuredBadge")}
              align="left"
              title={t("featuredTitle")}
              description={t("featuredDescription")}
              className="mb-12 max-w-none"
            />
          </MotionReveal>

          {featuredArticle ? (
            <MotionReveal delay={0.06}>
              <Link href={`/insights/${featuredArticle.slug}`} className="group block">
                <article className="overflow-hidden rounded-[2.2rem] border border-white/70 bg-white/88 shadow-[0_24px_70px_-40px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_30px_80px_-40px_color-mix(in_oklab,var(--color-primary)_24%,transparent)] md:grid md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[20rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900/70">
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

                  <div className="flex flex-col justify-center p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
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

                    <h2 className="mt-6 text-3xl font-semibold tracking-[-0.045em] text-foreground transition-colors group-hover:text-primary">
                      {featuredArticle.title}
                    </h2>
                    <p className="mt-5 text-base leading-8 text-muted-foreground">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="mt-8 inline-flex items-center text-sm font-semibold text-primary">
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
              className="mb-12 max-w-none"
            />
          </MotionReveal>

          {restArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
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

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
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

                        <h3 className="mt-5 text-xl font-semibold tracking-[-0.035em] text-foreground transition-colors group-hover:text-primary">
                          {article.title}
                        </h3>
                        <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground line-clamp-4">
                          {article.excerpt}
                        </p>

                        <div className="mt-6 inline-flex items-center text-sm font-semibold text-primary">
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

      <PremiumCtaPanel
        badge={t("ctaBadge")}
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryAction={{ label: t("ctaButton"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/services" }}
        microPoints={(t.raw("ctaPoints") as string[]).map((point) => ({ label: point, icon: <Sparkles className="h-4 w-4" /> }))}
        panelTitle={t("ctaPanelTitle")}
        panelDescription={t("ctaPanelDescription")}
      />
    </div>
  );
}
