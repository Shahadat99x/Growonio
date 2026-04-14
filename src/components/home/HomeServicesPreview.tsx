import {
  ArrowRight,
  CalendarCheck,
  MonitorSmartphone,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { LocalizedService } from "@/types/content";

interface HomeServicesPreviewProps {
  badge: string;
  title: string;
  description: string;
  previewCards: Array<{
    title: string;
    description: string;
    pills: string[];
  }>;
  services: LocalizedService[];
  primaryLabel: string;
  emptyTitle: string;
  emptyDescription: string;
}

const iconMap: Record<string, LucideIcon> = {
  MonitorSmartphone,
  CalendarCheck,
  Workflow,
  Smartphone,
};

export function HomeServicesPreview({
  badge,
  title,
  description,
  previewCards,
  services,
  primaryLabel,
  emptyTitle,
  emptyDescription,
}: HomeServicesPreviewProps) {
  const availableServices = new Map(services.map((service) => [service.slug, service]));
  const previewConfigs = [
    { slugs: ["web-design", "mobile-apps"], fallbackIcon: MonitorSmartphone },
    { slugs: ["booking-systems"], fallbackIcon: CalendarCheck },
    { slugs: ["automations"], fallbackIcon: Workflow },
  ] as const;
  const curatedCards = previewCards
    .map((card, index) => {
      const config = previewConfigs[index];
      if (!config) {
        return null;
      }

      const service = config.slugs
        .map((slug) => availableServices.get(slug))
        .find((item): item is LocalizedService => Boolean(item));

      if (!service) {
        return null;
      }

      return {
        ...card,
        Icon: iconMap[service.icon_name] ?? config.fallbackIcon,
      };
    })
    .filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <Section className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,rgba(253,252,255,0.98)_0%,rgba(248,248,251,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <MotionReveal>
            <SectionHeader
              align="left"
              badge={badge}
              title={title}
              description={description}
              className="mb-0 max-w-3xl [&_div]:border-slate-200/80 [&_div]:bg-white/92 [&_div]:text-slate-700 [&_h2]:text-slate-950 [&_h2]:md:text-[3rem] [&_p]:max-w-xl [&_p]:text-slate-600"
            />
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <Link
              href="/services"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden rounded-full px-7 lg:inline-flex",
              )}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionReveal>
        </div>

        {curatedCards.length > 0 ? (
          <div className="mt-6 grid gap-4 lg:grid-cols-3 xl:mt-8 xl:gap-5">
            {curatedCards.map((card, index) => {
              const quickPoints = Array.isArray(card.pills) ? card.pills.slice(0, 2) : [];
              const Icon = card.Icon;

              return (
                <MotionReveal key={card.title} delay={0.06 + index * 0.05}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-slate-200/85 bg-white/96 p-4 shadow-[0_18px_48px_-38px_rgba(19,16,38,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_60px_-38px_rgba(55,42,123,0.18)] sm:rounded-[1.7rem] sm:p-5">
                    <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.1),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(245,244,251,1)_0%,rgba(255,255,255,1)_100%)] text-primary shadow-[0_16px_30px_-26px_rgba(55,42,123,0.22)]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                          {card.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {quickPoints.length > 0 && (
                      <div className="relative mt-4 flex flex-wrap gap-2 sm:mt-5">
                        {quickPoints.map((point) => (
                          <span
                            key={point}
                            className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-[0.74rem] font-medium leading-5 text-slate-700"
                          >
                            {point}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        ) : (
          <MotionReveal delay={0.08}>
            <div className="mt-14 rounded-[2rem] border border-slate-200/80 bg-white/96 px-7 py-10 shadow-[0_22px_56px_-42px_rgba(19,16,38,0.16)]">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                {emptyTitle}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {emptyDescription}
              </p>
            </div>
          </MotionReveal>
        )}

        <MotionReveal delay={0.16}>
          <div className="mt-5 flex flex-wrap gap-3 lg:hidden sm:mt-6">
            <Link
              href="/services"
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
