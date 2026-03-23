"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  initialContactFormState,
  submitContactAction,
} from "@/app/[locale]/contact/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const t = useTranslations("Shared");
  const tContact = useTranslations("ContactPage");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    submitContactAction,
    initialContactFormState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 w-full max-w-xl mx-auto p-6 md:p-8 rounded-2xl border border-border/40 bg-card shadow-sm"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source_path" value="/contact" />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {state.error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {state.error}
        </div>
      )}

      {state.success && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
          {state.success}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name">{t('firstName')}</Label>
          <Input id="first_name" name="first_name" required placeholder={t('firstNamePlaceholder', { defaultMessage: 'John' })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">{t('lastName')}</Label>
          <Input id="last_name" name="last_name" required placeholder={t('lastNamePlaceholder', { defaultMessage: 'Doe' })} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" name="email" type="email" required placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea 
          id="message" 
          name="message"
          required
          placeholder={t('messagePlaceholder')}
          className="min-h-[140px] resize-y"
        />
      </div>

      <SubmitButton className="w-full">{t('sendMessage')}</SubmitButton>
      <p className="text-sm text-muted-foreground">
        {tContact("contactFormNote")}
      </p>
    </form>
  );
}
