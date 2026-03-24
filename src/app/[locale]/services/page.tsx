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
  Languages,
  LayoutDashboard,
  MonitorSmartphone,
  Rocket,
  Scissors,
  Search,
  SearchCheck,
  Smartphone,
  Stethoscope,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { PremiumCtaPanel } from "@/components/sections/PremiumCtaPanel";
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

const heroBulletIcons: LucideIcon[] = [Languages, Search, LayoutDashboard];
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

  const heroTrustBullets = t.raw("heroTrustBullets") as string[];
  const capabilityItems = t.raw("includedItems") as string[];
  const industryItems = t.raw("industryItems") as IndustryItem[];
  const processSteps = t.raw("processSteps") as ProcessStep[];

  const structuredData = [
    buildBreadcrumbSchema(appLocale, [
      { name: locale === "ro" ? "Acasa" : "Home", pathname: "/" },
      { name: t("title"), pathname: "/services" },
    ]),
    buildServiceListSchema(appLocale, services),
  ].filter(Boolean);

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd data={structuredData} />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("title")}
        description={t("description")}
        supportingLine={t("supportingLine")}
        primaryAction={{ label: t("heroPrimaryCta"), href: "/contact" }}
        secondaryAction={{ label: t("heroSecondaryCta"), href: "/pricing", variant: "outline" }}
        chips={heroTrustBullets.map((bullet, index) => {
          const Icon = heroBulletIcons[index] || CheckCircle2;
          return { label: bullet, icon: <Icon className="h-4 w-4" /> };
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
              {heroTrustBullets.map((bullet, index) => {
                const Icon = heroBulletIcons[index] || CheckCircle2;

                return (
                  <div
                    key={`${bullet}-panel`}
                    className="flex items-center gap-3 rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/12 bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{bullet}</span>
                  </div>
                );
              })}
            </div>

            <div className="relative mt-6 flex flex-wrap gap-3">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/72 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/22 hover:text-primary"
              >
                {t("seeSolutions")}
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/72 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/22 hover:text-primary"
              >
                {t("seeWork")}
              </Link>
            </div>
          </div>
        }
      />

      <Section variant="tint">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
            <MotionReveal>
              <SectionHeader
                align="left"
                title={t("servicesSectionTitle")}
                description={t("servicesSectionDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/70 bg-white/86 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.24)] backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                  {t("heroPanelTitle")}
                </p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">
                  {t("heroPanelDescription")}
                </p>
              </div>
            </MotionReveal>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:gap-6">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon_name] || MonitorSmartphone;
              const bulletPoints = Array.isArray(service.bullet_points)
                ? service.bullet_points.slice(0, 3)
                : [];

              return (
                <MotionReveal key={service.id} delay={0.06 + index * 0.05}>
                  <article
                  key={service.id}
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

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <MotionReveal className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                title={t("includedTitle")}
                description={t("includedIntro")}
                className="mb-8"
              />

              <div className="rounded-[2rem] border border-border/60 bg-white/82 p-7 shadow-[0_22px_60px_-42px_rgba(24,18,51,0.18)] backdrop-blur-md">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.35rem] border border-border/55 bg-background/80 p-4">
                    <Languages className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightBilingual")}
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-border/55 bg-background/80 p-4">
                    <Search className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightSeo")}
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-border/55 bg-background/80 p-4">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightAdmin")}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  {t("includedNote")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-foreground/82">
                  <Link href="/pricing" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                    {t("ctaSecondary")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/work" className="inline-flex items-center gap-2 hover:text-primary">
                    {t("seeWork")}
                  </Link>
                </div>
              </div>
            </MotionReveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {capabilityItems.map((item, index) => (
                <MotionReveal
                  key={item}
                  delay={0.04 + index * 0.02}
                >
                  <div className="flex items-start gap-3 rounded-[1.5rem] border border-border/60 bg-white/84 p-4 shadow-[0_18px_40px_-34px_rgba(24,18,51,0.16)] backdrop-blur-md">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm leading-6 text-foreground/90">{item}</span>
                  </div>
                </MotionReveal>
              ))}
            </div>
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/solutions"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              {t("seeSolutions")}
            </Link>
            <Link
              href="/work"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
            >
              {t("seeWork")}
            </Link>
          </div>
        </Container>
      </Section>

      <Section variant="feature">
        <Container>
          <MotionReveal>
            <SectionHeader
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
                  key={step.title}
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

      <PremiumCtaPanel
        badge={t("heroPanelEyebrow")}
        title={t("ctaTitle")}
        description={t("ctaText")}
        primaryAction={{ label: t("ctaPrimary"), href: "/contact" }}
        secondaryAction={{ label: t("ctaSecondary"), href: "/pricing" }}
        microPoints={heroTrustBullets.map((bullet, index) => {
          const Icon = heroBulletIcons[index] || CheckCircle2;
          return { label: bullet, icon: <Icon className="h-4 w-4" /> };
        })}
        panelTitle={t("heroPanelTitle")}
        panelDescription={t("heroPanelDescription")}
      />
    </div>
  );
}
