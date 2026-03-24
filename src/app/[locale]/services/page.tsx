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
import { Section } from "@/components/layout/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
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

      <Section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/12 via-background to-background" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
                {t("heroBadge")}
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                {t("description")}
              </p>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground/90 md:text-lg">
                {t("supportingLine")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold shadow-lg",
                  )}
                >
                  {t("heroPrimaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full px-7 text-base",
                  )}
                >
                  {t("heroSecondaryCta")}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {heroTrustBullets.map((bullet, index) => {
                  const Icon = heroBulletIcons[index] || CheckCircle2;

                  return (
                    <div
                      key={bullet}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{bullet}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/50 bg-background/85 p-7 shadow-xl shadow-primary/5 backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                {t("heroPanelEyebrow")}
              </p>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
                {t("heroPanelTitle")}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                {t("heroPanelDescription")}
              </p>

              <div className="mt-6 space-y-3">
                {heroTrustBullets.map((bullet, index) => {
                  const Icon = heroBulletIcons[index] || CheckCircle2;

                  return (
                    <div
                      key={`${bullet}-panel`}
                      className="flex items-center gap-3 rounded-2xl border border-border/50 bg-muted/40 px-4 py-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{bullet}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/solutions"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
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
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-zinc-50 py-16 dark:bg-zinc-900/40 md:py-24">
        <Container>
          <SectionHeader
            title={t("servicesSectionTitle")}
            description={t("servicesSectionDescription")}
            className="mb-12 md:mb-16"
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-8">
            {services.map((service) => {
              const Icon = iconMap[service.icon_name] || MonitorSmartphone;
              const bulletPoints = Array.isArray(service.bullet_points)
                ? service.bullet_points.slice(0, 3)
                : [];

              return (
                <article
                  key={service.id}
                  className="group flex h-full flex-col rounded-[2rem] border border-border/50 bg-background p-8 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {String(service.order).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {bulletPoints.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                        <span className="text-sm leading-6 text-foreground/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      {t("serviceCardCta")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                title={t("includedTitle")}
                description={t("includedIntro")}
                className="mb-8"
              />

              <div className="rounded-[2rem] border border-border/50 bg-muted/30 p-7">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <Languages className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightBilingual")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <Search className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightSeo")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {t("includedHighlightAdmin")}
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-muted-foreground">
                  {t("includedNote")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/pricing"
                    className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                  >
                    {t("ctaSecondary")}
                  </Link>
                  <Link
                    href="/work"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
                  >
                    {t("seeWork")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {capabilityItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background p-4 shadow-sm shadow-black/5"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm leading-6 text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border/50 bg-zinc-50 py-16 dark:bg-zinc-900/40 md:py-24">
        <Container>
          <SectionHeader
            title={t("industriesTitle")}
            description={t("industriesIntro")}
            className="mb-12 md:mb-16"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {industryItems.map((industry, index) => {
              const Icon = industryIcons[index] || Building2;

              return (
                <article
                  key={industry.title}
                  className="rounded-[2rem] border border-border/50 bg-background p-6 shadow-sm shadow-black/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {industry.description}
                  </p>
                </article>
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

      <Section className="bg-primary/5 py-16 md:py-24">
        <Container>
          <SectionHeader
            title={t("processTitle")}
            description={t("processIntro")}
            className="mb-12 md:mb-16"
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = processIcons[index] || Rocket;

              return (
                <article
                  key={step.title}
                  className="flex h-full flex-col rounded-[2rem] border border-primary/10 bg-background/85 p-6 shadow-sm shadow-primary/5 backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-semibold text-primary/80">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="pt-16 md:pt-24">
        <Container className="max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-primary px-6 py-10 text-primary-foreground shadow-2xl shadow-primary/20 md:px-12 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/18 via-transparent to-transparent" />

            <div className="relative z-10">
              <div className="max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {t("ctaTitle")}
                </h2>
                <p className="mt-5 text-base leading-8 text-primary-foreground/90 md:text-lg">
                  {t("ctaText")}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-full px-7 text-base font-semibold",
                  )}
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/25 bg-white/10 px-7 text-base text-white hover:bg-white/15 hover:text-white",
                  )}
                >
                  {t("ctaSecondary")}
                </Link>
              </div>

              <div className="mt-8 grid gap-3 md:grid-cols-3">
                {heroTrustBullets.map((bullet, index) => {
                  const Icon = heroBulletIcons[index] || CheckCircle2;

                  return (
                    <div
                      key={`${bullet}-cta`}
                      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-white" />
                      <span className="text-sm font-medium text-white/95">{bullet}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
