import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteFAQAction } from "./actions";

export default async function AdminFAQsList() {
  const supabase = await createClient();
  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">FAQs</h1>
          <p className="text-muted-foreground mt-1">Manage common questions and answers.</p>
        </div>
          <Link href="/admin/faqs/new" className={buttonVariants()}>
            <Plus className="w-4 h-4 mr-2" />
            New FAQ
          </Link>
      </div>

      <div className="border rounded-md bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Question (EN)</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-center">Order</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {faqs?.map((f) => (
              <tr key={f.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium max-w-md truncate">{f.question_en}</td>
                <td className="px-6 py-4 text-muted-foreground">{f.category_en || "-"}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${f.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {f.is_active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{f.sort_order}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-muted-foreground">
                      <Link href={`/admin/faqs/${f.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    <form action={deleteFAQAction}>
                      <input type="hidden" name="id" value={f.id} />
                      <Button variant="ghost" size="icon" type="submit" className="hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!faqs || faqs.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No FAQs found. Click "New FAQ" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
