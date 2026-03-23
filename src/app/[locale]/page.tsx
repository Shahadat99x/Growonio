import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('Index');

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <div className="max-w-3xl space-y-8">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wider uppercase">
          Proiect în curs de dezvoltare
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">
          {t('title')}
        </h1>
        
        <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
          {t('description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link
            href="/contact"
            className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-all text-lg shadow-lg shadow-black/10"
          >
            {t('cta')}
          </Link>
          <Link
            href="/services"
            className="bg-white text-black border border-zinc-200 px-8 py-4 rounded-full font-semibold hover:bg-zinc-50 transition-all text-lg"
          >
            Află mai multe
          </Link>
        </div>
      </div>

      <div className="mt-24 w-full max-w-5xl border border-zinc-100 rounded-2xl bg-zinc-50/50 p-4 shadow-sm">
        <div className="aspect-video flex items-center justify-center bg-white rounded-xl border border-zinc-100">
          <p className="text-zinc-400 font-medium">Placeholder pentru demo vizual</p>
        </div>
      </div>
    </div>
  );
}
