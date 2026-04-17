import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Mail, MapPin } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { buildOrganizationSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";

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
  const projectFitItems = t.raw("projectFitItems") as string[];

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={buildOrganizationSchema(appLocale)} />

      <Section className="relative overflow-hidden bg-background pt-24 pb-10 md:pt-32 md:pb-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.08),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />

        <Container className="relative z-10">
          <MotionReveal className="max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_14px_28px_-24px_color-mix(in_oklab,var(--color-primary)_44%,transparent)]">
              {t("heroBadge")}
            </div>
            <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:leading-[0.96]">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {t("description")}
            </p>
            <div className="mt-8">
              <a
                href={`mailto:${siteConfig.companyEmail}`}
                className={buttonVariants({ size: "lg" })}
              >
                {t("heroPrimaryCta")}
              </a>
            </div>
          </MotionReveal>
        </Container>
      </Section>

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

                  <div className="mt-6 space-y-3">
                    {projectFitItems.map((item) => (
                      <div key={item} className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3">
                        <p className="text-sm font-medium text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 space-y-5 border-t border-border/55 pt-6">
                    <div className="flex items-start gap-3">
                      <Mail className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                          {t("emailLabel")}
                        </p>
                        <a
                          href={`mailto:${siteConfig.companyEmail}`}
                          className="mt-2 block text-sm font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {siteConfig.companyEmail}
                        </a>
                      </div>
                    </div>

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
