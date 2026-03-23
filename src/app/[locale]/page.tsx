import {useTranslations} from 'next-intl';
import { Hero } from '@/components/sections/Hero';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from "@/lib/utils";
import { 
  MonitorSmartphone, CalendarCheck, Workflow, Smartphone, 
  Scissors, Stethoscope, Briefcase, ArrowRight,
  CheckCircle2, Target, Rocket
} from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('Index');
  const tShared = useTranslations('Shared');
  const tServices = useTranslations('ServicesPage');
  const tSolutions = useTranslations('SolutionsPage');

  return (
    <>
      <Hero
        badge={t('heroBadge')}
        title={t('title')}
        description={t('description')}
        primaryCtaText={t('cta')}
        primaryCtaHref="/contact"
        secondaryCtaText={tShared('learnMore')}
        secondaryCtaHref="/services"
      />

      {/* Services Preview */}
      <Section className="bg-zinc-50 dark:bg-zinc-900/40 border-y border-border/40">
        <Container>
          <SectionHeader 
            title={t('servicesPreviewTitle')} 
            description={t('servicesPreviewDesc')} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<MonitorSmartphone className="w-6 h-6" />}
              title={tServices('webDesign')}
              description={tServices('webDesignDesc')}
            />
            <FeatureCard 
              icon={<CalendarCheck className="w-6 h-6" />}
              title={tServices('booking')}
              description={tServices('bookingDesc')}
            />
            <FeatureCard 
              icon={<Workflow className="w-6 h-6" />}
              title={tServices('automation')}
              description={tServices('automationDesc')}
            />
            <FeatureCard 
              icon={<Smartphone className="w-6 h-6" />}
              title={tServices('mobile')}
              description={tServices('mobileDesc')}
            />
          </div>
          <div className="mt-12 flex justify-center">
            <Link 
              href="/services" 
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 bg-transparent")}
            >
              {tShared('learnMore')} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Solutions Preview */}
      <Section>
        <Container>
          <SectionHeader 
            title={t('solutionsPreviewTitle')} 
            description={t('solutionsPreviewDesc')} 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <FeatureCard 
              className="bg-zinc-50 dark:bg-zinc-900/40"
              icon={<Scissors className="w-6 h-6" />}
              title={tSolutions('salons')}
              description={tSolutions('salonsDesc')}
            />
            <FeatureCard 
              className="bg-zinc-50 dark:bg-zinc-900/40"
              icon={<Stethoscope className="w-6 h-6" />}
              title={tSolutions('clinics')}
              description={tSolutions('clinicsDesc')}
            />
            <FeatureCard 
              className="bg-zinc-50 dark:bg-zinc-900/40"
              icon={<Briefcase className="w-6 h-6" />}
              title={tSolutions('consultants')}
              description={tSolutions('consultantsDesc')}
            />
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="bg-primary/5 border-y border-primary/10">
        <Container>
          <SectionHeader 
            title={t('processTitle')} 
            description={t('processDesc')} 
          />
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical connector on mobile, horizontal on desktop */}
            <div className="absolute left-8 top-8 bottom-8 w-[2px] bg-primary/15 md:hidden" />
            <div className="hidden md:block absolute top-8 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-[2px] bg-primary/15" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {[
                { num: '1', title: t('processStep1Title'), desc: t('processStep1Desc') },
                { num: '2', title: t('processStep2Title'), desc: t('processStep2Desc') },
                { num: '3', title: t('processStep3Title'), desc: t('processStep3Desc') },
              ].map((step) => (
                <div key={step.num} className="flex gap-5 md:flex-col md:items-center md:text-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Trust + CTA */}
      <Section>
        <Container className="max-w-4xl text-center">
          <SectionHeader 
            title={t('trustTitle')} 
            description={t('trustDesc')} 
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-16 text-left">
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
              <span className="font-semibold tracking-tight">SEO Optimized</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
              <Target className="w-5 h-5 text-primary shrink-0" />
              <span className="font-semibold tracking-tight">Conversion Driven</span>
            </div>
            <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-border/40 hover:border-border/80 transition-colors shadow-sm">
              <Rocket className="w-5 h-5 text-primary shrink-0" />
              <span className="font-semibold tracking-tight">Lightning Fast</span>
            </div>
          </div>
          
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
        </Container>
      </Section>
    </>
  );
}
