"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactForm() {
  const t = useTranslations("Shared");

  return (
    <form className="space-y-6 w-full max-w-xl mx-auto p-6 md:p-8 rounded-2xl border border-border/40 bg-card shadow-sm" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">{t('firstName')}</Label>
          <Input id="firstName" placeholder={t('firstNamePlaceholder', { defaultMessage: 'John' })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">{t('lastName')}</Label>
          <Input id="lastName" placeholder={t('lastNamePlaceholder', { defaultMessage: 'Doe' })} />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" placeholder="john@example.com" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea 
          id="message" 
          placeholder={t('messagePlaceholder')}
          className="min-h-[140px] resize-y"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        {t('sendMessage')}
      </Button>
    </form>
  );
}
