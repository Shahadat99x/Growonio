"use client";

import { useActionState } from "react";

import { saveArticleAction, type ArticleFormState } from "@/app/[locale]/admin/articles/actions";
import { Link } from "@/i18n/routing";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ArticleCoverMediaField } from "@/components/admin/ArticleCoverMediaField";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type ArticleEditorRecord = {
  slug?: string | null;
  status?: string | null;
  is_featured?: boolean | null;
  published_at?: string | null;
  title_en?: string | null;
  title_ro?: string | null;
  excerpt_en?: string | null;
  excerpt_ro?: string | null;
  content_en?: string | null;
  content_ro?: string | null;
  seo_title_en?: string | null;
  seo_title_ro?: string | null;
  seo_description_en?: string | null;
  seo_description_ro?: string | null;
  cover_image_url?: string | null;
  cover_image_public_id?: string | null;
  cover_image_alt_en?: string | null;
  cover_image_alt_ro?: string | null;
  cover_image_width?: number | null;
  cover_image_height?: number | null;
  author_name?: string | null;
  category?: string | null;
  tags?: string[] | null;
  reading_time?: number | null;
};

const initialState: ArticleFormState = { error: null };

type ArticleEditorFormProps = {
  id: string;
  locale: string;
  article: ArticleEditorRecord | null;
};

function formatDateForInput(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toISOString().slice(0, 16);
  } catch {
    return "";
  }
}

export function ArticleEditorForm({ id, locale, article }: ArticleEditorFormProps) {
  const [state, formAction] = useActionState(saveArticleAction, initialState);
  const isNew = id === "new";

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="locale" value={locale} />

      {state.error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </p>
      )}

      {/* Slug + Status */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL identifier)</Label>
          <Input id="slug" name="slug" defaultValue={article?.slug ?? ""} required placeholder="e.g. why-automation-matters" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={article?.status ?? "draft"}
            className="flex h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Titles */}
      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input id="title_en" name="title_en" defaultValue={article?.title_en ?? ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title_ro">Title (Romanian)</Label>
          <Input id="title_ro" name="title_ro" defaultValue={article?.title_ro ?? ""} required />
        </div>
      </div>

      {/* Excerpts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="excerpt_en">Excerpt (English)</Label>
          <Textarea id="excerpt_en" name="excerpt_en" defaultValue={article?.excerpt_en ?? ""} rows={3} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="excerpt_ro">Excerpt (Romanian)</Label>
          <Textarea id="excerpt_ro" name="excerpt_ro" defaultValue={article?.excerpt_ro ?? ""} rows={3} />
        </div>
      </div>

      {/* Body Content (Markdown) */}
      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="content_en">Content (English) — Markdown</Label>
          <Textarea id="content_en" name="content_en" defaultValue={article?.content_en ?? ""} rows={14} className="font-mono text-sm" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content_ro">Content (Romanian) — Markdown</Label>
          <Textarea id="content_ro" name="content_ro" defaultValue={article?.content_ro ?? ""} rows={14} className="font-mono text-sm" />
        </div>
      </div>

      {/* Cover Image */}
      <div className="grid gap-6 border-t pt-6 lg:grid-cols-[1.3fr_0.7fr]">
        <ArticleCoverMediaField
          initialUrl={article?.cover_image_url}
          initialPublicId={article?.cover_image_public_id}
          initialWidth={article?.cover_image_width}
          initialHeight={article?.cover_image_height}
        />

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cover_image_alt_en">Cover Alt (English)</Label>
            <Input id="cover_image_alt_en" name="cover_image_alt_en" defaultValue={article?.cover_image_alt_en ?? ""} placeholder="Descriptive alt text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cover_image_alt_ro">Cover Alt (Romanian)</Label>
            <Input id="cover_image_alt_ro" name="cover_image_alt_ro" defaultValue={article?.cover_image_alt_ro ?? ""} placeholder="Text alternativ descriptiv" />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="grid grid-cols-2 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="seo_title_en">SEO Title (English)</Label>
          <Input id="seo_title_en" name="seo_title_en" defaultValue={article?.seo_title_en ?? ""} placeholder="Override page title for search" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo_title_ro">SEO Title (Romanian)</Label>
          <Input id="seo_title_ro" name="seo_title_ro" defaultValue={article?.seo_title_ro ?? ""} placeholder="Titlu SEO personalizat" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="seo_description_en">SEO Description (English)</Label>
          <Textarea id="seo_description_en" name="seo_description_en" defaultValue={article?.seo_description_en ?? ""} rows={2} placeholder="Concise summary for search results" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seo_description_ro">SEO Description (Romanian)</Label>
          <Textarea id="seo_description_ro" name="seo_description_ro" defaultValue={article?.seo_description_ro ?? ""} rows={2} placeholder="Descriere concisă pentru rezultate" />
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-3 gap-6 border-t pt-6">
        <div className="space-y-2">
          <Label htmlFor="author_name">Author</Label>
          <Input id="author_name" name="author_name" defaultValue={article?.author_name ?? ""} placeholder="Growonio Team" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input id="category" name="category" defaultValue={article?.category ?? ""} placeholder="automation, tools, etc." />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" name="tags" defaultValue={article?.tags?.join(", ") ?? ""} placeholder="automation, productivity" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="reading_time">Reading Time (min)</Label>
          <Input id="reading_time" name="reading_time" type="number" defaultValue={article?.reading_time ?? 0} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="published_at">Publish Date</Label>
          <Input id="published_at" name="published_at" type="datetime-local" defaultValue={formatDateForInput(article?.published_at)} />
        </div>
        <div className="flex items-end gap-6 pb-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_featured" name="is_featured" defaultChecked={Boolean(article?.is_featured)} className="h-4 w-4" />
            <Label htmlFor="is_featured" className="cursor-pointer">Featured</Label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <Link href="/admin/articles" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        <SubmitButton>{isNew ? "Create Article" : "Save Article"}</SubmitButton>
      </div>
    </form>
  );
}
