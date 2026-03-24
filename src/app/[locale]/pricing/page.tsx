import type { Metadata } from "next";
import { CheckCircle2, Headset, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { CustomProjectsBanner } from "@/components/sections/CustomProjectsBanner";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { InfrastructureNote } from "@/components/sections/InfrastructureNote";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { SupportPlanCard } from "@/components/ui/SupportPlanCard";
import { getPricingPackages } from "@/lib/content";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/pricing",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PricingPage" });
  const packages = await getPricingPackages(locale);
  const heroPoints = t.raw("heroPoints") as string[];
  const supportPoints = t.raw("supportPoints") as string[];
  const customProjectTiles = t.raw("customProjectTiles") as string[];
  const ctaPoints = t.raw("ctaPoints") as string[];

  const getFeatures = (key: string) => {
    try {
      return t(key).split("|");
    } catch {
      return [];
    }
  };

  const faqs = [
    { question: t("faq1Q"), answer: t("faq1A") },
    { question: t("faq2Q"), answer: t("faq2A") },
    { question: t("faq3Q"), answer: t("faq3A") },
    { question: t("faq4Q"), answer: t("faq4A") },
    { question: t("faq5Q"), answer: t("faq5A") },
    { question: t("faq6Q"), answer: t("faq6A") },
  ];

  const heroIcons = [Layers3, Workflow, ShieldCheck];

  return (
    <div className="overflow-hidden pb-24">
      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("heroPrimaryCta"), href: "/contact" }}
        secondaryAction={{ label: t("heroSecondaryCta"), href: "/services", variant: "outline" }}
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
                badge={t("packagesBadge")}
                title={t("packagesTitle")}
                description={t("packagesDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/70 bg-white/86 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.24)] backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                  {t("comparisonEyebrow")}
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("comparisonDescription")}
                </p>
              </div>
            </MotionReveal>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
            {packages.map((pkg) => (
              <PricingCard
                key={pkg.id}
                isPopular={pkg.is_popular}
                popularLabel={t("popularBadge")}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price_monthly}
                features={pkg.features}
                ctaText={pkg.cta_text}
                ctaHref={pkg.cta_link}
                startingLabel={t("startingPackageLabel")}
                recommendedLabel={t("recommendedLabel")}
                investmentLabel={t("startingInvestmentLabel")}
              />
            ))}
          </div>

          <div className="mx-auto max-w-6xl">
            <CustomProjectsBanner
              badge={t("customProjectsBadge")}
              title={t("customProjectsTitle")}
              description={t("customProjectsDesc")}
              priceText={t("customProjectsPrice")}
              ctaText={t("customProjectsCta")}
              ctaHref="/contact"
              supportTiles={customProjectTiles}
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
            <MotionReveal>
              <SectionHeader
                align="left"
                badge={t("supportBadge")}
                title={t("supportTitle")}
                description={t("supportDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="rounded-[2rem] border border-border/60 bg-white/82 p-7 shadow-[0_22px_60px_-42px_rgba(24,18,51,0.18)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/8 text-primary">
                    <Headset className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                    {t("supportPanelEyebrow")}
                  </p>
                </div>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("supportPanelDescription")}
                </p>
              </div>
            </MotionReveal>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
            <MotionReveal delay={0.04}>
              <SupportPlanCard
                title={t("careBasic")}
                price={t("careBasicPrice")}
                features={getFeatures("careBasicFeatures")}
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <SupportPlanCard
                title={t("careGrowth")}
                price={t("careGrowthPrice")}
                features={getFeatures("careGrowthFeatures")}
              />
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <SupportPlanCard
                title={t("carePlus")}
                price={t("carePlusPrice")}
                features={getFeatures("carePlusFeatures")}
              />
            </MotionReveal>
          </div>

          <div className="mx-auto max-w-4xl">
            <InfrastructureNote text={t("infraNote")} />
          </div>
        </Container>
      </Section>

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("faqBadge")}
              title={t("faqTitle")}
              description={t("faqDescription")}
              className="mb-12"
            />
          </MotionReveal>

          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      <PremiumCtaPanel
        badge={t("finalCtaBadge")}
        title={t("finalCtaTitle")}
        description={t("finalCtaDescription")}
        primaryAction={{ label: t("finalCtaQuote"), href: "/contact" }}
        secondaryAction={{ label: t("finalCtaConsultation"), href: "/contact" }}
        microPoints={ctaPoints.map((point) => ({ label: point, icon: <Sparkles className="h-4 w-4" /> }))}
        panelTitle={t("finalCtaPanelTitle")}
        panelDescription={t("finalCtaPanelDescription")}
      />
    </div>
  );
}
