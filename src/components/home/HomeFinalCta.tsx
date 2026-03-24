import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface HomeFinalCtaProps {
  badge: string;
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string;
  supportNote: string;
  microPoints: string[];
  panelTitle: string;
}

export function HomeFinalCta({
  badge,
  title,
  description,
  primaryLabel,
  secondaryLabel,
  supportNote,
  microPoints,
  panelTitle,
}: HomeFinalCtaProps) {
  return (
    <Section className="pt-6 md:pt-8 lg:pt-10">
      <Container>
        <MotionReveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/18 bg-[linear-gradient(135deg,rgba(18,14,34,1)_0%,rgba(47,30,94,1)_58%,rgba(113,71,202,1)_100%)] px-7 py-10 text-white shadow-[0_36px_90px_-48px_rgba(54,29,105,0.7)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,155,255,0.22),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_26%)]" />
            <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full border border-white/8" />
            <div className="pointer-events-none absolute -right-10 bottom-8 h-48 w-48 rounded-full border border-white/10" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/14 bg-white/10 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white/82 backdrop-blur-sm">
                  {badge}
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl lg:text-[3.2rem] lg:leading-[1.02]">
                  {title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/74 md:text-lg">
                  {description}
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "rounded-full px-7 text-base font-semibold shadow-[0_22px_45px_-28px_rgba(0,0,0,0.5)]",
                    )}
                  >
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full border-white/14 bg-white/10 px-7 text-base text-white hover:border-white/24 hover:bg-white/14",
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                </div>

                <p className="mt-6 text-sm leading-7 text-white/64">
                  {supportNote}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/12 bg-white/9 p-6 backdrop-blur-md sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/12 bg-white/10 text-white">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">
                        Growonio
                      </p>
                      <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
                        {panelTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {microPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.5rem] border border-white/12 bg-black/12 px-5 py-4 text-sm font-medium text-white/80 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
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
