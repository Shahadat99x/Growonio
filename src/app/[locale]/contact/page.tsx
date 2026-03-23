import {useTranslations} from 'next-intl';
import { Section } from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('ContactPage');

  return (
    <div className="pt-16 pb-24 min-h-[80vh]">
      <Section className="bg-background">
        <Container>
          <SectionHeader 
            title={t('title')} 
            description={t('description')} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mt-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8 lg:pr-8">
              <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/40">
                <h3 className="text-xl font-bold mb-6">Get in touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href="mailto:hello@growonio.com" className="text-muted-foreground hover:text-primary transition-colors">hello@growonio.com</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Location</p>
                      <p className="text-muted-foreground">Bucharest, Romania<br/>Available globally</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
