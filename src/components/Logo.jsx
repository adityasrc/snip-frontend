import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ inverted = false }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={cn(
          "flex h-7 w-7 items-center justify-center rounded-lg transition-transform group-hover:-rotate-12",
          inverted ? "bg-background text-foreground" : "bg-primary text-primary-foreground"
        )}
      >
        <LinkIcon className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className={cn("text-base font-semibold tracking-tight", inverted && "text-background")}>
        Snip
      </span>
    </span>
  );
}
