
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';

import { getTranslations } from 'next-intl/server';
import { getPricingPackages } from '@/lib/content';

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
        </Container>
      </Section>
    </div>
  );
}
