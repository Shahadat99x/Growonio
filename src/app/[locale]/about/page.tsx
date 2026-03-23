import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <Section className="pb-0 md:pb-0">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center md:text-left">
          <div className="prose prose-zinc dark:prose-invert prose-lg mx-auto md:mx-0">
            <h3 className="text-2xl font-bold text-foreground mb-4">{t('mission')}</h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-16">
              {t('missionDesc')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/40">
                <h4 className="text-xl font-bold mb-4">Transparent Process</h4>
                <p className="text-muted-foreground">We despise black-box agencies. You will know exactly what is being built, when it will be delivered, and how much it costs.</p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/40">
                <h4 className="text-xl font-bold mb-4">Built for Growth</h4>
                <p className="text-muted-foreground">We don't just build digital brochures. We engineer systems that capture leads, manage bookings, and automate admin work.</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
