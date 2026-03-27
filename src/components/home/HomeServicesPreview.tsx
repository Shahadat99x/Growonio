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
  primaryLabel: string;
  learnMoreLabel: string;
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
  primaryLabel,
  learnMoreLabel,
  emptyTitle,
  emptyDescription,
}: HomeServicesPreviewProps) {
  const previewServices = services.slice(0, 3);

  return (
    <Section className="relative overflow-hidden border-y border-slate-200/70 bg-[linear-gradient(180deg,rgba(253,252,255,0.98)_0%,rgba(248,248,251,0.98)_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(63,103,220,0.05),transparent_26%)]" />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:items-end">
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
            <div className="relative overflow-hidden rounded-[2.1rem] border border-slate-200/85 bg-white/96 p-7 shadow-[0_28px_72px_-46px_rgba(19,16,38,0.2)]">
              <div className="absolute inset-y-0 right-0 w-2/5 bg-[radial-gradient(circle_at_center,rgba(93,69,209,0.1),transparent_68%)]" />
              <p className="relative text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
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

        {previewServices.length > 0 ? (
          <div className="mt-14 grid gap-5 lg:grid-cols-3 xl:gap-6">
            {previewServices.map((service, index) => {
              const Icon = iconMap[service.icon_name] ?? MonitorSmartphone;
              const quickPoints = Array.isArray(service.bullet_points)
                ? service.bullet_points.slice(0, 2)
                : [];

              return (
                <MotionReveal key={service.id} delay={0.06 + index * 0.05}>
                  <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-slate-200/85 bg-white/96 p-6 shadow-[0_22px_58px_-40px_rgba(19,16,38,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_28px_70px_-40px_rgba(55,42,123,0.2)]">
                    <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(93,69,209,0.12),transparent_72%)] opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-[1.1rem] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(245,244,251,1)_0%,rgba(255,255,255,1)_100%)] text-primary shadow-[0_18px_36px_-30px_rgba(55,42,123,0.25)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {String(service.order).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative mt-6 flex flex-1 flex-col">
                      <h3 className="text-xl font-semibold tracking-[-0.035em] text-slate-950">
                        {service.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>

                      {quickPoints.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2.5">
                          {quickPoints.map((point) => (
                            <span
                              key={point}
                              className="rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1.5 text-[0.78rem] font-medium leading-5 text-slate-700"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto pt-7">
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
          <div className="mt-10 flex flex-wrap gap-3">
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
