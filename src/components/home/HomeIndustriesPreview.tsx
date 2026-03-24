import { ArrowRight, BriefcaseBusiness, Scissors, Sparkles, Stethoscope, Store } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type IndustryCard = {
  title: string;
  description: string;
  tags: string[];
};

interface HomeIndustriesPreviewProps {
  badge: string;
  title: string;
  description: string;
  panelTitle: string;
  panelPoints: string[];
  cards: IndustryCard[];
  primaryLabel: string;
  secondaryLabel: string;
}

const industryIcons = [Scissors, Stethoscope, BriefcaseBusiness, Store];

export function HomeIndustriesPreview({
  badge,
  title,
  description,
  panelTitle,
  panelPoints,
  cards,
  primaryLabel,
  secondaryLabel,
}: HomeIndustriesPreviewProps) {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-12 mx-auto h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(129,93,255,0.08),transparent_68%)] blur-3xl" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-none"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <aside className="rounded-[2rem] border border-border/60 bg-white/76 p-7 shadow-[0_22px_60px_-40px_rgba(24,18,51,0.24)] backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/85">
                  {panelTitle}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {panelPoints.map((point) => (
                  <div
                    key={point}
                    className="rounded-[1.2rem] border border-border/55 bg-background/75 px-4 py-3 text-sm font-medium text-foreground shadow-[0_14px_35px_-28px_rgba(24,18,51,0.18)]"
                  >
                    {point}
                  </div>
                ))}
              </div>
            </aside>
          </MotionReveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {cards.map((card, index) => {
            const Icon = industryIcons[index] ?? Store;

            return (
              <MotionReveal key={card.title} delay={0.06 + index * 0.06}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-border/60 bg-white/84 p-6 shadow-[0_20px_55px_-38px_rgba(24,18,51,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/22 hover:shadow-[0_26px_70px_-36px_color-mix(in_oklab,var(--color-primary)_22%,transparent)]">
                  <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(129,93,255,0.15),transparent_74%)]" />

                  <div className="relative flex h-12 w-12 items-center justify-center rounded-[1rem] border border-primary/14 bg-primary/9 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="relative mt-6 flex flex-1 flex-col">
                    <h3 className="text-xl font-semibold tracking-[-0.035em] text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {card.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-primary/12 bg-primary/7 px-3 py-1.5 text-[0.74rem] font-medium text-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>

        <MotionReveal delay={0.18}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/solutions"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-7")}
            >
              {primaryLabel}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {secondaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
