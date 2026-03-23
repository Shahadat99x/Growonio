import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Scissors, Stethoscope, Briefcase } from 'lucide-react';

export default function SolutionsPage() {
  const t = useTranslations('SolutionsPage');

  return (
    <div className="pt-16 pb-24">
      <Section className="bg-background">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
            className="mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              className="bg-zinc-50 dark:bg-zinc-900/40 p-8"
              icon={<Scissors className="w-8 h-8" />}
              title={t('salons')}
              description={t('salonsDesc')}
            />
            <FeatureCard 
               className="bg-zinc-50 dark:bg-zinc-900/40 p-8"
              icon={<Stethoscope className="w-8 h-8" />}
              title={t('clinics')}
              description={t('clinicsDesc')}
            />
            <FeatureCard 
               className="bg-zinc-50 dark:bg-zinc-900/40 p-8"
              icon={<Briefcase className="w-8 h-8" />}
              title={t('consultants')}
              description={t('consultantsDesc')}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
