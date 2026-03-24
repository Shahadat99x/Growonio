import type { Metadata } from "next";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { SupportPlanCard } from '@/components/ui/SupportPlanCard';
import { CustomProjectsBanner } from '@/components/sections/CustomProjectsBanner';
import { InfrastructureNote } from '@/components/sections/InfrastructureNote';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

import { getTranslations } from 'next-intl/server';
import { getPricingPackages } from '@/lib/content';

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

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PricingPage' });
  const packages = await getPricingPackages(locale);

  const getFeatures = (key: string) => {
    try {
      return t(key).split('|');
    } catch {
      return [];
    }
  };

  const faqs = [
    { question: t('faq1Q'), answer: t('faq1A') },
    { question: t('faq2Q'), answer: t('faq2A') },
    { question: t('faq3Q'), answer: t('faq3A') },
    { question: t('faq4Q'), answer: t('faq4A') },
    { question: t('faq5Q'), answer: t('faq5A') },
    { question: t('faq6Q'), answer: t('faq6A') },
  ];

  return (
    <div className="pt-16 pb-24 bg-zinc-50 dark:bg-zinc-900/40 min-h-screen">
      <Section className="pb-12">
        <Container>
          {/* Section 1: Hero */}
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
            className="mb-12"
          />
          
          {/* Section 2: Main Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <PricingCard 
                key={pkg.id}
                isPopular={pkg.is_popular}
                popularLabel={t('popularBadge')}
                title={pkg.title}
                description={pkg.description}
                price={pkg.price_monthly}
                features={pkg.features}
                ctaText={pkg.cta_text}
                ctaHref={pkg.cta_link}
              />
            ))}
          </div>

          {/* Section 3: Custom Projects */}
          <div className="max-w-6xl mx-auto">
            <CustomProjectsBanner 
              title={t('customProjectsTitle')}
              description={t('customProjectsDesc')}
              priceText={t('customProjectsPrice')}
              ctaText={t('customProjectsCta')}
              ctaHref="/contact"
            />
          </div>

          {/* Section 4: Support & Maintenance */}
          <div className="max-w-5xl mx-auto mt-24">
            <h3 className="text-2xl font-bold tracking-tight text-center mb-8">
              {t('supportTitle')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SupportPlanCard 
                title={t('careBasic')}
                price={t('careBasicPrice')}
                features={getFeatures('careBasicFeatures')}
              />
              <SupportPlanCard 
                title={t('careGrowth')}
                price={t('careGrowthPrice')}
                features={getFeatures('careGrowthFeatures')}
              />
              <SupportPlanCard 
                title={t('carePlus')}
                price={t('carePlusPrice')}
                features={getFeatures('carePlusFeatures')}
              />
            </div>
          </div>

          {/* Section 5: Infrastructure Note */}
          <div className="max-w-4xl mx-auto">
            <InfrastructureNote text={t('infraNote')} />
          </div>

          {/* Section 6: FAQ */}
          <div className="max-w-3xl mx-auto mt-24">
            <h3 className="text-2xl font-bold tracking-tight text-center mb-8">
              {t('faqTitle')}
            </h3>
            <FAQAccordion items={faqs} />
          </div>

          {/* Section 7: Final CTA */}
          <div className="max-w-3xl mx-auto mt-24 text-center">
            <h3 className="text-3xl font-bold tracking-tight mb-8">
              {t('finalCtaTitle')}
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "default", size: "lg" }), "rounded-full px-8")}
              >
                {t('finalCtaQuote')}
              </Link>
              <Link
                href="/contact"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8")}
              >
                {t('finalCtaConsultation')}
              </Link>
            </div>
          </div>

        </Container>
      </Section>
    </div>
  );
}
