import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { WorkItemCardImage } from "@/components/media/WorkItemCardImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getWorkItemImageAlt } from "@/lib/cloudinary";
import { getWorkItems } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { buildPageMetadata, type AppLocale } from "@/lib/seo";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });

  return buildPageMetadata({
    locale: locale as AppLocale,
    pathname: "/work",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WorkPage" });
  const items = await getWorkItems(locale);

  return (
    <div className="min-h-[80vh] pb-24 pt-16">
      <Section>
        <Container>
          <SectionHeader title={t("title")} description={t("description")} />

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
            {items.map((item) => (
              <article key={item.id} className="group rounded-3xl border border-border/40 bg-card/70 p-4 shadow-sm transition-colors hover:border-border">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border/40 bg-zinc-100 dark:bg-zinc-900/70">
                  <WorkItemCardImage
                    src={item.image_url}
                    alt={getWorkItemImageAlt(item)}
                    title={item.title}
                  />
                </div>

                <div className="space-y-4 px-2 pb-2 pt-6">
                  <div className="space-y-2">
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">{item.industry}</p>
                    <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-primary">{item.title}</h3>
                    <p className="text-sm font-medium text-primary/80">{item.client_name}</p>
                    <p className="leading-7 text-muted-foreground">{item.description}</p>
                  </div>

                  {item.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {item.stats.slice(0, 4).map((stat) => (
                        <div key={`${item.id}-${stat.label}`} className="rounded-2xl border border-border/50 bg-background/70 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{stat.label}</p>
                          <p className="mt-2 text-lg font-semibold tracking-tight">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center text-sm font-semibold text-primary">
                    {t("viewProject")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/services"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
            >
              {t("servicesLinkLabel")}
            </Link>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}
            >
              {t("contactLinkLabel")}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
