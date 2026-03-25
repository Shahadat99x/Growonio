import type { Metadata } from "next";
import { CheckCircle2, Layers3, Sparkles, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buildBreadcrumbSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";

type ValueItem = {
  title: string;
  description: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "AboutPage" });
  const heroPoints = t.raw("heroPoints") as string[];
  const values = t.raw("values") as ValueItem[];
  const ctaPoints = t.raw("ctaPoints") as string[];

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd
        data={buildBreadcrumbSchema(appLocale, [
          { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
          { name: t("title"), pathname: "/about" },
        ])}
      />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/services", variant: "outline" }}
        chips={heroPoints.map((point, index) => {
          const icons = [Layers3, Workflow, Sparkles];
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
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-3 rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/12 bg-primary/10 text-primary">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{value.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <MotionReveal className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                badge={t("mission")}
                title={t("principlesTitle")}
                description={t("principlesDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div className="rounded-[2rem] border border-border/60 bg-white/84 p-7 shadow-[0_22px_60px_-42px_rgba(24,18,51,0.18)] backdrop-blur-md">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                  {t("mission")}
                </h2>
                <p className="mt-4 text-xl font-semibold tracking-[-0.04em] text-foreground md:text-2xl">
                  {t("missionDesc")}
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("missionLead")}
                </p>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={t("principlesBadge")}
              title={t("principlesTitle")}
              description={t("principlesDescription")}
              className="mb-12 max-w-none"
            />
          </MotionReveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <MotionReveal key={value.title} delay={0.04 + index * 0.05}>
                <article className="group h-full rounded-[2rem] border border-white/70 bg-white/88 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_60px_-38px_color-mix(in_oklab,var(--color-primary)_20%,transparent)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em] text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </Section>

      <PremiumCtaPanel
        badge={t("ctaBadge")}
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/services" }}
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
