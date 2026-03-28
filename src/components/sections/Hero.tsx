"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionFloat, MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface HeroProps {
  badge?: string;
  title: string | ReactNode;
  description: string;
  supportingLine?: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trustChips?: string[];
  automationBadge: string;
  automationTitle: string;
  automationTriggerLabel: string;
  automationTriggerValue: string;
  automationSteps: string[];
  automationFooter: string;
  desktopImageAlt: string;
  mobileImageAlt: string;
}

function HeroTrustLine({ chips }: { chips: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.92rem] text-muted-foreground/92 sm:mt-5 sm:text-sm">
      {chips.map((chip, index) => (
        <div key={chip} className="inline-flex items-center gap-3">
          {index > 0 && <span className="h-1 w-1 rounded-full bg-primary/70" />}
          <span>{chip}</span>
        </div>
      ))}
    </div>
  );
}

function HeroAutomationCard({
  badge,
  title,
  triggerLabel,
  triggerValue,
  steps,
  footer,
}: {
  badge: string;
  title: string;
  triggerLabel: string;
  triggerValue: string;
  steps: string[];
  footer: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.45rem] border border-slate-200/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(244,242,250,0.96)_100%)] p-3 shadow-[0_26px_64px_-42px_rgba(29,20,64,0.34)] backdrop-blur-lg sm:rounded-[1.7rem] sm:border-slate-200/80 sm:p-5 sm:shadow-[0_35px_85px_-42px_rgba(29,20,64,0.42)] sm:backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(86,59,183,0.14),transparent_72%)] sm:h-24 sm:bg-[radial-gradient(circle_at_top_left,rgba(86,59,183,0.18),transparent_72%)]" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/82">
            {badge}
          </p>
          <h3 className="mt-2.5 text-[0.96rem] font-semibold tracking-[-0.035em] text-slate-950 sm:mt-3 sm:text-lg">
            {title}
          </h3>
        </div>
        <span className="rounded-full border border-emerald-500/18 bg-emerald-500/10 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-emerald-700 sm:px-2.5 sm:text-[0.68rem] sm:tracking-[0.18em]">
          Live
        </span>
      </div>

      <div className="relative mt-4 rounded-[1.05rem] border border-slate-200/78 bg-white/90 p-2.5 shadow-[0_14px_32px_-30px_rgba(29,20,64,0.22)] sm:mt-5 sm:rounded-[1.25rem] sm:p-3 sm:shadow-[0_18px_40px_-34px_rgba(29,20,64,0.28)]">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {triggerLabel}
        </p>
        <p className="mt-1.5 text-[0.82rem] font-semibold text-slate-900 sm:mt-2 sm:text-sm">
          {triggerValue}
        </p>
      </div>

      <div className="relative mt-3.5 grid gap-2 sm:mt-4 sm:gap-2.5">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-2.5 rounded-[1rem] border border-slate-200/78 bg-white/80 px-2.5 py-2 sm:gap-3 sm:rounded-[1.15rem] sm:px-3 sm:py-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/14 bg-primary/10 text-[0.66rem] font-semibold text-primary sm:h-8 sm:w-8 sm:text-[0.72rem]">
              0{index + 1}
            </div>
            <p className="text-[0.82rem] font-medium leading-5 text-slate-800 sm:text-sm">
              {step}
            </p>
          </div>
        ))}
      </div>

      <div className="relative mt-3.5 flex items-start gap-2.5 rounded-[1rem] border border-slate-200/72 bg-slate-950 px-3 py-2.5 text-white shadow-[0_18px_38px_-30px_rgba(8,7,16,0.45)] sm:mt-4 sm:rounded-[1.15rem] sm:px-3.5 sm:py-3 sm:shadow-[0_22px_45px_-34px_rgba(8,7,16,0.55)]">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" />
        <p className="text-[0.76rem] leading-5 text-white/82 sm:text-[0.82rem] sm:leading-6">
          {footer}
        </p>
      </div>
    </div>
  );
}

