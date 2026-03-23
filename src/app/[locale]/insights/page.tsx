import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPublishedArticles, getFeaturedArticles } from "@/lib/content";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
import { Link } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

function formatDate(dateStr: string | null, locale: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(locale === "ro" ? "ro-RO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  const articles = await getPublishedArticles(locale);
  const featured = await getFeaturedArticles(locale);

  const featuredArticle = featured[0] ?? null;
  const restArticles = articles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="min-h-[80vh] pb-24 pt-16">
      <Section>
        <Container>
          <SectionHeader title={t("title")} description={t("description")} />

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mt-16">
              <Link href={`/insights/${featuredArticle.slug}`} className="group block">
                <article className="overflow-hidden rounded-3xl border border-border/40 bg-card/70 shadow-sm transition-colors hover:border-border md:grid md:grid-cols-2 md:gap-0">
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/70 md:aspect-auto md:min-h-[320px]">
                    {featuredArticle.cover_image_url ? (
                      <img
                        src={buildCloudinaryImageUrl(featuredArticle.cover_image_url, { width: 800, crop: "fill" })}
                        alt={featuredArticle.cover_image_alt || featuredArticle.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <Sparkles className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center space-y-4 p-8 md:p-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      {featuredArticle.category && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          {featuredArticle.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredArticle.published_at, locale)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredArticle.reading_time} min
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary md:text-3xl">
                      {featuredArticle.title}
                    </h2>
                    <p className="leading-relaxed text-muted-foreground">{featuredArticle.excerpt}</p>

                    <div className="flex items-center text-sm font-semibold text-primary">
                      {t("readMore")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          )}

          {/* Article Grid */}
          {restArticles.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {restArticles.map((article) => (
                <Link href={`/insights/${article.slug}`} key={article.id} className="group block">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-card/70 shadow-sm transition-colors hover:border-border">
                    {/* Cover */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900/70">
                      {article.cover_image_url ? (
                        <img
                          src={buildCloudinaryImageUrl(article.cover_image_url, { width: 600, crop: "fill" })}
                          alt={article.cover_image_alt || article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="flex flex-1 flex-col space-y-3 p-6">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        {article.category && (
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                            {article.category}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.published_at, locale)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.reading_time} min
                        </span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                        {article.title}
                      </h3>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{article.excerpt}</p>

                      <div className="flex items-center pt-2 text-sm font-semibold text-primary">
                        {t("readMore")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="mt-16 text-center">
              <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30" />
              <p className="mt-4 text-lg text-muted-foreground">{t("empty")}</p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
