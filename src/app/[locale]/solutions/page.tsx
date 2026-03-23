import type { Metadata } from "next";
import {useTranslations} from 'next-intl';
import { getTranslations } from "next-intl/server";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Scissors, Stethoscope, Briefcase } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "SolutionsPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/solutions",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              {t("servicesLinkLabel")}
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
            >
              {t("contactLinkLabel")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
