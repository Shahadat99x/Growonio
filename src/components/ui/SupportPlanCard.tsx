import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupportPlanCardProps {
  title: string;
  price: string;
  features: string[];
}

export function SupportPlanCard({
  title,
  price,
  features,
}: SupportPlanCardProps) {
  return (
    <Card className={cn(
      "flex flex-col h-full relative w-full border-border/40 bg-zinc-50/50 dark:bg-zinc-800/10 shadow-sm",
    )}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        <div className="mt-2 text-2xl font-bold tracking-tight">
          {price}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Check className="h-4 w-4 text-primary/70 shrink-0" />
              <span className="leading-tight mt-0.5">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
