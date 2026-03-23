import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';

export default function CookiePolicyPage() {
  const t = useTranslations('Legal');

  return (
    <div className="pt-16 pb-24 min-h-[60vh]">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('cookies')}</h1>
          <div className="prose prose-zinc dark:prose-invert">
            <p className="text-muted-foreground">{t('placeholder')}</p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
