'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/routing';
import {useTransition} from 'react';
import { cn } from '@/lib/utils';

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
    <div className="flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/40">
      <button
        onClick={() => onSelectChange('ro')}
        disabled={isPending || locale === 'ro'}
        className={cn(
          "text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200",
          locale === 'ro' 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-background/50",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        RO
      </button>
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending || locale === 'en'}
        className={cn(
          "text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200",
          locale === 'en' 
            ? "bg-background text-foreground shadow-sm" 
            : "text-muted-foreground hover:text-foreground hover:bg-background/50",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        EN
      </button>
    </div>
  );
}
