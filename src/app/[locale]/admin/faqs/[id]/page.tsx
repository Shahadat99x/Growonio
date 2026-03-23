import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { saveFAQAction } from "../actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { notFound } from "next/navigation";

export default async function FAQEditor({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const isNew = id === "new";
  
  let faq: any = null;
  
  if (!isNew) {
    const supabase = await createClient();
    const { data } = await supabase.from("faqs").select("*").eq("id", id).single();
    if (!data) notFound();
    faq = data;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
          <Link href="/admin/faqs" className={buttonVariants({ variant: "outline", size: "icon" })}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{isNew ? "New FAQ" : "Edit FAQ"}</h1>
          <p className="text-muted-foreground mt-1">Configure bilingual questions and answers.</p>
        </div>
      </div>

      <div className="bg-card border rounded-md p-6">
        <form action={saveFAQAction as any} className="space-y-6">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="locale" value={locale} />
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category_en">Category (English)</Label>
              <Input id="category_en" name="category_en" defaultValue={faq?.category_en} placeholder="e.g. Formatting, Support" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category_ro">Category (Romanian)</Label>
              <Input id="category_ro" name="category_ro" defaultValue={faq?.category_ro} placeholder="e.g. Suport" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="question_en">Question (English)</Label>
              <Textarea id="question_en" name="question_en" defaultValue={faq?.question_en} required rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="question_ro">Question (Romanian)</Label>
              <Textarea id="question_ro" name="question_ro" defaultValue={faq?.question_ro} required rows={3} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="answer_en">Answer (English)</Label>
              <Textarea id="answer_en" name="answer_en" defaultValue={faq?.answer_en} required rows={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer_ro">Answer (Romanian)</Label>
              <Textarea id="answer_ro" name="answer_ro" defaultValue={faq?.answer_ro} required rows={5} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 border-t pt-6">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input id="sort_order" name="sort_order" type="number" defaultValue={faq?.sort_order ?? 0} />
            </div>
            <div className="flex items-center gap-2 mt-8">
              <input 
                type="checkbox" 
                id="is_active" 
                name="is_active" 
                defaultChecked={isNew ? true : faq?.is_active} 
                className="w-4 h-4 rounded border-gray-300"
              />
              <Label htmlFor="is_active" className="cursor-pointer">Published / Active</Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6">
              <Link href="/admin/faqs" className={buttonVariants({ variant: "outline" })}>Cancel</Link>
            <SubmitButton>Save FAQ</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
