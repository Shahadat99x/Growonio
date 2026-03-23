import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteArticleAction } from "./actions";
import { requireAdminClient } from "@/lib/admin-auth";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";

export default async function AdminArticlesList() {
  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-8 animate-in fade-in duration-500">
        <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
        <AdminEnvNotice />
      </div>
    );
  }

  const supabase = await requireAdminClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Articles</h1>
          <p className="mt-1 text-muted-foreground">Manage blog posts and insights.</p>
        </div>
        <Link href="/admin/articles/new" className={buttonVariants()}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Link>
      </div>

      <div className="overflow-hidden rounded-md border bg-card">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50 text-xs uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN)</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-center">Featured</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {articles?.map((a) => (
              <tr key={a.id} className="transition-colors hover:bg-muted/30">
                <td className="max-w-md truncate px-6 py-4 font-medium">{a.title_en}</td>
                <td className="px-6 py-4 text-muted-foreground">{a.category || "—"}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    a.status === "published"
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {a.status === "published" ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {a.is_featured ? "⭐" : "—"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-muted-foreground">
                    <Link href={`/admin/articles/${a.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                      <Edit className="h-4 w-4" />
                    </Link>
                    <form action={deleteArticleAction}>
                      <input type="hidden" name="id" value={a.id} />
                      <Button variant="ghost" size="icon" type="submit" className="hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!articles || articles.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No articles found. Click &ldquo;New Article&rdquo; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
