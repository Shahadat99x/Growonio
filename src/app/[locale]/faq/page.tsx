
import type { Metadata } from "next";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { buildFAQSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

import { getTranslations } from 'next-intl/server';
import { getFAQs } from '@/lib/content';

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

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FAQPage' });
  const faqs = await getFAQs(locale);

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <JsonLd data={buildFAQSchema(locale as AppLocale, faqs)} />

      <Section>
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
            className="mb-16"
          />
          <FAQAccordion items={faqs} />
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              {t("pricingLinkLabel")}
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
            >
              {t("contactLinkLabel")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
