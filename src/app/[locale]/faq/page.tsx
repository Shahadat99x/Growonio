
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion, type FAQItem } from '@/components/sections/FAQAccordion';

import { getTranslations } from 'next-intl/server';
import { getFAQs } from '@/lib/content';

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FAQPage' });
  const faqs = await getFAQs(locale);

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <Section>
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
            className="mb-16"
          />
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
    </div>
  );
}
