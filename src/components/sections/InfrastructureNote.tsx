import { Info } from "lucide-react";

interface InfrastructureNoteProps {
  text: string;
}

export function InfrastructureNote({ text }: InfrastructureNoteProps) {
  return (
    <div className="mt-8 flex gap-4 rounded-[1.7rem] border border-border/55 bg-white/76 p-5 text-sm text-muted-foreground shadow-[0_18px_40px_-34px_rgba(24,18,51,0.16)] backdrop-blur-md md:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem] border border-border/60 bg-background/82 text-muted-foreground/80">
        <Info className="h-4.5 w-4.5" />
      </div>
      <p className="leading-7">
        {text}
      </p>
    </div>
  );
}
