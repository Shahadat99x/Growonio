import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Layers3, Settings2, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

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

      <Section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/12 via-background to-background" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                {t("heroBadge")}
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("description")}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground/90 md:text-lg">
                {t("supportingLine")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold shadow-lg",
                  )}
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full px-7 text-base",
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/50 bg-background/85 p-7 shadow-xl shadow-primary/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                {t("heroPanelEyebrow")}
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                {t("heroPanelTitle")}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {t("heroPanelDescription")}
              </p>

              <div className="mt-6 space-y-3">
                {heroPoints.map((point, index) => {
                  const Icon = heroIcons[index] || CheckCircle2;

                  return (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-border/50 bg-muted/40 px-4 py-3"
                    >
                      <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm leading-6 text-foreground/90">{point}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                >
                  {t("servicesLinkLabel")}
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
        </Container>
      </Section>

      <Section className="bg-zinc-50 py-16 dark:bg-zinc-900/40 md:py-24">
        <Container>
          <SectionHeader
            title={t("gridTitle")}
            description={t("gridDescription")}
            className="mb-12 md:mb-16"
          />

          {prioritizedItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
              {prioritizedItems.map((item, index) => (
                <WorkCaseStudyCard
                  key={item.id}
                  item={item}
                  ctaLabel={t("viewProject")}
                  featuredLabel={t("featuredLabel")}
                  featured={index === 0 && item.is_featured}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-border/60 bg-background p-10 text-center shadow-sm shadow-black/5">
              <h2 className="text-2xl font-bold tracking-tight">{t("emptyTitle")}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
                {t("emptyDescription")}
              </p>
            </div>
          )}
        </Container>
      </Section>

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

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  {t("servicesLinkLabel")}
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "rounded-full text-white hover:bg-white/10 hover:text-white",
                  )}
                >
                  {t("contactLinkLabel")}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
