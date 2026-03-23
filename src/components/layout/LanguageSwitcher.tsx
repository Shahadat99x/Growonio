'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import {useTransition} from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSelectChange('ro')}
        disabled={isPending || locale === 'ro'}
        className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
          locale === 'ro' 
            ? 'bg-black text-white' 
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
        } disabled:opacity-50`}
      >
        RO
      </button>
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending || locale === 'en'}
        className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
          locale === 'en' 
            ? 'bg-black text-white' 
            : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
        } disabled:opacity-50`}
      >
        EN
      </button>
    </div>
  );
}
