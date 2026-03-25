'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/services' as const, label: t('services') },
    { href: '/pricing' as const, label: t('pricing') },
    { href: '/work' as const, label: t('work') },
    { href: '/insights' as const, label: t('insights') },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "pt-3" : "pt-0",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8",
          isScrolled
            ? "h-[4.35rem] rounded-[1.6rem] border border-white/55 bg-white/78 shadow-[0_24px_60px_-34px_rgba(24,18,51,0.28)] backdrop-blur-2xl"
            : "h-[4.85rem] border-b border-border/45 bg-background/72 backdrop-blur-xl",
        )}
      >
        <div className="flex items-center gap-8">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <BrandMark compact={isScrolled} />
          </Link>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-border/55 bg-white/72 p-1 shadow-[0_16px_32px_-28px_rgba(24,18,51,0.2)] backdrop-blur-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  pathname === link.href
                    ? "bg-foreground text-background shadow-[0_12px_25px_-18px_rgba(24,18,51,0.45)]"
                    : "text-muted-foreground hover:bg-primary/8 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'hidden rounded-full px-5 sm:inline-flex',
            )}
          >
            {t('contact')}
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/55 bg-white/78 text-muted-foreground shadow-[0_14px_28px_-24px_rgba(24,18,51,0.25)] transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="mx-4 mt-3 overflow-hidden rounded-[1.6rem] border border-white/55 bg-white/88 shadow-[0_24px_60px_-34px_rgba(24,18,51,0.28)] backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200 md:hidden sm:mx-6"
        >
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  "flex items-center rounded-[1rem] px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  pathname === link.href
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-primary/8 hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-border/45 pt-3">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={cn(buttonVariants({ variant: 'default' }), 'w-full rounded-full')}
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
