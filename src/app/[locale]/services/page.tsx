
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { MonitorSmartphone, CalendarCheck, Workflow, Smartphone, ArrowRight } from 'lucide-react';

import { getTranslations } from 'next-intl/server';
import { getServices } from '@/lib/content';

const iconMap: Record<string, any> = {
  MonitorSmartphone,
  CalendarCheck,
  Workflow,
  Smartphone
};

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ServicesPage' });
  const tShared = await getTranslations({ locale, namespace: 'Shared' });
  const services = await getServices(locale);

  return (
    <div className="pt-16 pb-24">
      {/* Intro */}
      <Section className="bg-background pb-0 md:pb-0 lg:pb-0">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
            className="mb-16 md:mb-24"
          />
        </Container>
      </Section>

      {/* Services Grid */}
      <Section className="bg-zinc-50 dark:bg-zinc-900/40 border-y border-border/40 py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {services.map((service) => {
              const Icon = iconMap[service.icon_name] || MonitorSmartphone;
              return (
                <FeatureCard 
                  key={service.id}
                  className="p-10 bg-background"
                  icon={<Icon className="w-8 h-8" />}
                  title={service.title}
                  description={service.description}
                />
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Layer */}
      <Section>
        <Container className="max-w-3xl text-center">
          <SectionHeader 
            title={t('ctaTitle')} 
            description={t('ctaDesc')} 
          />
          <Link 
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-14 text-base font-semibold shadow-xl")}
          >
            {tShared('sendMessage')} <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Container>
      </Section>
    </div>
  );
}
