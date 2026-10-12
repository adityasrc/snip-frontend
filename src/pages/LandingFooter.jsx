import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Link as LinkIcon, X } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features", scroll: true },
    { label: "Dashboard", href: "/dashboard" },
  ],
  Developers: [
    { label: "GitHub", href: "https://github.com/adityasrc/snip-frontend", external: true },
    { label: "Open issues", href: "https://github.com/adityasrc/snip-frontend/issues", external: true },
    { label: "Contribute", href: "https://github.com/adityasrc/snip-frontend/blob/main/CONTRIBUTING.md", external: true },
  ],
};

export function LandingFooter() {
  function handleScroll(event, id) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="mt-auto w-full bg-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 border-b border-white/10 py-8 md:py-10 md:grid-cols-3">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white">
                <LinkIcon className="h-4 w-4 text-neutral-950" strokeWidth={2.5} />
              </div>
              <span className="text-base font-semibold tracking-tight">Snip</span>
            </div>
            <p className="max-w-[220px] text-sm leading-relaxed text-neutral-400">
              A simple way to create and manage short links.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/adityasrc/snip-frontend"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              >
                <Github className="h-4 w-4 text-neutral-400" />
              </a>
              <a
                href="https://x.com/truthbyliar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              >
                <X className="h-4 w-4 text-neutral-400" />
              </a>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
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
                      className="group flex items-center gap-1 text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight className="-translate-y-0.5 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  ) : link.scroll ? (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(event) => handleScroll(event, link.href.slice(1))}
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-sm text-neutral-300 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>
        <div className="py-4 text-xs text-neutral-400">
          © {new Date().getFullYear()} Snip.
        </div>
      </div>
    </footer>
  );
}
