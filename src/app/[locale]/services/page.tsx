import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Hammer,
  MonitorSmartphone,
  Rocket,
  Scissors,
  SearchCheck,
  Smartphone,
  Stethoscope,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { HomeFinalCta } from "@/components/home/HomeFinalCta";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { getServices } from "@/lib/content";
import {
  buildBreadcrumbSchema,
  buildPageMetadata,
  buildServiceListSchema,
  type AppLocale,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

type IndustryItem = {
  title: string;
  description: string;
};

type ProcessStep = {
  title: string;
  description: string;
};

const iconMap: Record<string, LucideIcon> = {
  MonitorSmartphone,
  CalendarCheck,
  Workflow,
  Smartphone,
};

const industryIcons: LucideIcon[] = [
  Scissors,
  Stethoscope,
  BriefcaseBusiness,
  Building2,
];
const processIcons: LucideIcon[] = [SearchCheck, ClipboardList, Hammer, Rocket];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "ServicesPage" });
  const services = await getServices(locale);

  const industryItems = t.raw("industryItems") as IndustryItem[];
  const processSteps = t.raw("processSteps") as ProcessStep[];
  const ctaPanelPoints = t.raw("ctaPanelPoints") as string[];

  const structuredData = [
    buildBreadcrumbSchema(appLocale, [
      { name: locale === "ro" ? "Acasa" : "Home", pathname: "/" },
      { name: t("heroBadge"), pathname: "/services" },
    ]),
    buildServiceListSchema(appLocale, services),
  ].filter(Boolean);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={structuredData} />

      <Section className="relative overflow-hidden bg-background pt-24 pb-8 md:pt-32 md:pb-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.08),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <MotionReveal delay={0.04}>
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_14px_28px_-24px_color-mix(in_oklab,var(--color-primary)_44%,transparent)]">
                {t("heroBadge")}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h1 className="mt-7 max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl lg:text-[3.9rem] lg:leading-[0.98]">
                {t("title")}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {t("description")}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.22}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold",
                  )}
                >
                  {t("heroPrimaryCta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full px-7 text-base font-semibold",
                  )}
                >
                  {t("heroSecondaryCta")}
                </Link>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>

      <Section className="pt-6 md:pt-10">
        <Container>
          <MotionReveal>
            <SectionHeader
              title={t("servicesSectionTitle")}
              description={t("servicesSectionDescription")}
              className="mb-10 md:mb-12"
            />
          </MotionReveal>

          <div className="grid gap-5 md:grid-cols-2 xl:gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || MonitorSmartphone;
              const bulletPoints = Array.isArray(service.bullet_points)
                ? service.bullet_points.slice(0, 3)
                : [];

              return (
                <MotionReveal key={service.id} delay={0.06 + index * 0.05}>
                  <article
                    className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70 bg-white/88 p-7 shadow-[0_22px_60px_-36px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/24 hover:shadow-[0_28px_70px_-36px_color-mix(in_oklab,var(--color-primary)_24%,transparent)]"
                  >
                    <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.14),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-primary/14 bg-primary/9 text-primary ring-1 ring-white/45">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full border border-border/60 bg-background/72 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {String(service.order).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative flex flex-1 flex-col">
                      <h3 className="mt-7 text-2xl font-semibold tracking-[-0.04em] text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-muted-foreground">
                        {service.description}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {bulletPoints.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-sm leading-6 text-foreground/90">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto border-t border-border/55 pt-6">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                        >
                          {t("serviceCardCta")}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              title={t("industriesTitle")}
              description={t("industriesIntro")}
              className="mb-12 md:mb-16"
            />
          </MotionReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {industryItems.map((industry, index) => {
              const Icon = industryIcons[index] || Building2;

              return (
                <MotionReveal key={industry.title} delay={0.05 + index * 0.05}>
                  <article
                    className="group rounded-[2rem] border border-white/70 bg-white/86 p-6 shadow-[0_20px_55px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_26px_60px_-36px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em] text-foreground">
                      {industry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {industry.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="feature">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("processBadge")}
              title={t("processTitle")}
              description={t("processIntro")}
              className="mb-12 md:mb-16 [&_div]:border-white/16 [&_div]:bg-white/8 [&_div]:text-white/82 [&_h2]:text-white [&_p]:text-white/72"
            />
          </MotionReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] || Rocket;

              return (
                <MotionReveal key={step.title} delay={0.06 + index * 0.05}>
                  <article
                    className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-6 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.6)] backdrop-blur-md"
                  >
                    <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(158,114,255,0.18),transparent_72%)]" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/12 bg-white/10 text-white shadow-lg shadow-black/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-white/64">
                        {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-semibold tracking-[-0.035em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">
                      {step.description}
                    </p>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <HomeFinalCta
        badge={t("ctaBadge")}
        title={t("ctaTitle")}
        description={t("ctaText")}
        primaryLabel={t("ctaPrimary")}
        secondaryLabel={t("ctaSecondary")}
        microPoints={ctaPanelPoints}
        panelTitle={t("ctaPanelTitle")}
      />
    </div>
  );
}
