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
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground/92">
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
    <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(243,241,251,0.98)_100%)] p-4 shadow-[0_35px_85px_-42px_rgba(29,20,64,0.42)] backdrop-blur-xl sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(86,59,183,0.18),transparent_72%)]" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-primary/82">
            {badge}
          </p>
          <h3 className="mt-3 text-base font-semibold tracking-[-0.035em] text-slate-950 sm:text-lg">
            {title}
          </h3>
        </div>
        <span className="rounded-full border border-emerald-500/18 bg-emerald-500/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Live
        </span>
      </div>

      <div className="relative mt-5 rounded-[1.25rem] border border-slate-200/80 bg-white/92 p-3 shadow-[0_18px_40px_-34px_rgba(29,20,64,0.28)]">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {triggerLabel}
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-900">{triggerValue}</p>
      </div>

      <div className="relative mt-4 grid gap-2.5">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-3 rounded-[1.15rem] border border-slate-200/80 bg-white/82 px-3 py-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/14 bg-primary/10 text-[0.72rem] font-semibold text-primary">
              0{index + 1}
            </div>
            <p className="text-sm font-medium text-slate-800">{step}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-4 flex items-start gap-2.5 rounded-[1.15rem] border border-slate-200/75 bg-slate-950 px-3.5 py-3 text-white shadow-[0_22px_45px_-34px_rgba(8,7,16,0.55)]">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
        <p className="text-[0.82rem] leading-6 text-white/82">{footer}</p>
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
    <div className="relative mx-auto w-full max-w-[48rem] pb-14 sm:pb-20 lg:pb-8">
      <div className="pointer-events-none absolute left-10 top-5 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(74,53,169,0.22),transparent_68%)] blur-3xl" />
      <div className="pointer-events-none absolute right-8 top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(74,105,220,0.16),transparent_68%)] blur-3xl" />

      <div className="relative ml-auto w-full max-w-[43rem]">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(251,251,255,1)_0%,rgba(240,242,249,1)_100%)] p-3 shadow-[0_55px_120px_-60px_rgba(27,20,62,0.48)] ring-1 ring-white/80 sm:rounded-[2.25rem] sm:p-4">
          <div className="rounded-[1.3rem] border border-slate-200/80 bg-white/88 px-4 py-3 shadow-[0_18px_35px_-30px_rgba(27,20,62,0.22)]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#4a69dc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#6f4bff]/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
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
            className="mt-3 h-auto w-full rounded-[1.5rem] border border-slate-200/80 bg-[#f8f8fb] object-cover shadow-[0_26px_60px_-44px_rgba(27,20,62,0.35)]"
          />
        </div>

        <MotionFloat
          className="absolute -bottom-10 right-3 z-20 w-[36%] min-w-[8.5rem] max-w-[14rem] rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(242,242,248,0.96)_100%)] p-2 shadow-[0_38px_90px_-50px_rgba(20,15,49,0.5)] sm:-bottom-14 sm:right-5 sm:w-[31%] sm:p-3"
          delay={0.45}
          duration={7.4}
          y={8}
        >
          <Image
            src="/images/hero-booking-mobile.png"
            alt={mobileImageAlt}
            width={1536}
            height={2752}
            sizes="(max-width: 768px) 34vw, (max-width: 1280px) 22vw, 15vw"
            className="h-auto w-full"
          />
        </MotionFloat>

        <MotionFloat
          className="absolute -left-1 bottom-6 z-30 w-[16rem] max-w-[80%] sm:-left-6 sm:bottom-12 sm:w-[19rem]"
          delay={1}
          duration={8.8}
          y={10}
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
    <Section className="relative overflow-hidden bg-background pt-14 pb-10 md:pt-20 md:pb-14 lg:pt-24 lg:pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(86,59,183,0.18),transparent_30%),radial-gradient(circle_at_84%_16%,rgba(74,105,220,0.14),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(249,248,252,0.98)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.74)_100%)]" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center">
          <div className="max-w-3xl">
            {badge && (
              <MotionReveal delay={0.04}>
                <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/88 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700 shadow-[0_18px_34px_-28px_rgba(27,20,62,0.26)] backdrop-blur-md">
                  <span className="mr-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_-1px_color-mix(in_oklab,var(--color-primary)_78%,transparent)]" />
                  {badge}
                </div>
              </MotionReveal>
            )}

            <MotionReveal delay={0.1}>
              <h1 className="mt-7 max-w-4xl text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl md:text-[3.65rem] md:leading-[1.02] lg:text-[4.35rem] lg:leading-[0.96]">
                {title}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 md:text-[1.22rem]">
                {description}
              </p>
            </MotionReveal>

            {supportingLine && (
              <MotionReveal delay={0.22}>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground/92 md:text-lg">
                  {supportingLine}
                </p>
              </MotionReveal>
            )}

            <MotionReveal delay={0.28}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={primaryCtaHref}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full px-7 text-base font-semibold",
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
                      "rounded-full border-slate-200/80 bg-white/86 px-7 text-base text-slate-800 hover:bg-white",
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

          <MotionReveal delay={0.18} distance={36}>
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
