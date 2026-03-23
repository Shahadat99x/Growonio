import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FAQAccordion, type FAQItem } from '@/components/sections/FAQAccordion';

export default function FAQPage() {
  const t = useTranslations('FAQPage');

  const faqs: FAQItem[] = [
    {
      question: "How long does a typical project take?",
      answer: "A standard website rebuild takes 2-4 weeks. Complex automation systems or custom client portals can take 6-12 weeks depending on scope."
    },
    {
      question: "Do you offer ongoing support?",
      answer: "Yes. All our enterprise packages include dedicated support. For starter and growth tiers, we offer optional monthly maintenance retainers."
    },
    {
      question: "Are your solutions bilingual out-of-the-box?",
      answer: "Absolutely. Growonio is built from the ground up to support Romanian and English perfectly, targeting both local and international clients."
    },
    {
      question: "Do I need custom software or just a website?",
      answer: "If you just want to display information, a website is enough. If you want to accept bookings, sync calendars, charge clients, or automate CRM data, you need our automated solutions."
    }
  ];

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
