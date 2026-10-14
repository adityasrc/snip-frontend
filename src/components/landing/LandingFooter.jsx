import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { Logo } from "../Logo";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Developers: [
    { label: "GitHub", href: "https://github.com/adityasrc/snip-frontend", external: true },
    { label: "Open issues", href: "https://github.com/adityasrc/snip-frontend/issues", external: true },
  ],
};

export function LandingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-border bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 pt-8 pb-3">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex flex-col gap-3 max-w-xs">
            <Link to="/" className="group w-fit">
              <Logo />
            </Link>
            <p className="text-xs leading-relaxed text-muted-foreground">
              A simple way to create, manage, and track short links.
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href="https://github.com/adityasrc/snip-frontend"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com/truthbyliar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="flex gap-12 sm:gap-16">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section} className="flex flex-col gap-2.5 min-w-[90px]">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {section}
                </p>
                <nav className="flex flex-col gap-2">
                  {links.map((link) =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="-translate-y-0.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    ) : link.href.startsWith("#") ? (
                      <a
                        key={link.label}
                        href={link.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {year} Snip.</p>
          <p>
            Built by{" "}
            <a
              href="https://github.com/adityasrc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Aditya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
