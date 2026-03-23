import { requireAdminClient } from "@/lib/admin-auth";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteWorkItemAction } from "./actions";

export default async function AdminWorkList() {
  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Items</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio case studies and client successes.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }

  const supabase = await requireAdminClient();
  const { data: works } = await supabase
    .from('work_items')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Work Items</h1>
          <p className="text-muted-foreground mt-1">Manage portfolio case studies and client successes.</p>
        </div>
          <Link href="/admin/work/new" className={buttonVariants()}>
            <Plus className="w-4 h-4 mr-2" />
            New Work
          </Link>
      </div>

      <div className="border rounded-md bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN)</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium text-center">Featured</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {works?.map((w) => (
              <tr key={w.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{w.title_en}</td>
                <td className="px-6 py-4 text-muted-foreground">{w.client_name}</td>
                <td className="px-6 py-4 text-center">
                  {w.is_featured && <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">Featured</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${w.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {w.is_active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-muted-foreground">
                      <Link href={`/admin/work/${w.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    <form action={deleteWorkItemAction}>
                      <input type="hidden" name="id" value={w.id} />
                      <Button variant="ghost" size="icon" type="submit" className="hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!works || works.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No work items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
