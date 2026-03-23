import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="max-w-xl space-y-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
        <p className="text-lg text-muted-foreground">{t("description")}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className={buttonVariants()}>
            {t("home")}
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </div>
  );
}
