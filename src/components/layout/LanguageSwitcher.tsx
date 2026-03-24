'use client';

import { Languages } from 'lucide-react';
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
    <div className="inline-flex items-center gap-1 rounded-full border border-border/65 bg-white/75 p-1 shadow-[0_14px_30px_-26px_rgba(24,18,51,0.25)] backdrop-blur-xl">
      <div className="hidden h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary sm:flex">
        <Languages className="h-4 w-4" />
      </div>
      <button
        onClick={() => onSelectChange('ro')}
        disabled={isPending || locale === 'ro'}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200",
          locale === 'ro' 
            ? "bg-foreground text-background shadow-[0_10px_22px_-16px_rgba(24,18,51,0.45)]" 
            : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        RO
      </button>
      <button
        onClick={() => onSelectChange('en')}
        disabled={isPending || locale === 'en'}
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-200",
          locale === 'en' 
            ? "bg-foreground text-background shadow-[0_10px_22px_-16px_rgba(24,18,51,0.45)]" 
            : "text-muted-foreground hover:bg-background/80 hover:text-foreground",
          isPending && "opacity-50 cursor-not-allowed"
        )}
      >
        EN
      </button>
    </div>
  );
}
