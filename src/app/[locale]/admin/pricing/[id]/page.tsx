import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";
import { AdminEnvNotice } from "@/components/admin/AdminEnvNotice";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { savePricingPackageAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { notFound } from "next/navigation";

export default async function PricingEditor({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";

  if (!hasSupabaseEnv()) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Pricing Package" : "Edit Pricing Package"}</h1>
          <p className="text-muted-foreground mt-1">Features arrays can be entered as one item per line.</p>
        </div>
        <AdminEnvNotice />
      </div>
    );
  }
  
  let pkg: any = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("pricing_packages").select("*").eq("id", id).single();
    if (!data) notFound();
    pkg = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
          <Link href="/admin/pricing" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Pricing Package" : "Edit Pricing Package"}</h1>
          <p className="text-muted-foreground mt-1">Features arrays can be entered as one item per line.</p>
        </div>
      </div>

      <div className="bg-card border rounded-md p-6">
        <form action={savePricingPackageAction as any} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="locale" value={locale} />
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title_en">Title (English)</Label>
              <Input id="title_en" name="title_en" defaultValue={pkg?.title_en} required placeholder="e.g. Starter" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_ro">Title (Romanian)</Label>
              <Input id="title_ro" name="title_ro" defaultValue={pkg?.title_ro} required placeholder="e.g. Începător" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price_monthly">Price (Display Text)</Label>
              <Input id="price_monthly" name="price_monthly" defaultValue={pkg?.price_monthly} required placeholder="e.g. €499 or Custom" />
            </div>
            <div className="flex gap-6 items-end pb-2">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="is_popular" 
                  name="is_popular" 
                  defaultChecked={pkg?.is_popular} 
                  className="w-4 h-4 rounded border-gray-300"
                />
                <Label htmlFor="is_popular" className="cursor-pointer">Highlight as Popular</Label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea id="description_en" name="description_en" defaultValue={pkg?.description_en} rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_ro">Description (Romanian)</Label>
              <Textarea id="description_ro" name="description_ro" defaultValue={pkg?.description_ro} rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="features_en">Features (English) - One per line</Label>
              <Textarea 
                id="features_en" 
                name="features_en" 
                defaultValue={pkg?.features_en?.join('\n')} 
                rows={6} 
                placeholder="Custom 5-page website&#10;Basic SEO setup"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features_ro">Features (Romanian) - One per line</Label>
              <Textarea 
                id="features_ro" 
                name="features_ro" 
                defaultValue={pkg?.features_ro?.join('\n')} 
                rows={6} 
                placeholder="Site web 5 pagini&#10;SEO de bază"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="cta_text_en">CTA Text (EN)</Label>
              <Input id="cta_text_en" name="cta_text_en" defaultValue={pkg?.cta_text_en} placeholder="Get Started" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_text_ro">CTA Text (RO)</Label>
              <Input id="cta_text_ro" name="cta_text_ro" defaultValue={pkg?.cta_text_ro} placeholder="Începe acum" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="cta_link">CTA Link (URL)</Label>
            <Input id="cta_link" name="cta_link" defaultValue={pkg?.cta_link} placeholder="/contact" />
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={pkg?.sort_order ?? 0} />
            </div>
            <div className="flex items-center gap-2 mt-8">
              <input 
                type="checkbox" 
                id="is_active" 
                name="is_active" 
                defaultChecked={isNew ? true : pkg?.is_active} 
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer">Published / Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
              <Link href="/admin/pricing" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <SubmitButton>Save Package</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
