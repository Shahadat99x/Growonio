import type { Metadata } from "next";
import {useTranslations} from 'next-intl';
import { getTranslations } from "next-intl/server";
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { buildOrganizationSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { Mail, MapPin } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/contact",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function ContactPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('ContactPage');

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <JsonLd data={buildOrganizationSchema(locale)} />

      <Section className="bg-background">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 lg:pr-8">
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/40">
                <h3 className="text-xl font-bold mb-6">{t("contactCardTitle")}</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("emailLabel")}</p>
                      <a href={`mailto:${siteConfig.companyEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {siteConfig.companyEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">{t("locationLabel")}</p>
                      <p className="text-muted-foreground">
                        {t("locationValue")}
                        <br />
                        {t("locationAvailability")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`mailto:${siteConfig.companyEmail}`}
                    className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                  >
                    {t("emailCta")}
                  </a>
                  {siteConfig.links.whatsapp && (
                    <a
                      href={siteConfig.links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                    >
                      {t("whatsAppCta")}
                    </a>
                  )}
                  <Link
                    href="/services"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                  >
                    {t("servicesLinkLabel")}
                  </Link>
                  <Link
                    href="/insights"
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                  >
                    {t("insightsLinkLabel")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
