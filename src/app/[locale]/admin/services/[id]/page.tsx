import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { saveServiceAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { notFound } from "next/navigation";

export default async function ServiceEditor({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";
  
  let service: any = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("services").select("*").eq("id", id).single();
    if (!data) notFound();
    service = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
          <Link href="/admin/services" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Service" : "Edit Service"}</h1>
          <p className="text-muted-foreground mt-1">Configure bilingual content and settings.</p>
        </div>
      </div>

      <div className="bg-card border rounded-md p-6">
        <form action={saveServiceAction as any} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="locale" value={locale} />
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL identifier)</Label>
              <Input id="slug" name="slug" defaultValue={service?.slug} required placeholder="e.g. web-design" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon_name">Icon Name (Lucide)</Label>
              <Input id="icon_name" name="icon_name" defaultValue={service?.icon_name} placeholder="e.g. MonitorSmartphone" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="title_en">Title (English)</Label>
              <Input id="title_en" name="title_en" defaultValue={service?.title_en} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_ro">Title (Romanian)</Label>
              <Input id="title_ro" name="title_ro" defaultValue={service?.title_ro} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea id="description_en" name="description_en" defaultValue={service?.description_en} required rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_ro">Description (Romanian)</Label>
              <Textarea id="description_ro" name="description_ro" defaultValue={service?.description_ro} required rows={4} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={service?.sort_order ?? 0} />
            </div>
            <div className="flex items-center gap-2 mt-8">
              <input 
                type="checkbox" 
                id="is_active" 
                name="is_active" 
                defaultChecked={isNew ? true : service?.is_active} 
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer">Published / Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
              <Link href="/admin/services" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <SubmitButton>Save Service</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
