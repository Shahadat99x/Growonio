import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { saveWorkItemAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { notFound } from "next/navigation";

export default async function WorkItemEditor({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";
  
  let work: any = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("work_items").select("*").eq("id", id).single();
    if (!data) notFound();
    work = data;
  }

  // Pre-process stats into string for textarea
  const defaultStats = work?.stats 
    ? work.stats.map((s: any) => `${s.label}: ${s.value}`).join('\n') 
    : "";

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
          <Link href="/admin/work" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New Work Item" : "Edit Work Item"}</h1>
          <p className="text-muted-foreground mt-1">Configure portfolio content and stats.</p>
        </div>
      </div>

      <div className="bg-card border rounded-md p-6">
        <form action={saveWorkItemAction as any} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="locale" value={locale} />
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL identifier)</Label>
              <Input id="slug" name="slug" defaultValue={work?.slug} required placeholder="e.g. luxe-salon" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input id="client_name" name="client_name" defaultValue={work?.client_name} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="title_en">Title (English)</Label>
              <Input id="title_en" name="title_en" defaultValue={work?.title_en} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title_ro">Title (Romanian)</Label>
              <Input id="title_ro" name="title_ro" defaultValue={work?.title_ro} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="industry_en">Industry (English)</Label>
              <Input id="industry_en" name="industry_en" defaultValue={work?.industry_en} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry_ro">Industry (Romanian)</Label>
              <Input id="industry_ro" name="industry_ro" defaultValue={work?.industry_ro} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="description_en">Description (English)</Label>
              <Textarea id="description_en" name="description_en" defaultValue={work?.description_en} required rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description_ro">Description (Romanian)</Label>
              <Textarea id="description_ro" name="description_ro" defaultValue={work?.description_ro} required rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input id="image_url" name="image_url" defaultValue={work?.image_url} placeholder="/placeholder.jpg or https://..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stats_str">Key Stats (Label: Value per line)</Label>
              <Textarea 
                id="stats_str" 
                name="stats_str" 
                defaultValue={defaultStats} 
                rows={3} 
                placeholder="Bookings: +40%&#10;Retention: 95%"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={work?.sort_order ?? 0} />
            </div>
            <div className="flex gap-6 items-end pb-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={work?.is_featured} className="w-4 h-4" />
                <Label htmlFor="is_featured" className="cursor-pointer">Featured Client</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="is_active" name="is_active" defaultChecked={isNew ? true : work?.is_active} className="w-4 h-4" />
                <Label htmlFor="is_active" className="cursor-pointer">Published / Active</Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
              <Link href="/admin/work" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <SubmitButton>Save Work Item</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
