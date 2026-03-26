import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  Languages,
  Mail,
  Rocket,
  SearchCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { CareersApplicationForm } from "@/components/sections/CareersApplicationForm";
import { InnerPageHero } from "@/components/sections/InnerPageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { buildBreadcrumbSchema, buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

type HelpItem = {
  title: string;
  description: string;
};

type CardListContent = {
  title: string;
  description: string;
  items: string[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CareersPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/careers",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "CareersPage" });

  const heroPoints = t.raw("heroPoints") as string[];
  const heroPanelPoints = t.raw("heroPanelPoints") as string[];
  const aboutItems = t.raw("aboutItems") as string[];
  const whoItems = t.raw("whoItems") as string[];
  const helpItems = t.raw("helpItems") as HelpItem[];
  const whyJoinItems = t.raw("whyJoinItems") as string[];
  const goodFitItems = t.raw("goodFitItems") as string[];
  const notGoodFitItems = t.raw("notGoodFitItems") as string[];
  const applyPanelPoints = t.raw("applyPanelPoints") as string[];
  const formChips = t.raw("formChips") as string[];

  const fitCards: CardListContent[] = [
    {
      title: t("goodFitTitle"),
      description: t("goodFitDescription"),
      items: goodFitItems,
    },
    {
      title: t("notGoodFitTitle"),
      description: t("notGoodFitDescription"),
      items: notGoodFitItems,
    },
  ];

  return (
    <div className="overflow-hidden pb-24">
      <JsonLd
        data={buildBreadcrumbSchema(appLocale, [
          { name: locale === "ro" ? "Acasă" : "Home", pathname: "/" },
          { name: t("title"), pathname: "/careers" },
        ])}
      />

      <InnerPageHero
        badge={t("heroBadge")}
        title={t("heroTitle")}
        description={t("heroDescription")}
        supportingLine={t("heroSupportingLine")}
        primaryAction={{ label: t("heroPrimaryCta"), href: "/careers#application-form" }}
        secondaryAction={{
          label: t("heroSecondaryCta"),
          href: `mailto:${siteConfig.companyEmail}`,
          variant: "outline",
          external: true,
        }}
        chips={heroPoints.map((point, index) => {
          const icons = [Languages, Rocket, Users];
          const Icon = icons[index] || Sparkles;
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
              {heroPanelPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/12 bg-primary/10 text-primary">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium leading-6 text-foreground">{point}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <MotionReveal className="lg:sticky lg:top-28">
              <SectionHeader
                align="left"
                badge={t("aboutBadge")}
                title={t("aboutTitle")}
                description={t("aboutDescription")}
                className="mb-0 max-w-none"
              />
            </MotionReveal>

            <div className="grid gap-6">
              <MotionReveal delay={0.06}>
                <article className="rounded-[2rem] border border-border/60 bg-white/86 p-7 shadow-[0_22px_60px_-40px_rgba(24,18,51,0.18)] backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/10 text-primary">
                      <BriefcaseBusiness className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-[-0.035em] text-foreground">
                      {t("aboutCardTitle")}
                    </h2>
                  </div>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">
                    {t("aboutCardDescription")}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {aboutItems.map((item) => (
                      <div
                        key={item}
                        className="inline-flex items-center rounded-full border border-border/65 bg-background/80 px-4 py-2 text-sm font-medium text-foreground shadow-[0_14px_28px_-26px_rgba(24,18,51,0.18)]"
                      >
                        <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </MotionReveal>

              <MotionReveal delay={0.12}>
                <article className="rounded-[2rem] border border-border/60 bg-white/86 p-7 shadow-[0_22px_60px_-40px_rgba(24,18,51,0.18)] backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/10 text-primary">
                      <SearchCheck className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-[-0.035em] text-foreground">
                      {t("whoTitle")}
                    </h2>
                  </div>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">
                    {t("whoDescription")}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {whoItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </MotionReveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("helpBadge")}
              title={t("helpTitle")}
              description={t("helpDescription")}
              className="mb-12"
            />
          </MotionReveal>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {helpItems.map((item, index) => (
              <MotionReveal key={item.title} delay={0.04 + index * 0.04}>
                <article className="group h-full rounded-[1.9rem] border border-white/72 bg-white/90 p-6 shadow-[0_22px_60px_-40px_rgba(24,18,51,0.18)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_26px_60px_-38px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/10 text-primary">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="feature">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <MotionReveal>
              <div className="rounded-[2.2rem] border border-white/12 bg-white/8 p-7 backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">
                  {t("stageBadge")}
                </p>
                <h2 className="mt-5 text-3xl font-semibold tracking-[-0.045em] text-white md:text-[2.5rem]">
                  {t("stageTitle")}
                </h2>
                <p className="mt-5 text-base leading-8 text-white/76 md:text-lg">
                  {t("stageDescription")}
                </p>
                <p className="mt-5 text-base leading-8 text-white/68">
                  {t("stageSupportingLine")}
                </p>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div className="rounded-[2.2rem] border border-white/12 bg-black/14 p-7 backdrop-blur-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">
                  {t("whyJoinBadge")}
                </p>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white md:text-3xl">
                  {t("whyJoinTitle")}
                </h2>

                <div className="mt-6 grid gap-3">
                  {whyJoinItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.35rem] border border-white/10 bg-white/8 px-4 py-3 text-sm leading-7 text-white/82"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <MotionReveal>
            <SectionHeader
              badge={t("fitBadge")}
              title={t("fitTitle")}
              description={t("fitDescription")}
              className="mb-12"
            />
          </MotionReveal>

          <div className="grid gap-6 lg:grid-cols-2">
            {fitCards.map((card, index) => (
              <MotionReveal key={card.title} delay={0.04 + index * 0.06}>
                <article className="h-full rounded-[2rem] border border-border/60 bg-white/86 p-7 shadow-[0_22px_60px_-40px_rgba(24,18,51,0.18)] backdrop-blur-md">
                  <h2 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {card.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {card.items.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.35rem] border border-border/55 bg-background/76 px-4 py-3 text-sm font-medium leading-7 text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.18)]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="tint" className="pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <MotionReveal>
              <div className="space-y-6 lg:sticky lg:top-28">
                <SectionHeader
                  align="left"
                  badge={t("applyBadge")}
                  title={t("applyTitle")}
                  description={t("applyDescription")}
                  className="mb-0 max-w-none"
                />

                <div className="rounded-[2rem] border border-white/72 bg-white/88 p-7 shadow-[0_22px_60px_-38px_rgba(24,18,51,0.18)] backdrop-blur-md">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
                    {t("applyPanelTitle")}
                  </p>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {t("applyPanelDescription")}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {applyPanelPoints.map((point) => (
                      <div
                        key={point}
                        className="rounded-[1.35rem] border border-border/55 bg-background/78 px-4 py-3 text-sm font-medium text-foreground shadow-[0_16px_35px_-30px_rgba(24,18,51,0.16)]"
                      >
                        {point}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {formChips.map((chip) => (
                      <div
                        key={chip}
                        className="inline-flex items-center rounded-full border border-border/65 bg-background/78 px-4 py-2 text-sm font-medium text-foreground"
                      >
                        <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                        {chip}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`mailto:${siteConfig.companyEmail}`}
                      className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
                    >
                      <Mail className="h-4 w-4" />
                      {t("heroSecondaryCta")}
                    </a>
                    <Link
                      href="/about"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                    >
                      {t("aboutLinkLabel")}
                    </Link>
                    <Link
                      href="/contact"
                      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
                    >
                      {t("contactLinkLabel")}
                    </Link>
                  </div>
                </div>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div id="application-form">
                <CareersApplicationForm />
              </div>
            </MotionReveal>
          </div>
        </Container>
      </Section>
    </div>
  );
}
