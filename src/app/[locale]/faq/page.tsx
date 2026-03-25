import type { Metadata } from "next";
import { Clock3, MessageCircleMore, SearchCheck, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getFAQs } from "@/lib/content";
import { buildBreadcrumbSchema, buildFAQSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "FAQPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/faq",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "FAQPage" });
  const faqs = await getFAQs(locale);
  const heroPoints = t.raw("heroPoints") as string[];
  const ctaPoints = t.raw("ctaPoints") as string[];
  const structuredData = [
    buildBreadcrumbSchema(appLocale, [
      { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
      { name: t("title"), pathname: "/faq" },
    ]),
    buildFAQSchema(appLocale, faqs),
  ].filter(Boolean);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={structuredData} />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("contactLinkLabel"), href: "/contact" }}
        secondaryAction={{ label: t("pricingLinkLabel"), href: "/pricing", variant: "outline" }}
        chips={heroPoints.map((point, index) => {
          const icons = [SearchCheck, Clock3, MessageCircleMore];
          const Icon = icons[index] || MessageCircleMore;
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
                {faqs.length} {t("faqCountLabel")}
              </div>
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {t("faqSupportLabel")}
                </span>
                <span className="mt-2 block text-sm leading-6 text-foreground/88">
                  {t("faqSupportValue")}
                </span>
              </div>
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={t("heroBadge")}
              title={t("heroPanelTitle")}
              description={t("heroPanelDescription")}
              className="mb-12 max-w-none"
            />
          </MotionReveal>

          {faqs.length > 0 ? (
            <>
              <FAQAccordion items={faqs} />
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/pricing"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                >
                  {t("pricingLinkLabel")}
                </Link>
                <Link
                  href="/services"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                >
                  {t("servicesLinkLabel")}
                </Link>
                <Link
                  href="/contact"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                >
                  {t("contactLinkLabel")}
                </Link>
              </div>
            </>
          ) : (
            <div className="rounded-[2rem] border border-white/70 bg-white/88 p-10 text-center shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md">
              <Sparkles className="mx-auto h-10 w-10 text-muted-foreground/30" />
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                {t("emptyTitle")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                {t("emptyDescription")}
              </p>
            </div>
          )}
        </Container>
      </Section>

      <PremiumCtaPanel
        badge={t("ctaBadge")}
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/pricing" }}
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
