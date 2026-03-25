import { ArrowRight, Clock3, Mail, MapPin, MessageCircleMore } from "lucide-react";
import { useTranslations } from "next-intl";

import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/layout/Container";
import { MotionReveal } from "@/components/motion/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("Navigation");
  const tFooter = useTranslations("Footer");
  const tLegal = useTranslations("Legal");
  const currentYear = new Date().getFullYear();
  const microPoints = tFooter.raw("microPoints") as string[];

  const companyLinks = [
    { href: "/about", label: t("about") },
    { href: "/work", label: t("work") },
    { href: "/contact", label: t("contact") },
  ];

  const serviceLinks = [
    { href: "/services", label: t("services") },
    { href: "/pricing", label: t("pricing") },
    { href: "/solutions", label: t("solutions") },
  ];

  const resourceLinks = [
    { href: "/insights", label: t("insights") },
    { href: "/faq", label: t("faq") },
    { href: "/legal/privacy", label: tLegal("privacy") },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(16,12,31,1)_0%,rgba(23,17,43,1)_34%,rgba(18,14,35,1)_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(144,104,255,0.18),transparent_26%),radial-gradient(circle_at_88%_22%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_bottom_right,rgba(91,60,190,0.16),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full border border-white/8" />
      <div className="pointer-events-none absolute right-[-7rem] top-28 h-96 w-96 rounded-full border border-white/6" />

      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
          <MotionReveal>
            <div className="max-w-xl">
              <div className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/72 backdrop-blur-sm">
                {tFooter("eyebrow")}
              </div>

              <BrandMark tone="inverse" className="mt-7" />

              <h2 className="mt-7 text-3xl font-semibold tracking-[-0.05em] text-white md:text-4xl lg:text-[3rem] lg:leading-[1.04]">
                {tFooter("title")}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                {tFooter("description")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {microPoints.map((point) => (
                  <div
                    key={point}
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/82 backdrop-blur-sm"
                  >
                    <span className="mr-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_-1px_color-mix(in_oklab,var(--color-primary)_90%,transparent)]" />
                    {point}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "rounded-full px-7 text-base font-semibold shadow-[0_22px_45px_-28px_rgba(0,0,0,0.5)]",
                  )}
                >
                  {tFooter("ctaPrimary")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-white/14 bg-white/10 px-7 text-base text-white hover:border-white/24 hover:bg-white/14",
                  )}
                >
                  {tFooter("ctaSecondary")}
                </Link>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="rounded-[2.2rem] border border-white/10 bg-white/7 p-6 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.72)] backdrop-blur-md md:p-7">
              <div className="rounded-[1.7rem] border border-white/10 bg-white/6 p-5 md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-white/12 bg-white/10 text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/66">
                      {tFooter("contactTitle")}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-white/70 md:text-[0.96rem]">
                      {tFooter("contactDescription")}
                    </p>
                    <a
                      href={`mailto:${siteConfig.companyEmail}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-primary"
                    >
                      {siteConfig.companyEmail}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/12 px-5 py-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/54">
                        {tFooter("availabilityLabel")}
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/84">
                        {tFooter("availabilityValue")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-black/12 px-5 py-4 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/54">
                        {tFooter("responseLabel")}
                      </p>
                      <p className="mt-2 text-sm font-medium text-white/84">
                        {tFooter("responseValue")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 sm:grid-cols-3">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                    {tFooter("company")}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {companyLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/72 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                    {tFooter("services")}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {serviceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/72 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/56">
                    {tFooter("resources")}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {resourceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-white/72 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {siteConfig.links.whatsapp && (
                    <a
                      href={siteConfig.links.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/82 transition-colors hover:text-primary"
                    >
                      <MessageCircleMore className="h-4 w-4" />
                      {tFooter("whatsapp")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.12}>
          <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 md:mt-14 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/54">
              &copy; {currentYear} Growonio. {tFooter("rights")}
            </p>
            <div className="flex flex-wrap gap-5 md:gap-6">
              <Link href="/legal/privacy" className="text-sm text-white/62 transition-colors hover:text-white">
                {tLegal("privacy")}
              </Link>
              <Link href="/legal/terms" className="text-sm text-white/62 transition-colors hover:text-white">
                {tLegal("terms")}
              </Link>
              <Link href="/legal/cookies" className="text-sm text-white/62 transition-colors hover:text-white">
                {tLegal("cookies")}
              </Link>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </footer>
  );
}
