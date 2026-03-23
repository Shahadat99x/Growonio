import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/40 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-border/40 pb-12 mb-8">
          <div className="max-w-xs">
            <h2 className="text-xl font-bold mb-4 tracking-tight">Growonio</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Business automation built for growth. Helping service businesses thrive in the digital age with modern software solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('about')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('work')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('contact')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 tracking-tight">Services</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('services')}</a></li>
                <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t('pricing')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Growonio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
