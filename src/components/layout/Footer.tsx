import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const t = useTranslations('Navigation');
  const tFooter = useTranslations('Footer');
  const tLegal = useTranslations('Legal');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/40 border-t border-border/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10 border-b border-border/40 pb-10 mb-8">
          <div className="max-w-xs">
            <h2 className="text-xl font-bold mb-3 tracking-tight">Growonio</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tFooter('description')}
            </p>
            <a
              href={`mailto:${siteConfig.companyEmail}`}
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline"
            >
              {siteConfig.companyEmail}
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">{tFooter('company')}</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('about')}</Link></li>
                <li><Link href="/work" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('work')}</Link></li>
                <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('contact')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">{tFooter('services')}</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('services')}</Link></li>
                <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('pricing')}</Link></li>
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('faq')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">{tFooter('resources')}</h3>
              <ul className="space-y-3">
                <li><Link href="/insights" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('insights')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Growonio. {tFooter('rights')}
          </p>
          <div className="flex flex-wrap gap-6">
            <Link href="/legal/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{tLegal('privacy')}</Link>
            <Link href="/legal/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{tLegal('terms')}</Link>
            <Link href="/legal/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{tLegal('cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
