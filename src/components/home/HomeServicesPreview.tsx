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
  panelTitle: string;
  panelDescription: string;
  highlights: string[];
  services: LocalizedService[];
  shortLabels: Record<string, string>;
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
  panelTitle,
  panelDescription,
  highlights,
  services,
  shortLabels,
  primaryLabel,
  emptyTitle,
  emptyDescription,
}: HomeServicesPreviewProps) {
  const previewServices = services.slice(0, 3);

  return (
    <Section className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,rgba(253,252,255,0.98)_0%,rgba(248,248,251,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
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
              className={cn(buttonVariants({ size: "lg" }), "rounded-full px-7")}
            >
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1}>
          <div className="mt-8 rounded-[1.7rem] border border-slate-200/80 bg-white/94 px-5 py-4 shadow-[0_20px_50px_-42px_rgba(19,16,38,0.14)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-slate-700">
                  {panelTitle}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-600 md:text-[0.98rem]">
                  {panelDescription}
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="inline-flex items-center rounded-full border border-slate-200/85 bg-slate-50 px-3 py-1.5 text-[0.76rem] font-medium leading-5 text-slate-700"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MotionReveal>

        {previewServices.length > 0 ? (
          <div className="mt-8 grid gap-4 lg:grid-cols-3 xl:gap-5">
            {previewServices.map((service, index) => {
              const Icon = iconMap[service.icon_name] ?? MonitorSmartphone;
              const quickPoints = Array.isArray(service.bullet_points)
                ? service.bullet_points.slice(0, 2)
                : [];
              const compactTitle = shortLabels[service.slug] ?? service.title;

              return (
                <MotionReveal key={service.id} delay={0.06 + index * 0.05}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-slate-200/85 bg-white/96 p-5 shadow-[0_18px_48px_-38px_rgba(19,16,38,0.14)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_24px_60px_-38px_rgba(55,42,123,0.18)]">
                    <div className="absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.1),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(245,244,251,1)_0%,rgba(255,255,255,1)_100%)] text-primary shadow-[0_16px_30px_-26px_rgba(55,42,123,0.22)]">
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                          {compactTitle}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    {quickPoints.length > 0 && (
                      <div className="relative mt-5 flex flex-wrap gap-2">
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

                    <div className="relative mt-auto pt-5">
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {String(service.order).padStart(2, "0")}
                      </p>
                    </div>
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
          <div className="mt-6 flex flex-wrap gap-3 lg:hidden">
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