function HeroVisual({
  desktopImageAlt,
  mobileImageAlt,
  automationBadge,
  automationTitle,
  automationTriggerLabel,
  automationTriggerValue,
  automationSteps,
  automationFooter,
}: {
  desktopImageAlt: string;
  mobileImageAlt: string;
  automationBadge: string;
  automationTitle: string;
  automationTriggerLabel: string;
  automationTriggerValue: string;
  automationSteps: string[];
  automationFooter: string;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[45rem] pt-5 pb-7 sm:max-w-[48rem] sm:pt-0 sm:pb-16 lg:pb-8">
      <div className="pointer-events-none absolute left-6 top-4 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(74,53,169,0.18),transparent_70%)] blur-3xl sm:left-10 sm:top-5 sm:h-40 sm:w-40 sm:bg-[radial-gradient(circle,rgba(74,53,169,0.22),transparent_68%)]" />
      <div className="pointer-events-none absolute right-5 top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(74,105,220,0.12),transparent_70%)] blur-3xl sm:right-8 sm:top-12 sm:h-44 sm:w-44 sm:bg-[radial-gradient(circle,rgba(74,105,220,0.16),transparent_68%)]" />

      <div className="relative ml-auto w-full max-w-[43rem]">
        <div className="relative overflow-hidden rounded-[1.45rem] border border-slate-200/76 bg-[linear-gradient(180deg,rgba(251,251,255,0.98)_0%,rgba(240,242,249,0.96)_100%)] p-2.5 shadow-[0_34px_78px_-52px_rgba(27,20,62,0.34)] ring-1 ring-white/72 sm:rounded-[2.25rem] sm:border-slate-200/80 sm:p-4 sm:shadow-[0_55px_120px_-60px_rgba(27,20,62,0.48)] sm:ring-white/80">
          <div className="rounded-[1.05rem] border border-slate-200/76 bg-white/84 px-3 py-2.5 shadow-[0_14px_30px_-28px_rgba(27,20,62,0.16)] sm:rounded-[1.3rem] sm:border-slate-200/80 sm:px-4 sm:py-3 sm:shadow-[0_18px_35px_-30px_rgba(27,20,62,0.22)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#4a69dc] sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-[#6f4bff]/70 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-slate-300 sm:h-2.5 sm:w-2.5" />
              </div>
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[0.72rem] sm:tracking-[0.22em]">
                Growonio OS
              </p>
            </div>
          </div>

          <Image
            src="/images/hero-dashboard-desktop.png"
            alt={desktopImageAlt}
            width={2752}
            height={1536}
            preload
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 44vw"
            className="mt-2.5 h-auto w-full rounded-[1.05rem] border border-slate-200/74 bg-[#f8f8fb] object-cover shadow-[0_20px_44px_-36px_rgba(27,20,62,0.26)] sm:mt-3 sm:rounded-[1.5rem] sm:border-slate-200/80 sm:shadow-[0_26px_60px_-44px_rgba(27,20,62,0.35)]"
          />
        </div>

        <MotionFloat
          className="absolute -bottom-4 right-2 z-20 w-[26%] min-w-[6.1rem] max-w-[8.4rem] rounded-[1.2rem] border border-transparent bg-white/68 p-1.5 shadow-[0_16px_36px_-26px_rgba(20,15,49,0.2)] backdrop-blur-sm sm:-bottom-14 sm:right-5 sm:w-[31%] sm:min-w-[8.5rem] sm:max-w-[14rem] sm:rounded-[2rem] sm:border-white/80 sm:bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(242,242,248,0.96)_100%)] sm:p-3 sm:shadow-[0_38px_90px_-50px_rgba(20,15,49,0.5)]"
          delay={0.45}
          duration={7.4}
          y={6}
        >
          <Image
            src="/images/hero-booking-mobile.png"
            alt={mobileImageAlt}
            width={1536}
            height={2752}
            sizes="(max-width: 768px) 34vw, (max-width: 1280px) 22vw, 15vw"
            className="h-auto w-full rounded-[1rem] sm:rounded-[1.45rem]"
          />
        </MotionFloat>

        <MotionFloat
          className="absolute left-1 bottom-1 z-30 w-[11.5rem] max-w-[70%] sm:-left-6 sm:bottom-12 sm:w-[19rem] sm:max-w-[80%]"
          delay={1}
          duration={8.8}
          y={8}
        >
          <HeroAutomationCard
            badge={automationBadge}
            title={automationTitle}
            triggerLabel={automationTriggerLabel}
            triggerValue={automationTriggerValue}
            steps={automationSteps}
            footer={automationFooter}
          />
        </MotionFloat>
      </div>
    </div>
  );
}

