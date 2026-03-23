
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';

import { getTranslations } from 'next-intl/server';
import { getWorkItems } from '@/lib/content';

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WorkPage' });
  const items = await getWorkItems(locale);

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <Section>
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16">
            {items.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-video w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800/50 mb-6 overflow-hidden relative border border-border/40">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium opacity-50">Project Visual Placeholder</div>
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground font-medium mb-4">{item.industry}</p>
                <div className="flex items-center text-primary font-semibold text-sm">
                  {t('viewProject')} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
