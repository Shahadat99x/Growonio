import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

export function PricingCard({
  title,
  description,
  price,
  features,
  ctaText,
  ctaHref,
  isPopular,
}: PricingCardProps) {
  return (
    <Card className={cn(
      "flex flex-col relative w-full border-border/40 shadow-sm transition-all hover:shadow-md",
      isPopular && "border-primary shadow-primary/10 scale-105 z-10"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold tracking-tight">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
        <div className="mt-4 flex items-baseline text-4xl font-extrabold tracking-tight">
          {price}
          {price !== "Custom" && <span className="ml-1 text-xl font-medium text-muted-foreground tracking-normal">/mo</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3 text-sm text-muted-foreground">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary shrink-0" />
              <span className="leading-tight mt-0.5">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link 
          href={ctaHref} 
          className={cn(buttonVariants({ variant: isPopular ? "default" : "outline", size: "lg" }), "w-full")}
        >
          {ctaText}
        </Link>
      </CardFooter>
    </Card>
  );
}
