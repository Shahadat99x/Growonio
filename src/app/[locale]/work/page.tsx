import type { Metadata } from "next";
import { CheckCircle2, Layers3, Settings2, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkCaseStudyCard } from "@/components/work/WorkCaseStudyCard";
import { Link } from "@/i18n/routing";
import { getWorkItems } from "@/lib/content";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildWorkItemListSchema,
  type AppLocale,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/work",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const items = await getWorkItems(locale);
  const heroPoints = t.raw("heroPoints") as string[];
  const prioritizedItems = [...items].sort((left, right) => {
    if (left.is_featured === right.is_featured) {
      return left.order - right.order;
    }

    return left.is_featured ? -1 : 1;
  });
  const featuredItem = prioritizedItems[0] ?? null;
  const remainingItems = featuredItem
    ? prioritizedItems.filter((item) => item.id !== featuredItem.id)
    : [];

  const heroIcons = [Layers3, Workflow, Settings2];
  const structuredData = [
    buildBreadcrumbSchema(appLocale, [
      { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
      { name: t("title"), pathname: "/work" },
    ]),
    buildWorkItemListSchema(appLocale, prioritizedItems),
  ].filter(Boolean);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={structuredData} />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("supportingLine")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/pricing", variant: "outline" }}
        chips={heroPoints.map((point, index) => {
          const Icon = heroIcons[index] || CheckCircle2;
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
                {items.length} {t("publishedLabel")}
              </div>
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                {t("operationalFocusLabel")}
              </div>
            </div>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/72 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/22 hover:text-primary"
              >
                {t("servicesLinkLabel")}
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/72 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/22 hover:text-primary"
              >
                {t("solutionsLinkLabel")}
              </Link>
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("featuredLabel")}
              align="left"
              title={t("gridTitle")}
              description={t("gridDescription")}
              className="mb-12 max-w-none"
            />
          </MotionReveal>

          {featuredItem ? (
            <div className="space-y-10">
              <MotionReveal delay={0.06}>
                <WorkCaseStudyCard
                  item={featuredItem}
                  ctaLabel={t("viewProject")}
                  featuredLabel={t("featuredLabel")}
                  featured
                />
              </MotionReveal>

              {remainingItems.length > 0 && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
                  {remainingItems.map((item, index) => (
                    <MotionReveal key={item.id} delay={0.08 + index * 0.04}>
                      <WorkCaseStudyCard
                        item={item}
                        ctaLabel={t("viewProject")}
                        featuredLabel={t("featuredLabel")}
                      />
                    </MotionReveal>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-10 text-center shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md">
              <h2 className="text-2xl font-semibold tracking-[-0.04em]">{t("emptyTitle")}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                {t("emptyDescription")}
              </p>
            </div>
          )}
        </Container>
      </Section>

      <PremiumCtaPanel
        badge={t("heroPanelEyebrow")}
        title={t("ctaTitle")}
        description={t("ctaText")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/pricing" }}
        microPoints={heroPoints.map((point, index) => {
          const Icon = heroIcons[index] || CheckCircle2;
          return { label: point, icon: <Icon className="h-4 w-4" /> };
        })}
        panelTitle={t("heroPanelTitle")}
        panelDescription={t("heroPanelDescription")}
      />
    </div>
  );
}
