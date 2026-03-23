
import type { Metadata } from "next";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
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

  return (
    <div className="pt-16 pb-24 bg-zinc-50 dark:bg-zinc-900/40 min-h-screen">
      <Section className="pb-8">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/faq"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              {t("faqLinkLabel")}
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
