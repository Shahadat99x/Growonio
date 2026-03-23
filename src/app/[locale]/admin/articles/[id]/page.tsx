import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { requireAdminClient } from "@/lib/admin-auth";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { ArticleEditorForm, type ArticleEditorRecord } from "@/components/admin/ArticleEditorForm";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";

export default async function ArticleEditor({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";

  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Article" : "Edit Article"}</h1>
        <AdminEnvNotice />
      </div>
    );
  }

  let article: ArticleEditorRecord | null = null;

  if (!isNew) {
    const supabase = await requireAdminClient();
    const { data } = await supabase.from("articles").select("*").eq("id", id).single();
    if (!data) notFound();
    article = data as ArticleEditorRecord;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/admin/articles" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Article" : "Edit Article"}</h1>
          <p className="mt-1 text-muted-foreground">Bilingual content, SEO fields, and cover image.</p>
        </div>
      </div>

      <div className="rounded-md border bg-card p-6">
        <ArticleEditorForm id={id} locale={locale} article={article} />
      </div>
    </div>
  );
}
