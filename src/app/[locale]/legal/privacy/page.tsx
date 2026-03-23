import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { getLegalContent } from "@/lib/legal-content";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/legal/privacy",
    title: t("privacy"),
    description: t("privacyDescription"),
  });
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  const content = getLegalContent(locale as AppLocale, "privacy");

  return (
    <div className="pt-16 pb-24 min-h-[60vh]">
      <Section>
        <Container className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacy')}</h1>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <p className="text-muted-foreground">{content.intro}</p>
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
