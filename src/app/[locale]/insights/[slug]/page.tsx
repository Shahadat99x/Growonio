import { Calendar, Clock, ArrowLeft, User, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/layout/Container";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { getArticleBySlug } from "@/lib/content";
import { buildCloudinaryImageUrl } from "@/lib/cloudinary";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return { title: "Article Not Found" };
  }

  const title = article.seo_title || article.title;
  const description = article.seo_description || article.excerpt;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at ?? undefined,
      authors: article.author_name ? [article.author_name] : undefined,
      images: article.cover_image_url
        ? [{ url: buildCloudinaryImageUrl(article.cover_image_url, { width: 1200, height: 630, crop: "fill" }) }]
        : undefined,
    },
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

export default async function ArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "InsightsPage" });
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-[80vh] pb-24 pt-8">
      <Container>
        {/* Back link */}
        <div className="mb-8">
          <Link href="/insights" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("backToInsights")}
          </Link>
        </div>

        {/* Article Header */}
        <header className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
            {article.category && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {article.category}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(article.published_at, locale)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.reading_time} min {t("readTime")}
            </span>
            {article.author_name && (
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {article.author_name}
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{article.title}</h1>
          <p className="text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
        </header>

        {/* Cover Image */}
        {article.cover_image_url && (
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-border/40">
            <img
              src={buildCloudinaryImageUrl(article.cover_image_url, { width: 1200, crop: "limit" })}
              alt={article.cover_image_alt || article.title}
              className="w-full object-cover"
              width={article.cover_image_width ?? undefined}
              height={article.cover_image_height ?? undefined}
            />
          </div>
        )}

        {/* Article Body */}
        <div className="mx-auto mt-12 max-w-3xl">
          <MarkdownRenderer content={article.content} />
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap gap-2 border-t pt-6">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Block */}
        <div className="mx-auto mt-16 max-w-3xl rounded-2xl border border-border/40 bg-card/70 p-8 text-center shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight">{t("ctaTitle")}</h2>
          <p className="mt-3 text-muted-foreground">{t("ctaDescription")}</p>
          <div className="mt-6">
            <Link href="/contact" className={buttonVariants()}>
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
