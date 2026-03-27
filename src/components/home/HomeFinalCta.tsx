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
          <div className="relative overflow-hidden rounded-[2.35rem] border border-slate-900/85 bg-[linear-gradient(135deg,rgba(16,20,31,1)_0%,rgba(24,29,44,1)_46%,rgba(43,38,82,1)_100%)] px-7 py-10 text-white shadow-[0_34px_84px_-50px_rgba(12,16,28,0.7)] sm:px-10 sm:py-12 lg:px-12 lg:py-[3.25rem]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(63,103,220,0.1),transparent_26%)]" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
                  {badge}
                </div>

                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl lg:text-[3rem] lg:leading-[1.02]">
                  {title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/72 md:text-[1.02rem]">
                  {description}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "rounded-full px-7 text-base font-semibold shadow-[0_20px_40px_-28px_rgba(0,0,0,0.46)]",
                    )}
                  >
                    {primaryLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "rounded-full border-white/12 bg-white/8 px-7 text-base text-white hover:border-white/18 hover:bg-white/12",
                    )}
                  >
                    {secondaryLabel}
                  </Link>
                </div>

                <p className="mt-5 max-w-xl text-sm leading-7 text-white/62">
                  {supportNote}
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/7 p-6 backdrop-blur-md lg:p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[0.95rem] border border-white/10 bg-white/10 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/68">
                      Growonio
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">
                      {panelTitle}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3">
                  {microPoints.map((point) => (
                    <div
                      key={point}
                      className="rounded-[1.2rem] border border-white/8 bg-white/6 px-4 py-3 text-sm font-medium text-white/78"
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
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
