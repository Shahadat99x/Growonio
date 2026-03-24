import type { ReactNode } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  href: string;
  variant?: "default" | "outline";
  external?: boolean;
};

type HeroChip = {
  label: string;
  icon?: ReactNode;
};

interface InnerPageHeroProps {
  badge?: string;
  title: string | ReactNode;
  description: string;
  supportingLine?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  chips?: HeroChip[];
  aside: ReactNode;
}

function HeroActionLink({ action }: { action: HeroAction }) {
  const classes = cn(
    buttonVariants({ variant: action.variant ?? "default", size: "lg" }),
    "rounded-full px-7 text-base font-semibold",
  );

  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {action.label}
        {action.variant === "default" ? (
          <ArrowRight className="ml-2 h-4 w-4" />
        ) : (
          <ExternalLink className="ml-2 h-4 w-4" />
        )}
      </a>
    );
  }

  return (
    <Link href={action.href} className={classes}>
      {action.label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Link>
  );
}

export function InnerPageHero({
  badge,
  title,
  description,
  supportingLine,
  primaryAction,
  secondaryAction,
  chips = [],
  aside,
}: InnerPageHeroProps) {
  return (
    <Section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(129,93,255,0.08),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-end">
          <div className="max-w-3xl">
            {badge && (
              <MotionReveal delay={0.04}>
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/6 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_14px_28px_-24px_color-mix(in_oklab,var(--color-primary)_44%,transparent)]">
                  {badge}
                </div>
              </MotionReveal>
            )}

            <MotionReveal delay={0.1}>
              <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] lg:leading-[0.96]">
                {title}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
                {description}
              </p>
            </MotionReveal>

            {supportingLine && (
              <MotionReveal delay={0.22}>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground/88 md:text-lg">
                  {supportingLine}
                </p>
              </MotionReveal>
            )}

            {(primaryAction || secondaryAction) && (
              <MotionReveal delay={0.28}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {primaryAction && <HeroActionLink action={primaryAction} />}
                  {secondaryAction && <HeroActionLink action={secondaryAction} />}
                </div>
              </MotionReveal>
            )}

            {chips.length > 0 && (
              <MotionReveal delay={0.34}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {chips.map((chip) => (
                    <div
                      key={chip.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border/65 bg-white/75 px-4 py-2 text-sm font-medium text-foreground shadow-[0_14px_30px_-28px_rgba(24,18,51,0.28)] backdrop-blur-md"
                    >
                      {chip.icon ? (
                        <span className="text-primary">{chip.icon}</span>
                      ) : (
                        <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_-1px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]" />
                      )}
                      {chip.label}
                    </div>
                  ))}
                </div>
              </MotionReveal>
            )}
          </div>

          <MotionReveal delay={0.18} distance={36}>
            {aside}
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
