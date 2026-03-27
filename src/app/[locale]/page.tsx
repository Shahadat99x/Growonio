import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { HomeProcessSection } from "@/components/home/HomeProcessSection";
import { HomeServicesPreview } from "@/components/home/HomeServicesPreview";
import { HomeWorkPreview } from "@/components/home/HomeWorkPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema, type AppLocale } from "@/lib/seo";
import { getServices, getWorkItems } from "@/lib/content";

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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;

  const [t, tShared, services, allWorkItems] = await Promise.all([
    getTranslations({ locale, namespace: "Index" }),
    getTranslations({ locale, namespace: "Shared" }),
    getServices(locale),
    getWorkItems(locale),
  ]);

  const workItems = [...allWorkItems].sort((left, right) => {
    if (left.is_featured === right.is_featured) {
      return left.order - right.order;
    }

    return left.is_featured ? -1 : 1;
  });
  const processSteps = t.raw("processSteps") as Array<{
    eyebrow: string;
    title: string;
    description: string;
    outcome: string;
  }>;

  return (
    <>
      <JsonLd data={[buildOrganizationSchema(appLocale), buildWebsiteSchema(appLocale)]} />

      <Hero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("supportingLine")}
        primaryCtaText={t("cta")}
        primaryCtaHref="/contact"
        secondaryCtaText={t("heroSecondaryCta")}
        secondaryCtaHref="/services"
        trustChips={t.raw("heroTrustChips") as string[]}
        automationBadge={t("heroAutomationBadge")}
        automationTitle={t("heroAutomationTitle")}
        automationTriggerLabel={t("heroAutomationTriggerLabel")}
        automationTriggerValue={t("heroAutomationTriggerValue")}
        automationSteps={t.raw("heroAutomationSteps") as string[]}
        automationFooter={t("heroAutomationFooter")}
        desktopImageAlt={t("heroDesktopAlt")}
        mobileImageAlt={t("heroMobileAlt")}
      />

      <HomeServicesPreview
        badge={t("servicesPreviewBadge")}
        title={t("servicesPreviewTitle")}
        description={t("servicesPreviewDesc")}
        panelTitle={t("servicesPreviewPanelTitle")}
        panelDescription={t("servicesPreviewPanelDescription")}
        highlights={t.raw("servicesPreviewHighlights") as string[]}
        services={services}
        primaryLabel={t("servicesPrimaryLinkLabel")}
        learnMoreLabel={tShared("learnMore")}
        emptyTitle={t("servicesPreviewEmptyTitle")}
        emptyDescription={t("servicesPreviewEmptyDescription")}
      />

      <HomeWorkPreview
        badge={t("workPreviewBadge")}
        title={t("workPreviewTitle")}
        description={t("workPreviewDesc")}
        panelTitle={t("workPreviewPanelTitle")}
        panelDescription={t("workPreviewPanelDescription")}
        items={workItems}
        primaryLabel={t("workPreviewPrimaryLabel")}
        cardCtaLabel={t("workPreviewCardCtaLabel")}
        emptyTitle={t("workPreviewEmptyTitle")}
        emptyDescription={t("workPreviewEmptyDescription")}
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
