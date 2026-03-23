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
    <Accordion className="w-full max-w-3xl mx-auto">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`} className="border-border/40">
          <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2 pb-6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
