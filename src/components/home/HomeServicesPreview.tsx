import { ArrowRight, CalendarCheck, CheckCircle2, MonitorSmartphone, Smartphone, Workflow } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type ServiceModule = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

interface HomeServicesPreviewProps {
  badge: string;
  title: string;
  description: string;
  panelTitle: string;
  panelDescription: string;
  highlights: string[];
  cards: ServiceModule[];
  primaryLabel: string;
  secondaryLabel: string;
  tertiaryLabel: string;
  learnMoreLabel: string;
}

const serviceIcons = [MonitorSmartphone, CalendarCheck, Workflow, Smartphone];
const layoutClasses = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];
const accentClasses = [
  "from-[#5d45d1]/16 via-[#5d45d1]/4 to-transparent",
  "from-[#3f67dc]/14 via-[#5d45d1]/4 to-transparent",
  "from-[#4338ca]/14 via-[#5d45d1]/4 to-transparent",
  "from-slate-700/12 via-[#5d45d1]/4 to-transparent",
];

export function HomeServicesPreview({
  badge,
  title,
  description,
  panelTitle,
  panelDescription,
  highlights,
  cards,
  primaryLabel,
  secondaryLabel,
  tertiaryLabel,
  learnMoreLabel,
}: HomeServicesPreviewProps) {
  return (
    <Section className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,rgba(253,252,255,0.98)_0%,rgba(248,248,251,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(63,103,220,0.06),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-end">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-none [&_div]:border-slate-200/80 [&_div]:bg-white/92 [&_div]:text-slate-700 [&_h2]:text-slate-950 [&_p]:text-slate-600"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200/85 bg-white/96 p-7 shadow-[0_28px_70px_-46px_rgba(19,16,38,0.24)]">
              <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_center,rgba(93,69,209,0.1),transparent_68%)]" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.22em] text-slate-700">
                {panelTitle}
              </p>
              <p className="relative mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-[1.02rem]">
                {panelDescription}
              </p>
              <div className="relative mt-6 flex flex-wrap gap-3">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-slate-200/85 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_14px_28px_-24px_rgba(19,16,38,0.14)]"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </MotionReveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12 xl:gap-6">
          {cards.map((card, index) => {
            const Icon = serviceIcons[index] ?? MonitorSmartphone;

            return (
              <MotionReveal
                key={card.title}
                delay={0.06 + index * 0.06}
                className={layoutClasses[index]}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/85 bg-white/96 p-7 shadow-[0_24px_62px_-44px_rgba(19,16,38,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_30px_74px_-42px_rgba(55,42,123,0.24)]">
                  <div
                    className={cn(
                      "absolute inset-x-0 top-0 h-28 bg-linear-to-br opacity-90 transition-opacity duration-300 group-hover:opacity-100",
                      accentClasses[index],
                    )}
                  />
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(245,244,251,1)_0%,rgba(255,255,255,1)_100%)] text-primary shadow-[0_18px_36px_-30px_rgba(55,42,123,0.28)] ring-1 ring-white transition-transform duration-300 group-hover:scale-[1.04]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {card.eyebrow}
                    </span>
                  </div>

                  <div className="relative mt-7 flex flex-1 flex-col">
                    <h3 className="max-w-xl text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                      {card.description}
                    </p>

                    <ul className="mt-6 grid gap-3">
                      {card.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-7 flex items-center justify-end border-t border-slate-200/75 pt-5">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-primary"
                      >
                        {learnMoreLabel}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
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
              href="/services"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/work"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full border-slate-300/80 bg-white/92 px-7 text-slate-800 hover:bg-white")}
            >
              {secondaryLabel}
            </Link>
            <Link
              href="/insights"
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }), "rounded-full px-6 text-slate-700 hover:bg-slate-100")}
            >
              {tertiaryLabel}
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
