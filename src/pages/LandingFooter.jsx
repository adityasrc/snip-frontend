import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon, Github, ArrowUpRight, Twitter } from "lucide-react";

const FOOTER_LINKS = {
  Product: [
    { label: "How it works", href: "#how-it-works", scroll: true },
    { label: "Dashboard", href: "/dashboard" },
    { label: "API Docs", href: "/docs" },
  ],
  Developers: [
    { label: "GitHub", href: "https://github.com/adityasrc/snip-frontend", external: true },
    { label: "Open issues", href: "https://github.com/adityasrc/snip-frontend/issues", external: true },
    { label: "Contribute", href: "https://github.com/adityasrc/snip-frontend/blob/main/CONTRIBUTING.md", external: true },
  ],
  Stack: [
    { label: "Bun runtime", href: "https://bun.sh", external: true },
    { label: "Express.js", href: "https://expressjs.com", external: true },
    { label: "MongoDB", href: "https://mongodb.com", external: true },
    { label: "React", href: "https://react.dev", external: true },
  ],
};

export function LandingFooter() {
  function handleScroll(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <footer className="w-full bg-[#0a0a0a] text-white mt-auto relative overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Background texture — very subtle dot grid */}
      <div
        className="absolute inset-0 -z-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6">

        {/* Top section */}
        <div className="grid md:grid-cols-4 gap-12 py-16 border-b border-white/10">

          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shrink-0">
                <LinkIcon className="text-[#0a0a0a] w-4 h-4" strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-[16px] tracking-tight text-white">
                Snip
              </span>
            </div>
            <p className="text-[13px] text-[#a3a3a3] leading-relaxed max-w-[220px]">
              Short links with the context you need to share them well.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/adityasrc/snip-frontend"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4 text-[#a3a3a3]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-[#a3a3a3]" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#a3a3a3] font-medium">
                {section}
              </p>
              <nav className="flex flex-col gap-3">
                {links.map((link) =>
                  link.external ? (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] text-[#d4d4d4] hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5" />
                    </a>
                  ) : link.scroll ? (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href.replace("#", ""))}
                      className="text-[14px] text-[#d4d4d4] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-[14px] text-[#d4d4d4] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <p className="text-[13px] text-[#a3a3a3]">
            © {new Date().getFullYear()} Snip.
          </p>
          <div className="flex items-center gap-4">
              <span className="text-[12px] text-[#a3a3a3]">
              Built with Bun, Express, MongoDB, and React
            </span>
            <span className="w-1 h-1 rounded-full bg-[#737373]" />
            <a
              href="https://github.com/adityasrc/snip-frontend"
              target="_blank"
              rel="noreferrer"
              className="text-[12px] text-[#d4d4d4] hover:text-white transition-colors flex items-center gap-1"
            >
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
