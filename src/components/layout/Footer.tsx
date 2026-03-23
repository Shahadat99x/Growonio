import {useTranslations} from 'next-intl';

export default function Footer() {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 border-b pb-8 mb-8">
          <div className="max-w-xs">
            <h2 className="text-lg font-bold mb-4">Growonio</h2>
            <p className="text-sm text-zinc-500">
              Business automation built for growth. Helping service businesses thrive in the digital age.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-600 hover:text-black">{t('about')}</a></li>
                <li><a href="#" className="text-sm text-zinc-600 hover:text-black">{t('work')}</a></li>
                <li><a href="#" className="text-sm text-zinc-600 hover:text-black">{t('contact')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm text-zinc-600 hover:text-black">{t('services')}</a></li>
                <li><a href="#" className="text-sm text-zinc-600 hover:text-black">{t('pricing')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-400">
            &copy; {currentYear} Growonio. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-zinc-400 hover:text-black">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
