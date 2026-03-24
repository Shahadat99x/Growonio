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
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left_center,rgba(129,93,255,0.06),transparent_24%),radial-gradient(circle_at_right_bottom,rgba(129,93,255,0.08),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <MotionReveal>
            <div>
              <SectionHeader
                align="left"
                badge={badge}
                title={title}
                description={description}
                className="mb-0 max-w-none"
              />

              <div className="mt-8 flex flex-wrap gap-3">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-full border border-border/65 bg-white/75 px-4 py-2 text-sm font-medium text-foreground shadow-[0_14px_30px_-28px_rgba(24,18,51,0.22)] backdrop-blur-md"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_-1px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]" />
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
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="overflow-hidden rounded-[2.25rem] border border-border/60 bg-white/82 p-6 shadow-[0_24px_65px_-42px_rgba(24,18,51,0.24)] backdrop-blur-md md:p-7">
              <div className="overflow-hidden rounded-[1.8rem] border border-primary/12 bg-[linear-gradient(135deg,rgba(247,243,255,0.96)_0%,rgba(255,255,255,0.95)_100%)] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/85">
                    {panelEyebrow}
                  </p>
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-foreground md:text-[2rem]">
                  {panelTitle}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-[0.98rem]">
                  {panelDescription}
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {pillars.map((pillar, index) => {
                  const Icon = pillarIcons[index] ?? SearchCheck;

                  return (
                    <article
                      key={pillar.title}
                      className="group rounded-[1.5rem] border border-border/55 bg-background/82 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_20px_50px_-38px_color-mix(in_oklab,var(--color-primary)_25%,transparent)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/8 text-primary transition-transform duration-300 group-hover:scale-[1.04]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-foreground">
                        {pillar.title}
                      </h4>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {pillar.description}
                      </p>
                    </article>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between rounded-[1.5rem] border border-border/55 bg-background/70 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Growonio</p>
                  <p className="text-sm text-muted-foreground">{brandDescription}</p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
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
