import { requireAdminClient } from "@/lib/admin-auth";
import { hasSupabaseAdminEnv } from "@/lib/supabase/server";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deletePricingPackageAction } from "./actions";

export default async function AdminPricingList() {
  if (!hasSupabaseAdminEnv()) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Packages</h1>
          <p className="text-muted-foreground mt-1">Configure pricing tiers and subscription options.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }

  const supabase = await requireAdminClient();
  const { data: packages } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pricing Packages</h1>
          <p className="text-muted-foreground mt-1">Configure pricing tiers and subscription options.</p>
        </div>
          <Link href="/admin/pricing/new" className={buttonVariants()}>
            <Plus className="w-4 h-4 mr-2" />
            New Package
          </Link>
      </div>

      <div className="border rounded-md bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN)</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium text-center">Highlight</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {packages?.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{pkg.title_en}</td>
                <td className="px-6 py-4 text-muted-foreground">{pkg.price_monthly}</td>
                <td className="px-6 py-4 text-center">
                  {pkg.is_popular && <span className="text-xs font-semibold px-2 py-1 bg-amber-100 text-amber-800 rounded">Popular</span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {pkg.is_active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-muted-foreground">
                      <Link href={`/admin/pricing/${pkg.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    <form action={deletePricingPackageAction}>
                      <input type="hidden" name="id" value={pkg.id} />
                      <Button variant="ghost" size="icon" type="submit" className="hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!packages || packages.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No pricing packages found. Click &quot;New Package&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
