"use client";

import { useActionState } from "react";

import { saveWorkItemAction, type WorkItemFormState } from "@/app/[locale]/admin/work/actions";
import { WorkItemGalleryField, type WorkItemEditorGalleryRecord } from "@/components/admin/WorkItemGalleryField";
import { WorkItemMediaField } from "@/components/admin/WorkItemMediaField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@/i18n/routing";

export type WorkItemEditorRecord = {
  client_name?: string | null;
  description_en?: string | null;
  description_ro?: string | null;
  overview_en?: string | null;
  overview_ro?: string | null;
  challenge_en?: string | null;
  challenge_ro?: string | null;
  solution_en?: string | null;
  solution_ro?: string | null;
  results_en?: string | null;
  results_ro?: string | null;
  features_en?: string[] | null;
  features_ro?: string[] | null;
  live_url?: string | null;
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
  gallery_items?: WorkItemEditorGalleryRecord[] | null;
};

const initialState: WorkItemFormState = {
  error: null,
};

type WorkItemEditorFormProps = {
  id: string;
  locale: string;
  work: WorkItemEditorRecord | null;
};

type EditorSectionProps = {
  children: React.ReactNode;
  description?: string;
  title: string;
};

function EditorSection({ children, description, title }: EditorSectionProps) {
  return (
    <section className="space-y-4 border-t pt-6 first:border-t-0 first:pt-0">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}

export function WorkItemEditorForm({ id, locale, work }: WorkItemEditorFormProps) {
  const [state, formAction] = useActionState(saveWorkItemAction, initialState);
  const defaultStats = work?.stats?.map((stat) => `${stat.label}: ${stat.value}`).join("\n") ?? "";
  const defaultFeaturesEn = work?.features_en?.join("\n") ?? "";
  const defaultFeaturesRo = work?.features_ro?.join("\n") ?? "";

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="locale" value={locale} />

      {state.error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <EditorSection
        title="Basic Info"
        description="Core listing content used by the portfolio grid and the future case-study detail page."
      >
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

        <div className="grid grid-cols-2 gap-6">
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

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="description_en">Short Description (English)</Label>
            <Textarea id="description_en" name="description_en" defaultValue={work?.description_en ?? ""} required rows={4} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description_ro">Short Description (Romanian)</Label>
            <Textarea id="description_ro" name="description_ro" defaultValue={work?.description_ro ?? ""} required rows={4} />
          </div>
        </div>
      </EditorSection>

      <EditorSection
        title="Cover Media"
        description="Primary image used on portfolio cards and at the top of future detail pages."
      >
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
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
          </div>
        </div>
      </EditorSection>

      <EditorSection
        title="Gallery"
        description="Additional case-study images stored separately so future detail pages can render richer galleries."
      >
        <WorkItemGalleryField initialItems={work?.gallery_items ?? []} />
      </EditorSection>

      <EditorSection
        title="Overview"
        description="A richer introduction for the case study beyond the short listing card description."
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="overview_en">Overview (English)</Label>
            <Textarea id="overview_en" name="overview_en" defaultValue={work?.overview_en ?? ""} rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="overview_ro">Overview (Romanian)</Label>
            <Textarea id="overview_ro" name="overview_ro" defaultValue={work?.overview_ro ?? ""} rows={5} />
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Challenge">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="challenge_en">Challenge (English)</Label>
            <Textarea id="challenge_en" name="challenge_en" defaultValue={work?.challenge_en ?? ""} rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="challenge_ro">Challenge (Romanian)</Label>
            <Textarea id="challenge_ro" name="challenge_ro" defaultValue={work?.challenge_ro ?? ""} rows={5} />
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Solution">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="solution_en">Solution (English)</Label>
            <Textarea id="solution_en" name="solution_en" defaultValue={work?.solution_en ?? ""} rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="solution_ro">Solution (Romanian)</Label>
            <Textarea id="solution_ro" name="solution_ro" defaultValue={work?.solution_ro ?? ""} rows={5} />
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Results">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="results_en">Results (English)</Label>
            <Textarea id="results_en" name="results_en" defaultValue={work?.results_en ?? ""} rows={5} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="results_ro">Results (Romanian)</Label>
            <Textarea id="results_ro" name="results_ro" defaultValue={work?.results_ro ?? ""} rows={5} />
          </div>
        </div>
      </EditorSection>

      <EditorSection
        title="Features"
        description="Enter one feature per line. These are stored as structured arrays for future case-study rendering."
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="features_en_str">Features (English)</Label>
            <Textarea
              id="features_en_str"
              name="features_en_str"
              defaultValue={defaultFeaturesEn}
              rows={6}
              placeholder={"Premium responsive website\nLead capture flow\nAdmin-friendly content updates"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="features_ro_str">Features (Romanian)</Label>
            <Textarea
              id="features_ro_str"
              name="features_ro_str"
              defaultValue={defaultFeaturesRo}
              rows={6}
              placeholder={"Website premium responsive\nFlux de captare cereri\nActualizari usoare de continut"}
            />
          </div>
        </div>
      </EditorSection>

      <EditorSection title="Live Project">
        <div className="space-y-2">
          <Label htmlFor="live_url">Live URL</Label>
          <Input id="live_url" name="live_url" defaultValue={work?.live_url ?? ""} placeholder="https://example.com" />
          <p className="text-sm text-muted-foreground">
            Leave empty if the project is private, unavailable, or not ready to share publicly.
          </p>
        </div>
      </EditorSection>

      <EditorSection
        title="Stats"
        description="Keep the current simple input format. Use one line per stat in Label: Value format."
      >
        <div className="space-y-2">
          <Label htmlFor="stats_str">Key Stats (Label: Value per line)</Label>
          <Textarea id="stats_str" name="stats_str" defaultValue={defaultStats} rows={6} placeholder={"Bookings: +40%\nRetention: 95%"} />
        </div>
      </EditorSection>

      <EditorSection title="Publishing / Ordering">
        <div className="grid grid-cols-2 gap-6">
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
      </EditorSection>

      <div className="flex justify-end gap-4 border-t pt-6">
        <Link href="/admin/work" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        <SubmitButton>Save Work Item</SubmitButton>
      </div>
    </form>
  );
}
