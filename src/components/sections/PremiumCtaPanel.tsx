import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type CtaAction = {
  label: string;
  href: string;
  variant?: "secondary" | "outline";
};

interface PremiumCtaPanelProps {
  badge?: string;
  title: string;
  description: string;
  primaryAction: CtaAction;
  secondaryAction?: CtaAction;
  microPoints?: Array<{ label: string; icon?: ReactNode }>;
  panelTitle?: string;
  panelDescription?: string;
}

export function PremiumCtaPanel({
  badge,
  title,
  description,
  primaryAction,
  secondaryAction,
  microPoints = [],
  panelTitle,
  panelDescription,
}: PremiumCtaPanelProps) {
  return (
    <Section className="pt-16 md:pt-24">
      <Container className="max-w-6xl">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(18,14,34,1)_0%,rgba(47,30,94,1)_58%,rgba(113,71,202,1)_100%)] px-6 py-10 text-white shadow-[0_36px_90px_-48px_rgba(54,29,105,0.7)] md:px-10 md:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,155,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.14),transparent_26%)]" />
            <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-10 bottom-8 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
              <div className="max-w-2xl">
                {badge && (
                  <div className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white/82 backdrop-blur-sm">
                    {badge}
                  </div>
                )}

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                  {title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                  {description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={primaryAction.href}
                    className={cn(
                      buttonVariants({ variant: primaryAction.variant ?? "secondary", size: "lg" }),
                      "rounded-full px-7 text-base font-semibold shadow-[0_22px_45px_-28px_rgba(0,0,0,0.5)]",
                    )}
                  >
                    {primaryAction.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {secondaryAction && (
                    <Link
                      href={secondaryAction.href}
                      className={cn(
                        buttonVariants({ variant: secondaryAction.variant ?? "outline", size: "lg" }),
                        "rounded-full border-white/14 bg-white/10 px-7 text-base text-white hover:border-white/24 hover:bg-white/14",
                      )}
                    >
                      {secondaryAction.label}
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {(panelTitle || panelDescription) && (
                  <div className="rounded-[1.8rem] border border-white/12 bg-white/9 p-6 backdrop-blur-md sm:col-span-2">
                    {panelTitle && (
                      <p className="text-lg font-semibold tracking-[-0.03em] text-white">
                        {panelTitle}
                      </p>
                    )}
                    {panelDescription && (
                      <p className="mt-3 text-sm leading-7 text-white/70">
                        {panelDescription}
                      </p>
                    )}
                  </div>
                )}

                {microPoints.map((point) => (
                  <div
                    key={point.label}
                    className="rounded-[1.5rem] border border-white/12 bg-black/12 px-5 py-4 text-sm font-medium text-white/80 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-primary">
                        {point.icon ?? (
                          <span className="block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_-1px_color-mix(in_oklab,var(--color-primary)_90%,transparent)]" />
                        )}
                      </span>
                      <span>{point.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
