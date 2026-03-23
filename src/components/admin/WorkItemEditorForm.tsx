"use client";

import { useActionState } from "react";

import { saveWorkItemAction, type WorkItemFormState } from "@/app/[locale]/admin/work/actions";
import { Link } from "@/i18n/routing";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { WorkItemMediaField } from "@/components/admin/WorkItemMediaField";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type WorkItemEditorRecord = {
  client_name?: string | null;
  description_en?: string | null;
  description_ro?: string | null;
  image_alt_en?: string | null;
  image_alt_ro?: string | null;
  image_height?: number | null;
  image_public_id?: string | null;
  image_url?: string | null;
  image_width?: number | null;
  industry_en?: string | null;
  industry_ro?: string | null;
  is_active?: boolean | null;
  is_featured?: boolean | null;
  slug?: string | null;
  sort_order?: number | null;
  stats?: Array<{ label: string; value: string }> | null;
  title_en?: string | null;
  title_ro?: string | null;
};

const initialState: WorkItemFormState = {
  error: null,
};

type WorkItemEditorFormProps = {
  id: string;
  locale: string;
  work: WorkItemEditorRecord | null;
};

export function WorkItemEditorForm({ id, locale, work }: WorkItemEditorFormProps) {
  const [state, formAction] = useActionState(saveWorkItemAction, initialState);
  const defaultStats = work?.stats?.map((stat) => `${stat.label}: ${stat.value}`).join("\n") ?? "";

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="locale" value={locale} />

      {state.error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL identifier)</Label>
          <Input id="slug" name="slug" defaultValue={work?.slug ?? ""} required placeholder="e.g. luxe-salon" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name</Label>
          <Input id="client_name" name="client_name" defaultValue={work?.client_name ?? ""} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input id="title_en" name="title_en" defaultValue={work?.title_en ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title_ro">Title (Romanian)</Label>
          <Input id="title_ro" name="title_ro" defaultValue={work?.title_ro ?? ""} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="industry_en">Industry (English)</Label>
          <Input id="industry_en" name="industry_en" defaultValue={work?.industry_en ?? ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="industry_ro">Industry (Romanian)</Label>
          <Input id="industry_ro" name="industry_ro" defaultValue={work?.industry_ro ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="description_en">Description (English)</Label>
          <Textarea id="description_en" name="description_en" defaultValue={work?.description_en ?? ""} required rows={4} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description_ro">Description (Romanian)</Label>
          <Textarea id="description_ro" name="description_ro" defaultValue={work?.description_ro ?? ""} required rows={4} />
        </div>
      </div>

      <div className="grid gap-6 border-t pt-6 lg:grid-cols-[1.3fr_0.7fr]">
        <WorkItemMediaField
          initialUrl={work?.image_url}
          initialPublicId={work?.image_public_id}
          initialWidth={work?.image_width}
          initialHeight={work?.image_height}
        />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image_alt_en">Image Alt (English)</Label>
            <Input id="image_alt_en" name="image_alt_en" defaultValue={work?.image_alt_en ?? ""} placeholder="Optional descriptive alt text" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_alt_ro">Image Alt (Romanian)</Label>
            <Input id="image_alt_ro" name="image_alt_ro" defaultValue={work?.image_alt_ro ?? ""} placeholder="Text alternativ opțional" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stats_str">Key Stats (Label: Value per line)</Label>
            <Textarea
              id="stats_str"
              name="stats_str"
              defaultValue={defaultStats}
              rows={6}
              placeholder={"Bookings: +40%\nRetention: 95%"}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="sort_order">Sort Order</Label>
          <Input id="sort_order" name="sort_order" type="number" defaultValue={work?.sort_order ?? 0} />
        </div>
        <div className="flex items-end gap-6 pb-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={Boolean(work?.is_featured)} className="h-4 w-4" />
            <Label htmlFor="is_featured" className="cursor-pointer">Featured Client</Label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_active" name="is_active" defaultChecked={work?.is_active ?? true} className="h-4 w-4" />
            <Label htmlFor="is_active" className="cursor-pointer">Published / Active</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <Link href="/admin/work" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        <SubmitButton>Save Work Item</SubmitButton>
      </div>
    </form>
  );
}
