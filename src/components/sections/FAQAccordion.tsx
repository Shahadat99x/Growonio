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
    <Accordion className="mx-auto w-full max-w-3xl space-y-3">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="overflow-hidden rounded-[1.5rem] border border-border/55 bg-white/82 px-5 shadow-[0_18px_45px_-36px_rgba(24,18,51,0.18)] backdrop-blur-md"
        >
          <AccordionTrigger className="text-left text-lg font-semibold tracking-[-0.03em] hover:no-underline hover:text-primary transition-colors">
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
