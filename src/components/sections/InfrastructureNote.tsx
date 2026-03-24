import { Info } from "lucide-react";

interface InfrastructureNoteProps {
  text: string;
}

export function InfrastructureNote({ text }: InfrastructureNoteProps) {
  return (
    <div className="mt-8 flex gap-4 rounded-xl border border-border/40 bg-muted/40 p-4 md:p-6 text-sm text-muted-foreground">
      <Info className="h-5 w-5 shrink-0 text-muted-foreground/70" />
      <p className="leading-relaxed">
        {text}
      </p>
    </div>
  );
}
