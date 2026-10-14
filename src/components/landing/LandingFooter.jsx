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
    <footer className="mt-auto w-full bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 border-b border-background/10 py-8 md:py-10 md:grid-cols-3">
          <div className="flex flex-col gap-5">
            <Logo inverted />
            <p className="max-w-[220px] text-sm leading-relaxed text-background/60">
              A simple way to create and manage short links.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/adityasrc/snip-frontend"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-background/10 bg-background/5 transition-colors hover:bg-background/10"
              >
                <Github className="h-4 w-4 text-background/60" />
              </a>
              <a
                href="https://x.com/truthbyliar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-background/10 bg-background/5 transition-colors hover:bg-background/10"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 text-background/60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-wider text-background/60">
                {section}
              </p>
              <nav className="flex flex-col gap-3">
                {links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-1 text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {link.label}
                      <ArrowUpRight className="-translate-y-0.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : link.href.startsWith("#") ? (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>
        <div className="py-4 text-xs text-background/60">
          © {year} Snip. Built by{" "}
          <a
            href="https://github.com/adityasrc"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:text-background hover:underline"
          >
            adityasrc
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