export function Hero({
  badge,
  title,
  description,
  supportingLine,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  trustChips = [],
  automationBadge,
  automationTitle,
  automationTriggerLabel,
  automationTriggerValue,
  automationSteps,
  automationFooter,
  desktopImageAlt,
  mobileImageAlt,
}: HeroProps) {
  return (
    <Section className="relative overflow-hidden bg-background pt-10 pb-8 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(86,59,183,0.18),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(74,105,220,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(249,248,252,0.98)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.74)_100%)]" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:gap-12">
          <div className="max-w-3xl">
            {badge && (
              <MotionReveal delay={0.04}>
                <div className="inline-flex items-center rounded-full border border-slate-200/72 bg-white/84 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-[0_14px_28px_-24px_rgba(27,20,62,0.18)] backdrop-blur-md sm:px-4 sm:text-[0.72rem] sm:tracking-[0.22em] sm:shadow-[0_18px_34px_-28px_rgba(27,20,62,0.26)]">
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_-1px_color-mix(in_oklab,var(--color-primary)_78%,transparent)] sm:h-2 sm:w-2" />
                  {badge}
                </div>
              </MotionReveal>
            )}

            <MotionReveal delay={0.1}>
              <h1 className="mt-5 max-w-4xl text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.06em] text-slate-950 sm:mt-7 sm:text-5xl md:text-[3.65rem] md:leading-[1.02] lg:text-[4.35rem] lg:leading-[0.96]">
                {title}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="mt-4 max-w-2xl text-[1rem] leading-7 text-slate-700 sm:mt-6 sm:text-lg sm:leading-8 md:text-[1.22rem]">
                {description}
              </p>
            </MotionReveal>

            {supportingLine && (
              <MotionReveal delay={0.22}>
                <p className="mt-3.5 max-w-2xl text-[0.95rem] leading-6 text-muted-foreground/92 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
                  {supportingLine}
                </p>
              </MotionReveal>
            )}

            <MotionReveal delay={0.28}>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <Link
                  href={primaryCtaHref}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold max-sm:w-full max-sm:justify-center",
                  )}
                >
                  {primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                {secondaryCtaText && secondaryCtaHref && (
                  <Link
                    href={secondaryCtaHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full border-slate-200/80 bg-white/86 px-7 text-base text-slate-800 hover:bg-white max-sm:w-full max-sm:justify-center",
                    )}
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </MotionReveal>

            {trustChips.length > 0 && (
              <MotionReveal delay={0.34}>
                <HeroTrustLine chips={trustChips} />
              </MotionReveal>
            )}
          </div>

          <MotionReveal delay={0.18} distance={36} className="mt-3 sm:mt-0">
            <HeroVisual
              desktopImageAlt={desktopImageAlt}
              mobileImageAlt={mobileImageAlt}
              automationBadge={automationBadge}
              automationTitle={automationTitle}
              automationTriggerLabel={automationTriggerLabel}
              automationTriggerValue={automationTriggerValue}
              automationSteps={automationSteps}
              automationFooter={automationFooter}
            />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
