import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Scissors,
  Sparkles,
  Stethoscope,
  Workflow,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { buildBreadcrumbSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";

type SolutionIndustry = {
  title: string;
  description: string;
  tags: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SolutionsPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/solutions",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "SolutionsPage" });
  const heroPoints = t.raw("heroPoints") as string[];
  const industryItems = t.raw("industryItems") as SolutionIndustry[];
  const supportPoints = t.raw("supportPoints") as string[];
  const ctaPoints = t.raw("ctaPoints") as string[];
  const industryIcons = [Scissors, Stethoscope, BriefcaseBusiness, Building2];

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd
        data={buildBreadcrumbSchema(appLocale, [
          { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
          { name: t("title"), pathname: "/solutions" },
        ])}
      />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("contactLinkLabel"), href: "/contact" }}
        secondaryAction={{ label: t("servicesLinkLabel"), href: "/services", variant: "outline" }}
        chips={heroPoints.map((point, index) => {
          const icons = [Workflow, CheckCircle2, Sparkles];
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
              {supportPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
            <MotionReveal>
              <SectionHeader
                align="left"
                badge={t("industriesBadge")}
                title={t("industriesTitle")}
                description={t("industriesDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/70 bg-white/86 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.24)] backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                  {t("supportPanelEyebrow")}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                  {t("supportPanelTitle")}
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("supportPanelDescription")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                  >
                    {t("servicesLinkLabel")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </MotionReveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {industryItems.map((industry, index) => {
              const Icon = industryIcons[index] || Building2;

              return (
                <MotionReveal key={industry.title} delay={0.05 + index * 0.05}>
                  <article className="group h-full rounded-[2rem] border border-white/70 bg-white/88 p-6 shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_26px_60px_-36px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em] text-foreground">
                      {industry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {industry.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {industry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border/60 bg-background/72 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <PremiumCtaPanel
        badge={t("ctaBadge")}
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryAction={{ label: t("contactLinkLabel"), href: "/contact" }}
        secondaryAction={{ label: t("servicesLinkLabel"), href: "/services" }}
        microPoints={ctaPoints.map((point) => ({
          label: point,
          icon: <Sparkles className="h-4 w-4" />,
        }))}
        panelTitle={t("ctaPanelTitle")}
        panelDescription={t("ctaPanelDescription")}
      />
    </div>
  );
}
