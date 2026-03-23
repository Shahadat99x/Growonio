import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { MonitorSmartphone, CalendarCheck, Workflow, Smartphone, ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  const t = useTranslations('ServicesPage');
  const tShared = useTranslations('Shared');

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
            <FeatureCard 
              className="p-10 bg-background"
              icon={<MonitorSmartphone className="w-8 h-8" />}
              title={t('webDesign')}
              description={t('webDesignDesc')}
            />
            <FeatureCard 
              className="p-10 bg-background"
              icon={<CalendarCheck className="w-8 h-8" />}
              title={t('booking')}
              description={t('bookingDesc')}
            />
            <FeatureCard 
              className="p-10 bg-background"
              icon={<Workflow className="w-8 h-8" />}
              title={t('automation')}
              description={t('automationDesc')}
            />
            <FeatureCard 
              className="p-10 bg-background"
              icon={<Smartphone className="w-8 h-8" />}
              title={t('mobile')}
              description={t('mobileDesc')}
            />
          </div>
        </Container>
      </Section>

      {/* CTA Layer */}
      <Section>
        <Container className="max-w-3xl text-center">
          <SectionHeader 
            title="Need a custom solution?" 
            description="We build bespoke software tailored to your specific operational workflows and growth targets." 
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
