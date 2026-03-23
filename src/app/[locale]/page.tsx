import {useTranslations} from 'next-intl';
import { Hero } from '@/components/sections/Hero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Zap, Shield, BarChart3, Globe } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('Index');

  return (
    <>
      <Hero
        badge="Proiect în curs de dezvoltare"
        title={t('title')}
        description={t('description')}
        primaryCtaText={t('cta')}
        primaryCtaHref="/contact"
        secondaryCtaText="Află mai multe"
        secondaryCtaHref="/services"
      />

      <Section className="bg-zinc-50 dark:bg-zinc-900/50">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">
              Modern Solutions for Growth
            </h2>
            <p className="text-muted-foreground text-lg">
              We provide end-to-end business automation and strategic digital services designed to scale your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Zap className="w-6 h-6" />}
              title="Fast Performance"
              description="Optimized digital experiences that load instantly, ensuring maximum engagement and conversion rates."
            />
            <FeatureCard 
              icon={<Shield className="w-6 h-6" />}
              title="Secure Operations"
              description="Enterprise-grade security protocols built into every layer of your business infrastructure."
            />
            <FeatureCard 
              icon={<BarChart3 className="w-6 h-6" />}
              title="Data Analytics"
              description="Actionable insights from your customer data to drive strategic business decisions."
            />
            <FeatureCard 
              icon={<Globe className="w-6 h-6" />}
              title="Global Reach"
              description="Multilingual, SEO-optimized platforms designed to capture international markets seamlessly."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
