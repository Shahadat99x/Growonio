"use client";

import { ArrowRight } from "lucide-react";

import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { GrowthSystemVisual } from "@/components/sections/GrowthSystemVisual";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface HeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description: string;
  supportingLine?: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  trustChips?: string[];
  visualEyebrow: string;
  visualTitle: string;
  visualDescription: string;
  workflowSteps: string[];
  floatingLeadEyebrow: string;
  floatingLeadText: string;
  floatingReportEyebrow: string;
  floatingReportText: string;
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
  visualEyebrow,
  visualTitle,
  visualDescription,
  workflowSteps,
  floatingLeadEyebrow,
  floatingLeadText,
  floatingReportEyebrow,
  floatingReportText,
}: HeroProps) {
  return (
    <Section className="relative overflow-hidden bg-background pt-16 pb-14 md:pt-24 md:pb-20 lg:pt-28 lg:pb-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(136,92,255,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(111,76,255,0.12),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl">
            <MotionReveal delay={0.02}>
              <BrandMark className="mb-7" />
            </MotionReveal>

            {badge && (
              <MotionReveal delay={0.08}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_14px_28px_-24px_color-mix(in_oklab,var(--color-primary)_44%,transparent)]">
                  {badge}
                </div>
              </MotionReveal>
            )}

            <MotionReveal delay={0.14}>
              <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:text-[4.45rem] lg:leading-[0.96]">
                {title}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {description}
              </p>
            </MotionReveal>

            {supportingLine && (
              <MotionReveal delay={0.26}>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground/88 md:text-lg">
                  {supportingLine}
                </p>
              </MotionReveal>
            )}

            <MotionReveal delay={0.32}>
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
                      "rounded-full px-7 text-base",
                    )}
                  >
                    {secondaryCtaText}
                  </Link>
                )}
              </div>
            </MotionReveal>

            {trustChips.length > 0 && (
              <MotionReveal delay={0.38}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {trustChips.map((chip) => (
                    <div
                      key={chip}
                      className="inline-flex items-center rounded-full border border-border/65 bg-white/75 px-4 py-2 text-sm font-medium text-foreground shadow-[0_14px_30px_-28px_rgba(24,18,51,0.28)] backdrop-blur-md"
                    >
                      <span className="mr-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_-1px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]" />
                      {chip}
                    </div>
                  ))}
                </div>
              </MotionReveal>
            )}
          </div>

          <MotionReveal delay={0.18} distance={36}>
            <GrowthSystemVisual
              eyebrow={visualEyebrow}
              title={visualTitle}
              description={visualDescription}
              steps={workflowSteps}
              floatingLeadEyebrow={floatingLeadEyebrow}
              floatingLeadText={floatingLeadText}
              floatingReportEyebrow={floatingReportEyebrow}
              floatingReportText={floatingReportText}
            />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
