import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';

export default function PricingPage() {
  const t = useTranslations('PricingPage');

  const starterFeatures = [
    "5-page custom website",
    "Basic SEO setup",
    "Contact form integration",
    "Mobile responsive",
    "1 week delivery"
  ];

  const growthFeatures = [
    "Everything in Starter",
    "Booking/Scheduling system",
    "Client CRM portal",
    "Advanced SEO & Analytics",
    "Email automation sequences",
    "3 week delivery"
  ];

  const enterpriseFeatures = [
    "Everything in Growth",
    "Custom App Development",
    "Complex API integrations",
    "Dedicated account manager",
    "24/7 Priority Support",
    "Custom timeframe"
  ];

  return (
    <div className="pt-16 pb-24 bg-zinc-50 dark:bg-zinc-900/40 min-h-screen">
      <Section className="pb-8">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            <PricingCard 
              title={t('starter')}
              description={t('starterDesc')}
              price="$1,999"
              features={starterFeatures}
              ctaText={t('getStarted')}
              ctaHref="/contact"
            />
            <PricingCard 
              isPopular
              title={t('growth')}
              description={t('growthDesc')}
              price="$4,999"
              features={growthFeatures}
              ctaText={t('getStarted')}
              ctaHref="/contact"
            />
            <PricingCard 
              title={t('enterprise')}
              description={t('enterpriseDesc')}
              price="Custom"
              features={enterpriseFeatures}
              ctaText={t('contactUs')}
              ctaHref="/contact"
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
