"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

export function SubmitButton({ 
  children, 
  variant = "default",
  className
}: { 
  children: ReactNode, 
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
  className?: string
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending} className={className}>
      {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  );
}
