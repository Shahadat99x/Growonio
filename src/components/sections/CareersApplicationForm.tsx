"use client";

import { useActionState, useEffect, useRef } from "react";
import { Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  initialCareersFormState,
  submitCareersAction,
} from "@/app/[locale]/careers/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/config";

export function CareersApplicationForm() {
  const t = useTranslations("CareersPage");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitCareersAction,
    initialCareersFormState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const fieldClassName =
    "h-12 rounded-[1rem] border-border/60 bg-background/84 shadow-[0_14px_28px_-24px_rgba(24,18,51,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 focus-visible:bg-white/94";
  const textareaClassName =
    "min-h-[150px] resize-y rounded-[1.1rem] border-border/60 bg-background/84 shadow-[0_14px_28px_-24px_rgba(24,18,51,0.16)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-primary/20 focus-visible:bg-white/94";

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-busy={isPending}
      className="w-full rounded-[2.1rem] border border-border/60 bg-white/88 p-6 shadow-[0_24px_65px_-42px_rgba(24,18,51,0.2)] backdrop-blur-md md:p-8"
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="source_path" value="/careers" />
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
          {t("formEyebrow")}
        </p>
        <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-foreground">
          {t("formTitle")}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
          {t("formDescription")}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {(t.raw("formChips") as string[]).map((chip) => (
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
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="full_name">{t("fullNameLabel")}</Label>
          <Input
            id="full_name"
            name="full_name"
            autoComplete="name"
            required
            minLength={3}
            maxLength={120}
            placeholder={t("fullNamePlaceholder")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder={t("emailPlaceholder")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("phoneLabel")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={30}
            placeholder={t("phonePlaceholder")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="background">{t("backgroundLabel")}</Label>
          <Input
            id="background"
            name="background"
            autoComplete="organization-title"
            required
            minLength={3}
            maxLength={160}
            placeholder={t("backgroundPlaceholder")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="profile_link">{t("profileLinkLabel")}</Label>
          <Input
            id="profile_link"
            name="profile_link"
            type="url"
            autoComplete="url"
            maxLength={300}
            placeholder={t("profileLinkPlaceholder")}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="interest">{t("interestLabel")}</Label>
          <Textarea
            id="interest"
            name="interest"
            required
            minLength={30}
            maxLength={2000}
            placeholder={t("interestPlaceholder")}
            className={textareaClassName}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="experience">{t("experienceLabel")}</Label>
          <Textarea
            id="experience"
            name="experience"
            required
            minLength={15}
            maxLength={2000}
            placeholder={t("experiencePlaceholder")}
            className={textareaClassName}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="rounded-[1.25rem] border border-border/55 bg-background/78 px-4 py-3 text-sm leading-6 text-muted-foreground shadow-[0_16px_30px_-28px_rgba(24,18,51,0.16)]">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">{t("directEmailLabel")}</p>
              <a
                href={`mailto:${siteConfig.companyEmail}`}
                className="mt-1 inline-flex text-sm font-semibold text-primary hover:text-primary/80"
              >
                {siteConfig.companyEmail}
              </a>
            </div>
          </div>
        </div>

        <SubmitButton className="w-full rounded-full shadow-[0_20px_45px_-28px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] sm:w-auto sm:min-w-[220px]">
          {t("submitLabel")}
        </SubmitButton>
      </div>

      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {t("formNote")}
      </p>
    </form>
  );
}
