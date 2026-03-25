import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion className="mx-auto w-full max-w-3xl space-y-4">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="group overflow-hidden rounded-[1.6rem] border border-border/55 bg-white/84 px-5 shadow-[0_18px_45px_-36px_rgba(24,18,51,0.18)] backdrop-blur-md transition-[transform,border-color,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:border-primary/18 hover:shadow-[0_24px_55px_-34px_color-mix(in_oklab,var(--color-primary)_20%,transparent)]"
        >
          <AccordionTrigger className="text-left text-lg font-semibold tracking-[-0.03em] transition-colors hover:no-underline hover:text-primary group-aria-expanded/accordion-trigger:text-foreground">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-6 pt-1 text-base leading-8 text-muted-foreground">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
