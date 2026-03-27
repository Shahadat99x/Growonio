import { ArrowRight, Languages, LayoutDashboard, SearchCheck, Workflow } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type ProofPillar = {
  title: string;
  description: string;
};

interface HomeProofSectionProps {
  badge: string;
  title: string;
  description: string;
  panelEyebrow: string;
  panelTitle: string;
  panelDescription: string;
  pillars: ProofPillar[];
  chips: string[];
  primaryLabel: string;
  secondaryLabel: string;
  contactLabel: string;
  brandDescription: string;
}

const pillarIcons = [SearchCheck, Languages, LayoutDashboard];

export function HomeProofSection({
  badge,
  title,
  description,
  panelEyebrow,
  panelTitle,
  panelDescription,
  pillars,
  chips,
  primaryLabel,
  secondaryLabel,
  contactLabel,
  brandDescription,
}: HomeProofSectionProps) {
  return (
    <Section className="relative overflow-hidden border-b border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,249,252,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(93,69,209,0.06),transparent_24%),radial-gradient(circle_at_right_bottom,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <MotionReveal>
            <div>
              <SectionHeader
                align="left"
                badge={badge}
                title={title}
                description={description}
                className="mb-0 max-w-none [&_div]:border-slate-200/80 [&_div]:bg-white/92 [&_div]:text-slate-700 [&_h2]:text-slate-950 [&_p]:text-slate-600"
              />

              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/94 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_30px_-28px_rgba(19,16,38,0.14)]"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/pricing"
                  className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}
                >
                  {primaryLabel}
                </Link>
                <Link
                  href="/work"
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full border-slate-300/80 bg-white/92 px-7 text-slate-800 hover:bg-white")}
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="overflow-hidden rounded-[2.25rem] border border-slate-200/80 bg-white/96 p-6 shadow-[0_26px_68px_-44px_rgba(19,16,38,0.18)] md:p-7">
              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(246,247,252,0.98)_0%,rgba(255,255,255,0.98)_100%)] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(245,244,251,1)_0%,rgba(255,255,255,1)_100%)] text-primary">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                    {panelEyebrow}
                  </p>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950 md:text-[2rem]">
                  {panelTitle}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                  {panelDescription}
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pillars.map((pillar, index) => {
                  const Icon = pillarIcons[index] ?? SearchCheck;

                  return (
                    <article
                      key={pillar.title}
                      className="group rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/18 hover:bg-white hover:shadow-[0_22px_52px_-40px_rgba(55,42,123,0.16)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-slate-200/80 bg-white text-primary transition-transform duration-300 group-hover:scale-[1.04]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                        {pillar.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {pillar.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-[1.5rem] border border-slate-200/80 bg-slate-50/85 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-950">Growonio</p>
                  <p className="text-sm text-slate-600">{brandDescription}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary"
                >
                  {contactLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
