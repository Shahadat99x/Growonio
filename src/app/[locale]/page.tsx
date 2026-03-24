import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { HomeIndustriesPreview } from "@/components/home/HomeIndustriesPreview";
import { HomeProcessSection } from "@/components/home/HomeProcessSection";
import { HomeProofSection } from "@/components/home/HomeProofSection";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema, type AppLocale } from "@/lib/seo";
import { useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Index" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function HomePage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Index");
  const tShared = useTranslations("Shared");

  const serviceModules = t.raw("serviceModules") as Array<{
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  }>;
  const industryCards = t.raw("industryCards") as Array<{
    title: string;
    description: string;
    tags: string[];
  }>;
  const processSteps = t.raw("processSteps") as Array<{
    eyebrow: string;
    title: string;
    description: string;
    outcome: string;
  }>;
  const proofPillars = t.raw("proofPillars") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <>
      <JsonLd data={[buildOrganizationSchema(locale), buildWebsiteSchema(locale)]} />

      <Hero
        badge={t('heroBadge')}
        title={t('title')}
        description={t('description')}
        supportingLine={t('supportingLine')}
        primaryCtaText={t('cta')}
        primaryCtaHref="/contact"
        secondaryCtaText={t('heroSecondaryCta')}
        secondaryCtaHref="/services"
        trustChips={t.raw('heroTrustChips') as string[]}
        visualEyebrow={t('heroVisualEyebrow')}
        visualTitle={t('heroVisualTitle')}
        visualDescription={t('heroVisualDescription')}
        workflowSteps={t.raw('heroWorkflowSteps') as string[]}
        floatingLeadEyebrow={t('heroFloatingLeadEyebrow')}
        floatingLeadText={t('heroFloatingLeadText')}
        floatingReportEyebrow={t('heroFloatingReportEyebrow')}
        floatingReportText={t('heroFloatingReportText')}
      />

      <HomeServicesPreview
        badge={t("servicesPreviewBadge")}
        title={t("servicesPreviewTitle")}
        description={t("servicesPreviewDesc")}
        panelTitle={t("servicesPreviewPanelTitle")}
        panelDescription={t("servicesPreviewPanelDescription")}
        highlights={t.raw("servicesPreviewHighlights") as string[]}
        cards={serviceModules}
        primaryLabel={t("servicesPrimaryLinkLabel")}
        secondaryLabel={t("exploreWork")}
        tertiaryLabel={t("readInsights")}
        learnMoreLabel={tShared("learnMore")}
      />

      <HomeIndustriesPreview
        badge={t("solutionsPreviewBadge")}
        title={t("solutionsPreviewTitle")}
        description={t("solutionsPreviewDesc")}
        panelTitle={t("solutionsPreviewPanelTitle")}
        panelPoints={t.raw("solutionsPreviewPanelPoints") as string[]}
        cards={industryCards}
        primaryLabel={t("solutionsPrimaryLinkLabel")}
        secondaryLabel={t("solutionsSecondaryLinkLabel")}
      />

      <HomeProcessSection
        badge={t("processBadge")}
        title={t("processTitle")}
        description={t("processDesc")}
        noteTitle={t("processNoteTitle")}
        noteDescription={t("processNoteDescription")}
        supportPoints={t.raw("processSupportPoints") as string[]}
        steps={processSteps}
      />

      <HomeProofSection
        badge={t("trustBadge")}
        title={t("trustTitle")}
        description={t("trustDesc")}
        panelEyebrow={t("trustPanelEyebrow")}
        panelTitle={t("trustPanelTitle")}
        panelDescription={t("trustPanelDescription")}
        pillars={proofPillars}
        chips={t.raw("proofChips") as string[]}
        primaryLabel={t("proofPrimaryLinkLabel")}
        secondaryLabel={t("proofSecondaryLinkLabel")}
        contactLabel={t("proofContactLinkLabel")}
        brandDescription={t("proofBrandDescription")}
      />

      <HomeFinalCta
        badge={t("ctaBadge")}
        title={t("ctaHeading")}
        description={t("ctaDesc")}
        primaryLabel={t("ctaButton")}
        secondaryLabel={t("ctaSecondaryButton")}
        supportNote={t("ctaSupportNote")}
        microPoints={t.raw("ctaMicroPoints") as string[]}
        panelTitle={t("ctaPanelTitle")}
      />
    </>
  );
}
