import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Clock3, Mail, MapPin, MessageCircleMore, SearchCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { buildOrganizationSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ContactPage" });
  const heroPoints = t.raw("heroPoints") as string[];
  const projectFitItems = t.raw("projectFitItems") as string[];

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={buildOrganizationSchema(appLocale)} />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("heroPrimaryCta"), href: `mailto:${siteConfig.companyEmail}`, external: true }}
        secondaryAction={
          siteConfig.links.whatsapp
            ? { label: t("heroSecondaryCta"), href: siteConfig.links.whatsapp, variant: "outline", external: true }
            : undefined
        }
        chips={heroPoints.map((point, index) => {
          const icons = [SearchCheck, Clock3, MessageCircleMore];
          const Icon = icons[index] || SearchCheck;
          return { label: point, icon: <Icon className="h-4 w-4" /> };
        })}
        aside={
          <div className="relative overflow-hidden rounded-[2.1rem] border border-border/60 bg-white/84 p-7 shadow-[0_24px_65px_-40px_rgba(24,18,51,0.24)] backdrop-blur-md">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.16),transparent_72%)]" />
            <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
              {t("heroPanelEyebrow")}
            </p>
            <h2 className="relative mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {t("heroPanelTitle")}
            </h2>
            <p className="relative mt-4 text-base leading-8 text-muted-foreground">
              {t("heroPanelDescription")}
            </p>

            <div className="relative mt-6 grid gap-3">
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 p-4 shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t("emailLabel")}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">{siteConfig.companyEmail}</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[1.35rem] border border-border/55 bg-background/76 p-4 shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {t("locationLabel")}
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">{t("locationValue")}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{t("locationAvailability")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
            <MotionReveal>
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-[2rem] border border-white/70 bg-white/86 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.22)] backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                    {t("contactCardTitle")}
                  </p>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {t("contactCardDescription")}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {projectFitItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/70 bg-white/86 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.22)] backdrop-blur-md">
                  <div className="flex flex-wrap gap-3">
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
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div id="contact-form">
                <ContactForm />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
