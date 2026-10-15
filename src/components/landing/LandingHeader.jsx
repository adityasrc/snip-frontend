import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../Logo";
import { cn, isLoggedIn } from "@/lib/utils";
import { REPO_URL } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "GitHub", href: REPO_URL, external: true },
];

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

function AuthButtons({ loggedIn, className, onNavigate }) {
  if (loggedIn) {
    return (
      <Button asChild size="sm" className={cn("group", className)}>
        <Link to="/dashboard" onClick={onNavigate}>
          Dashboard <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Button>
    );
  }
  return (
    <>
      <Button asChild size="sm" variant="outline" className={className}>
        <Link to="/signin" onClick={onNavigate}>Log in</Link>
      </Button>
      <Button asChild size="sm" className={className}>
        <Link to="/signup" onClick={onNavigate}>Sign up</Link>
      </Button>
    </>
  );
}

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const loggedIn = isLoggedIn();
  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkClass =
    "rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-card hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "border-b bg-background/90 py-3 backdrop-blur-md" : "bg-transparent py-5"
      )}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6">
        <Link to="/" className="group rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring">
          <Logo />
        </Link>

        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border bg-muted/60 p-1 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={navLinkClass} {...(link.external ? externalProps : {})}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <AuthButtons loggedIn={loggedIn} />
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={closeMenu} />
          <div className="absolute top-full left-0 z-50 flex w-full flex-col gap-1 border-b bg-background px-6 py-4 shadow-xl md:hidden">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                {...(link.external ? externalProps : {})}
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 border-t pt-4">
              <AuthButtons loggedIn={loggedIn} className="w-full" onNavigate={closeMenu} />
            </div>
          </div>
        </>
      )}
    </header>
  );
}
