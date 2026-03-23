import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/server";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteServiceAction } from "./actions";

export default async function AdminServicesList() {
  if (!hasSupabaseEnv()) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the core capabilities offered to clients.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }

  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">Manage the core capabilities offered to clients.</p>
        </div>
          <Link href="/admin/services/new" className={buttonVariants()}>
            <Plus className="w-4 h-4 mr-2" />
            New Service
          </Link>
      </div>

      <div className="border rounded-md bg-card">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 font-medium">Title (EN)</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-center">Order</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services?.map((service) => (
              <tr key={service.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-medium">{service.title_en}</td>
                <td className="px-6 py-4 text-muted-foreground">{service.slug}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {service.is_active ? 'Active' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{service.sort_order}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 text-muted-foreground">
                      <Link href={`/admin/services/${service.id}`} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    <form action={deleteServiceAction}>
                      <input type="hidden" name="id" value={service.id} />
                      <Button variant="ghost" size="icon" type="submit" className="hover:text-destructive hover:bg-destructive/10">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {(!services || services.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                  No services found. Click "New Service" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
