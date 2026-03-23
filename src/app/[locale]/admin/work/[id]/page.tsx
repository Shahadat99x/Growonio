import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { requireAdminClient } from "@/lib/admin-auth";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { WorkItemEditorForm, type WorkItemEditorRecord } from "@/components/admin/WorkItemEditorForm";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";

export default async function WorkItemEditor({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";

  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Work Item" : "Edit Work Item"}</h1>
          <p className="mt-1 text-muted-foreground">Configure portfolio content, media, and stats.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }

  let work: WorkItemEditorRecord | null = null;

  if (!isNew) {
    const supabase = await requireAdminClient();
    const { data } = await supabase.from("work_items").select("*").eq("id", id).single();
    if (!data) {
      notFound();
    }

    work = data as WorkItemEditorRecord;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Link href="/admin/work" className={buttonVariants({ variant: "outline", size: "icon" })}>
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Work Item" : "Edit Work Item"}</h1>
          <p className="mt-1 text-muted-foreground">Configure portfolio content, media, and stats.</p>
        </div>
      </div>

      <div className="rounded-md border bg-card p-6">
        <WorkItemEditorForm id={id} locale={locale} work={work} />
      </div>
    </div>
  );
}
