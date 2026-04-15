import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Headset } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { InfrastructureNote } from "@/components/sections/InfrastructureNote";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PricingCard } from "@/components/ui/PricingCard";
import { SupportPlanCard } from "@/components/ui/SupportPlanCard";
import { Link } from "@/i18n/routing";
import { getPricingPackages } from "@/lib/content";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

  return (
    <div className="overflow-hidden pb-24">
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
                  href="/services"
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
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
            <MotionReveal>
              <SectionHeader
                badge={t("packagesBadge")}
                title={t("packagesTitle")}
                description={t("packagesDescription")}
                className="mb-0 max-w-3xl"
              />
            </MotionReveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 xl:gap-8">
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

          <MotionReveal delay={0.12}>
            <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-[2.2rem] border border-primary/16 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.94)_100%)] px-6 py-8 shadow-[0_26px_65px_-42px_color-mix(in_oklab,var(--color-primary)_24%,transparent)] md:px-10 md:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,93,255,0.14),transparent_28%)]" />
              <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center rounded-full border border-primary/14 bg-primary/8 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-primary/82">
                    {t("customProjectsBadge")}
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-[2rem]">
                    {t("customProjectsTitle")}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                    {t("customProjectsDesc")}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full rounded-full px-7 font-semibold sm:w-auto")}
                >
                  {t("customProjectsCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
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

      <Section className="pt-16 md:pt-24">
        <Container className="max-w-6xl">
          <MotionReveal>
            <div className="relative overflow-hidden rounded-[2.4rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.98)_100%)] px-6 py-10 shadow-[0_30px_80px_-48px_rgba(54,29,105,0.26)] md:px-10 md:py-12 lg:px-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,155,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.12),transparent_24%)]" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
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
                      className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                    >
                      {t("finalCtaQuote")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7 text-base font-semibold")}
                    >
                      {t("finalCtaConsultation")}
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
