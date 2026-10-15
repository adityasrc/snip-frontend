import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Logo } from "../Logo";
import { REPO_URL, AUTHOR_URL, X_URL } from "@/lib/constants";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Dashboard", to: "/dashboard" },
  ],
  Developers: [
    { label: "GitHub", href: REPO_URL, external: true },
    { label: "Open issues", href: `${REPO_URL}/issues`, external: true },
  ],
};

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

export function LandingFooter() {
  const year = new Date().getFullYear();
  const linkClass =
    "text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-hidden focus-visible:underline";
  const socialClass =
    "flex h-8 w-8 items-center justify-center rounded-lg border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <footer className="mt-auto w-full border-t">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="flex max-w-xs flex-col gap-3">
            <Link
              to="/"
              className="group w-fit rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A simple way to create, manage, and track short links.
            </p>
            <div className="flex items-center gap-2 pt-0.5">
              <a
                href={REPO_URL}
                aria-label="GitHub"
                className={socialClass}
                {...externalProps}
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={X_URL}
                aria-label="X"
                className={socialClass}
                {...externalProps}
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
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
              <div key={section} className="flex min-w-[90px] flex-col gap-2.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section}
                </p>
                <nav className="flex flex-col gap-2">
                  {links.map((link) =>
                    link.to ? (
                      <Link key={link.label} to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className={linkClass}
                        {...(link.external ? externalProps : {})}
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </nav>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-4 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Snip.</p>
          <p>
            Built by{" "}
            <a
              href={AUTHOR_URL}
              className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-hidden focus-visible:underline"
              {...externalProps}
            >
              Aditya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
