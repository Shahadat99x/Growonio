import type { Metadata } from "next";
import {useTranslations} from 'next-intl';
import { getTranslations } from "next-intl/server";
import { Hero } from '@/components/sections/Hero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { MotionReveal } from '@/components/motion/Reveal';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { JsonLd } from "@/components/seo/JsonLd";
import { buildOrganizationSchema, buildPageMetadata, buildWebsiteSchema, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { 
  MonitorSmartphone, CalendarCheck, Workflow, Smartphone, 
  Scissors, Stethoscope, Briefcase, ArrowRight,
  CheckCircle2, Target, Rocket
} from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Index" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function HomePage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations('Index');
  const tShared = useTranslations('Shared');
  const tServices = useTranslations('ServicesPage');
  const tSolutions = useTranslations('SolutionsPage');

  return (
    <>
      <JsonLd data={[buildOrganizationSchema(locale), buildWebsiteSchema(locale)]} />

      <Hero
        badge={t('heroBadge')}
        title={t('title')}
        description={t('description')}
        supportingLine={t('supportingLine')}
        primaryCtaText={t('cta')}
        primaryCtaHref="/contact"
        secondaryCtaText={t('heroSecondaryCta')}
        secondaryCtaHref="/services"
        trustChips={t.raw('heroTrustChips') as string[]}
        visualEyebrow={t('heroVisualEyebrow')}
        visualTitle={t('heroVisualTitle')}
        visualDescription={t('heroVisualDescription')}
        workflowSteps={t.raw('heroWorkflowSteps') as string[]}
        floatingLeadEyebrow={t('heroFloatingLeadEyebrow')}
        floatingLeadText={t('heroFloatingLeadText')}
        floatingReportEyebrow={t('heroFloatingReportEyebrow')}
        floatingReportText={t('heroFloatingReportText')}
      />

      {/* Services Preview */}
      <Section variant="tint">
        <Container>
          <MotionReveal>
            <SectionHeader 
              title={t('servicesPreviewTitle')} 
              description={t('servicesPreviewDesc')} 
            />
          </MotionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MotionReveal delay={0.04}>
              <FeatureCard 
                icon={<MonitorSmartphone className="w-6 h-6" />}
                title={tServices('webDesign')}
                description={tServices('webDesignDesc')}
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <FeatureCard 
                icon={<CalendarCheck className="w-6 h-6" />}
                title={tServices('booking')}
                description={tServices('bookingDesc')}
              />
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <FeatureCard 
                icon={<Workflow className="w-6 h-6" />}
                title={tServices('automation')}
                description={tServices('automationDesc')}
              />
            </MotionReveal>
            <MotionReveal delay={0.16}>
              <FeatureCard 
                icon={<Smartphone className="w-6 h-6" />}
                title={tServices('mobile')}
                description={tServices('mobileDesc')}
              />
            </MotionReveal>
          </div>
          <MotionReveal delay={0.2}>
            <div className="mt-12 flex justify-center">
              <Link 
                href="/services" 
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 bg-transparent")}
              >
                {tShared('learnMore')} <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/work"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
              >
                {t("exploreWork")}
              </Link>
              <Link
                href="/insights"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
              >
                {t("readInsights")}
              </Link>
            </div>
          </MotionReveal>
        </Container>
      </Section>

      {/* Solutions Preview */}
      <Section>
        <Container>
          <MotionReveal>
            <SectionHeader 
              title={t('solutionsPreviewTitle')} 
              description={t('solutionsPreviewDesc')} 
            />
          </MotionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <MotionReveal delay={0.04}>
              <FeatureCard 
                className="bg-zinc-50 dark:bg-zinc-900/40"
                icon={<Scissors className="w-6 h-6" />}
                title={tSolutions('salons')}
                description={tSolutions('salonsDesc')}
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <FeatureCard 
                className="bg-zinc-50 dark:bg-zinc-900/40"
                icon={<Stethoscope className="w-6 h-6" />}
                title={tSolutions('clinics')}
                description={tSolutions('clinicsDesc')}
              />
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <FeatureCard 
                className="bg-zinc-50 dark:bg-zinc-900/40"
                icon={<Briefcase className="w-6 h-6" />}
                title={tSolutions('consultants')}
                description={tSolutions('consultantsDesc')}
              />
            </MotionReveal>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section variant="feature">
        <Container>
          <MotionReveal>
            <SectionHeader 
              title={t('processTitle')} 
              description={t('processDesc')} 
              className="text-white [&_h2]:text-white [&_p]:text-white/72"
            />
          </MotionReveal>
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical connector on mobile, horizontal on desktop */}
            <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-white/12 md:hidden" />
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px] bg-white/12" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                { num: '1', title: t('processStep1Title'), desc: t('processStep1Desc') },
                { num: '2', title: t('processStep2Title'), desc: t('processStep2Desc') },
                { num: '3', title: t('processStep3Title'), desc: t('processStep3Desc') },
              ].map((step, index) => (
                <MotionReveal key={step.num} delay={0.08 + index * 0.08}>
                  <div className="relative z-10 flex gap-5 md:flex-col md:items-center md:text-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-black/20 shrink-0 ring-1 ring-white/14">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                      <p className="text-white/72 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust + CTA */}
      <Section>
        <Container className="max-w-4xl text-center">
          <MotionReveal>
            <SectionHeader 
              title={t('trustTitle')} 
              description={t('trustDesc')} 
              className="mb-10"
            />
          </MotionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16 text-left">
            <MotionReveal delay={0.04}>
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold tracking-tight">SEO Optimized</span>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
                <Target className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold tracking-tight">Conversion Driven</span>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.12}>
              <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
                <Rocket className="w-5 h-5 text-primary shrink-0" />
                <span className="font-semibold tracking-tight">Lightning Fast</span>
              </div>
            </MotionReveal>
          </div>
          
          <MotionReveal delay={0.18}>
            <div className="p-8 md:p-16 rounded-[2rem] bg-primary text-primary-foreground shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{t('ctaHeading')}</h3>
                <p className="text-primary-foreground/90 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                  {t('ctaDesc')}
                </p>
                <Link 
                  href="/contact" 
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-8 h-14 text-base font-bold shadow-xl hover:scale-105 transition-transform")}
                >
                  {t('ctaButton')} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </MotionReveal>
        </Container>
      </Section>
    </>
  );
}
