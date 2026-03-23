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
        title={t('title')}
        description={t('description')}
        primaryCtaText={t('cta')}
        primaryCtaHref="/contact"
        secondaryCtaText={tShared('learnMore')}
        secondaryCtaHref="/services"
      />

      <Section className="bg-zinc-50 dark:bg-zinc-900/40 border-y border-border/40">
        <Container>
          <SectionHeader 
            title={t('servicesPreviewTitle')} 
            description={t('servicesPreviewDesc')} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <Section>
        <Container>
          <SectionHeader 
            title={t('solutionsPreviewTitle')} 
            description={t('solutionsPreviewDesc')} 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      <Section className="bg-primary/5 border-y border-primary/10">
        <Container>
          <SectionHeader 
            title={t('processTitle')} 
            description={t('processDesc')} 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-xl font-bold">Discovery</h3>
              <p className="text-muted-foreground">We analyze your business bottlenecks and map out a digital strategy.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="hidden md:block absolute top-8 -left-1/2 w-full h-[2px] bg-primary/20 -z-10" />
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-xl font-bold">Development</h3>
              <p className="text-muted-foreground">We build your custom architecture with transparent milestone updates.</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4 relative">
              <div className="hidden md:block absolute top-8 -left-1/2 w-full h-[2px] bg-primary/20 -z-10" />
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-xl font-bold">Launch & Scale</h3>
              <p className="text-muted-foreground">Deployment, training, and ongoing support to accelerate growth.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl text-center">
          <SectionHeader 
            title={t('trustTitle')} 
            description={t('trustDesc')} 
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16 text-left">
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
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to automate your growth?</h3>
              <p className="text-primary-foreground/90 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
                Let's talk about how our transparent process and modern tech stack can elevate your business.
              </p>
              <Link 
                href="/contact" 
                className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "rounded-full px-8 h-14 text-base font-bold shadow-xl hover:scale-105 transition-transform")}
              >
                Book a Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
