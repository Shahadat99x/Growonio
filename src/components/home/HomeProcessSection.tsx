import { CheckCircle2 } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
  steps: ProcessStep[];
}

export function HomeProcessSection({
  badge,
  title,
  description,
  steps,
}: HomeProcessSectionProps) {
  return (
    <Section
      variant="feature"
      className="relative overflow-hidden border-y border-slate-900/80 bg-[linear-gradient(135deg,rgba(17,20,31,1)_0%,rgba(25,29,46,1)_52%,rgba(46,36,96,1)_100%)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(93,69,209,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(63,103,220,0.12),transparent_30%)]" />

      <Container className="relative z-10">
        <MotionReveal>
          <SectionHeader
            align="left"
            badge={badge}
            title={title}
            description={description}
            className="mb-0 max-w-3xl [&_div]:border-white/12 [&_div]:bg-white/7 [&_div]:text-white/76 [&_h2]:text-white [&_h2]:md:text-[3rem] [&_p]:max-w-2xl [&_p]:text-white/68"
          />
        </MotionReveal>

        <div className="relative mt-10">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
            {steps.map((step, index) => (
              <MotionReveal
                key={step.title}
                delay={0.08 + index * 0.06}
              >
                <article className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.04)_100%)] p-6 shadow-[0_20px_54px_-40px_rgba(0,0,0,0.52)] backdrop-blur-md">
                  <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.16),transparent_72%)]" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex rounded-full border border-white/10 bg-white/9 px-3.5 py-1.5 text-[0.78rem] font-semibold text-white">
                        0{index + 1}
                      </div>
                      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/56">
                        {step.eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-5 text-[1.35rem] font-semibold tracking-[-0.035em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/72">
                      {step.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/7 px-3.5 py-1.5 text-[0.78rem] font-medium text-white/80">
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
