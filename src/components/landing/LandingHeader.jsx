import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Logo } from "../Logo";

export function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 relative">
        <Link to="/" className="group">
          <Logo />
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-background border border-border rounded-full px-2 py-1.5 shadow-xs">
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-1.5 transition-colors"
          >
            Features
          </a>

          <a
            href="https://github.com/adityasrc/snip-frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-1.5 transition-colors"
          >
            GitHub
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <Button asChild size="sm">
              <Link to="/dashboard">
                Dashboard <ArrowRight />
              </Link>
            </Button>
          ) : (
            <>
              <Button asChild size="sm" variant="outline">
                <Link to="/signin">Log in</Link>
              </Button>

              <Button asChild size="sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="md:hidden p-2 rounded-lg hover:bg-muted text-foreground border border-transparent hover:border-border transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 w-full z-50 bg-background border-b border-border shadow-xl py-4 px-6 flex flex-col gap-1">
            <a
              href="#features"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2.5 rounded-lg transition-colors"
            >
              Features
            </a>
            <a
              href="https://github.com/adityasrc/snip-frontend"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2.5 rounded-lg transition-colors"
            >
              GitHub
            </a>

            <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-border">
              {isLoggedIn ? (
                <Button asChild size="sm" className="w-full">
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard <ArrowRight />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="sm" variant="outline" className="w-full">
                    <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                      Log in
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      Sign up
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
