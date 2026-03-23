import type { Metadata } from "next";
import {useTranslations} from 'next-intl';
import { getTranslations } from "next-intl/server";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buildPageMetadata, type AppLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/about",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

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
                <h4 className="text-xl font-bold mb-4">{t("value1Title")}</h4>
                <p className="text-muted-foreground">{t("value1Desc")}</p>
              </div>
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/40">
                <h4 className="text-xl font-bold mb-4">{t("value2Title")}</h4>
                <p className="text-muted-foreground">{t("value2Desc")}</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
