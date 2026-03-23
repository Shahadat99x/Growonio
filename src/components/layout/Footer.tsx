import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function Footer() {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/40 border-t border-border/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-border/40 pb-10 mb-8">
          <div className="max-w-xs">
            <h2 className="text-xl font-bold mb-3 tracking-tight">Growonio</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Business automation built for growth. Helping service businesses thrive in the digital age with modern software solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('about')}</Link></li>
                <li><Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('work')}</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('services')}</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('pricing')}</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('faq')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">Resources</h3>
              <ul className="space-y-3">
                <li><Link href="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('insights')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Growonio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
