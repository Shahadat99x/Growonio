import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('Navigation');

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Growonio
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t('home')}
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t('services')}
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t('pricing')}
            </Link>
            <Link href="/work" className="text-sm font-medium hover:text-blue-600 transition-colors">
              {t('work')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <LanguageSwitcher />
          <Link 
            href="/contact" 
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            {t('contact')}
          </Link>
        </div>
      </nav>
    </header>
  );
}
