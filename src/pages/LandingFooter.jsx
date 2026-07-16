import { Link as LinkIcon } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-border py-10 bg-background text-center px-6 relative z-10 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-6 h-6 bg-orange-600 dark:bg-orange-500 rounded-xl flex items-center justify-center">
            <LinkIcon className="text-white w-3.5 h-3.5" strokeWidth={3} />
          </div>
          <span className="font-extrabold text-[16px] text-foreground tracking-tight">
            Snip
          </span>
        </div>

        <div className="flex justify-center gap-8 mb-6">
          <a
            href="https://github.com/adityasrc/snip-frontend"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-medium text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href="/docs"
            className="text-[14px] font-medium text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            API Docs
          </a>
          <a
            href="https://github.com/adityasrc/snip-frontend/issues"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-medium text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
          >
            Issues
          </a>
        </div>

        <p className="text-[13px] text-muted-foreground font-medium">
          A high-performance URL shortener built with Bun, Express, and React.
        </p>
      </div>
    </footer>
  );
}