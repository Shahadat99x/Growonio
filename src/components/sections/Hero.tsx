import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface HeroProps {
  badge?: string;
  title: string | React.ReactNode;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export function Hero({
  badge,
  title,
  description,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
}: HeroProps) {
  return (
    <Section className="relative overflow-hidden bg-background pt-20 pb-16 md:pt-28 md:pb-24 lg:pt-36 lg:pb-32">
      {/* Background visual */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        {badge && (
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            {badge}
          </div>
        )}
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mb-6 leading-[1.1]">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            href={primaryCtaHref}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto rounded-full px-8 h-13 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow")}
          >
            {primaryCtaText}
          </Link>
          
          {secondaryCtaText && secondaryCtaHref && (
            <Link 
              href={secondaryCtaHref}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto rounded-full px-8 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 border-border shadow-sm")}
            >
              {secondaryCtaText}
            </Link>
          )}
        </div>
      </Container>
    </Section>
  );
}
