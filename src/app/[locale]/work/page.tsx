import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { WorkItemCardImage } from "@/components/media/WorkItemCardImage";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { getWorkItemImageAlt } from "@/lib/cloudinary";
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
  const ctaPoints = t.raw("heroPoints") as string[];
  const prioritizedItems = [...items].sort((left, right) => {
    if (left.is_featured === right.is_featured) {
      return left.order - right.order;
    }

    return left.is_featured ? -1 : 1;
  });
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
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
                {t("description")}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.22}>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                >
                  {t("heroPrimaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                >
                  {t("heroSecondaryCta")}
                </Link>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>

      <Section variant="tint" className="pt-12 md:pt-16 lg:pt-20">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("featuredLabel")}
              title={t("gridTitle")}
              description={t("gridDescription")}
              className="mb-12 max-w-4xl"
            />
          </MotionReveal>

          {prioritizedItems.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {prioritizedItems.map((item, index) => (
                <MotionReveal key={item.id} delay={0.06 + index * 0.04}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/60 bg-white/88 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_28px_70px_-36px_color-mix(in_oklab,var(--color-primary)_24%,transparent)]">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border/55 bg-zinc-100 dark:bg-zinc-900/70">
                      <WorkItemCardImage
                        src={item.image_url}
                        alt={getWorkItemImageAlt(item)}
                        title={item.title}
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/78">
                        {item.industry}
                      </p>
                      <h2 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-foreground">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm font-medium text-foreground/72">
                        {item.client_name}
                      </p>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>

                      <div className="mt-auto border-t border-border/55 pt-6">
                        <Link
                          href={`/work/${item.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          {t("viewProject")}
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </MotionReveal>
              ))}
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

      <Section className="pt-16 md:pt-24">
        <Container className="max-w-6xl">
          <MotionReveal>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.98)_100%)] px-6 py-10 shadow-[0_30px_80px_-48px_rgba(54,29,105,0.26)] md:px-10 md:py-12 lg:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,155,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.12),transparent_24%)]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-primary">
                    {t("ctaBadge")}
                  </div>

                  <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-foreground md:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                    {t("ctaTitle")}
                  </h2>
                  <p className="mt-5 text-base leading-8 text-muted-foreground md:text-lg">
                    {t("ctaText")}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                    >
                      {t("ctaPrimary")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                    >
                      {t("ctaSecondary")}
                    </Link>
                  </div>
                </div>

                <div className="rounded-[1.9rem] border border-border/60 bg-white/84 p-6 shadow-[0_22px_50px_-36px_rgba(24,18,51,0.18)] backdrop-blur-md md:p-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-primary/82">
                    {t("heroPanelEyebrow")}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {t("heroPanelTitle")}
                  </h3>

                  <div className="mt-6 grid gap-3">
                    {ctaPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-[1.35rem] border border-border/55 bg-background/78 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.14)]"
                      >
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-primary" />
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
