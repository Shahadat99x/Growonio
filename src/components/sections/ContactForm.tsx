"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  initialContactFormState,
  submitContactAction,
} from "@/app/[locale]/contact/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const t = useTranslations("Shared");
  const tContact = useTranslations("ContactPage");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContactAction,
    initialContactFormState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const fieldClassName =
    "h-12 rounded-[1rem] border-border/60 bg-background/84 shadow-[0_14px_28px_-24px_rgba(24,18,51,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 focus-visible:bg-white/94";
  const textareaClassName =
    "min-h-[160px] resize-y rounded-[1.1rem] border-border/60 bg-background/84 shadow-[0_14px_28px_-24px_rgba(24,18,51,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 focus-visible:bg-white/94";

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-busy={isPending}
      className="w-full rounded-[2.1rem] border border-border/60 bg-white/86 p-6 shadow-[0_24px_65px_-42px_rgba(24,18,51,0.2)] backdrop-blur-md md:p-8"
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

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/82">
          {tContact("formEyebrow")}
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {tContact("formTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {tContact("formDescription")}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {(tContact.raw("formChips") as string[]).map((chip) => (
          <div
            key={chip}
            className="inline-flex items-center rounded-full border border-border/65 bg-background/76 px-4 py-2 text-sm font-medium text-foreground shadow-[0_12px_24px_-22px_rgba(24,18,51,0.18)]"
          >
            <span className="mr-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_-1px_color-mix(in_oklab,var(--color-primary)_80%,transparent)]" />
            {chip}
          </div>
        ))}
      </div>

      {state.error && (
        <div
          role="alert"
          aria-live="polite"
          className="mt-6 rounded-[1rem] border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      {state.success && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 rounded-[1rem] border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300"
        >
          {state.success}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">{t('firstName')}</Label>
          <Input
            id="first_name"
            name="first_name"
            autoComplete="given-name"
            required
            minLength={2}
            maxLength={80}
            placeholder={t('firstNamePlaceholder', { defaultMessage: 'John' })}
            className={fieldClassName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">{t('lastName')}</Label>
          <Input
            id="last_name"
            name="last_name"
            autoComplete="family-name"
            required
            minLength={2}
            maxLength={80}
            placeholder={t('lastNamePlaceholder', { defaultMessage: 'Doe' })}
            className={fieldClassName}
          />
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          placeholder="john@example.com"
          className={fieldClassName}
        />
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea 
          id="message" 
          name="message"
          required
          minLength={20}
          maxLength={5000}
          placeholder={t('messagePlaceholder')}
          className={textareaClassName}
        />
      </div>

      <div className="mt-8">
        <SubmitButton className="w-full rounded-full shadow-[0_20px_45px_-28px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]">
          {t('sendMessage')}
        </SubmitButton>
      </div>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {tContact("contactFormNote")}
      </p>
    </form>
  );
}
