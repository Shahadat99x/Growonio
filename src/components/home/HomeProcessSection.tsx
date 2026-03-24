import { CheckCircle2, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

type ProcessStep = {
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
};

interface HomeProcessSectionProps {
  badge: string;
  title: string;
  description: string;
  noteTitle: string;
  noteDescription: string;
  supportPoints: string[];
  steps: ProcessStep[];
}

const offsets = [
  "xl:translate-y-0",
  "xl:translate-y-10",
  "xl:translate-y-4",
  "xl:translate-y-14",
];

export function HomeProcessSection({
  badge,
  title,
  description,
  noteTitle,
  noteDescription,
  supportPoints,
  steps,
}: HomeProcessSectionProps) {
  return (
    <Section variant="feature" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(158,114,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(101,76,191,0.22),transparent_30%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-none [&_div]:border-white/16 [&_div]:bg-white/8 [&_div]:text-white/80 [&_h2]:text-white [&_p]:text-white/72"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <aside className="rounded-[2rem] border border-white/12 bg-white/7 p-7 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.45)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/12 bg-white/10 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/72">
                    {noteTitle}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-base leading-8 text-white/72 md:text-[1.02rem]">
                {noteDescription}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {supportPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.2rem] border border-white/10 bg-black/10 px-4 py-3 text-sm font-medium text-white/80"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </aside>
          </MotionReveal>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-11 hidden xl:block h-px bg-gradient-to-r from-transparent via-white/22 to-transparent" />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {steps.map((step, index) => (
              <MotionReveal
                key={step.title}
                delay={0.08 + index * 0.06}
                className={cn(offsets[index])}
              >
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 p-7 shadow-[0_22px_60px_-42px_rgba(0,0,0,0.6)] backdrop-blur-md">
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(158,114,255,0.18),transparent_72%)]" />
                  <div className="absolute left-8 top-10 hidden xl:block h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_-2px_color-mix(in_oklab,var(--color-primary)_88%,transparent)]" />

                  <div className="relative">
                    <div className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
                      0{index + 1}
                    </div>
                    <p className="mt-5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                      {step.eyebrow}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      {step.description}
                    </p>

                    <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/10 px-4 py-2 text-sm font-medium text-white/80">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {step.outcome}
                    </div>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
