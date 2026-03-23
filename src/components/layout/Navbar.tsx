import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const t = useTranslations('Navigation');

  return (
    <header className="border-b border-border/40 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Growonio
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('home')}
            </Link>
            <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('services')}
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('pricing')}
            </Link>
            <Link href="/work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              {t('work')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link 
            href="/contact"
            className={cn(buttonVariants({ variant: "default" }), "rounded-full px-6 shadow-none")}
          >
            {t('contact')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
