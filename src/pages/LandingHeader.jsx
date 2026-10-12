import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/button";

export function LandingHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // TODO: Replace with AuthContext state when implemented.
  const [isLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`landing-header fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 relative">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
            <LinkIcon className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-base tracking-tight text-foreground">
            Snip
          </span>
        </Link>

        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-background border border-border rounded-full px-2 py-1.5 shadow-sm">
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
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
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                className="bg-background text-foreground border border-border hover:bg-muted hover:text-foreground rounded-full px-5 h-9 text-sm font-medium transition-all"
                onClick={() => navigate("/signin")}
              >
                Log in
              </Button>

              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-9 text-sm font-medium shadow-sm transition-all"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
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
              onClick={(e) => scrollToSection(e, "features")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2.5 rounded-lg transition-colors"
            >
              Features
            </a>
            <a
              href="https://github.com/adityasrc/snip-frontend"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted px-3 py-2.5 rounded-lg transition-colors"
            >
              GitHub
            </a>

            <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-border">
              {isLoggedIn ? (
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-10 text-sm font-medium transition-all"
                  onClick={() => {
                    navigate("/dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full bg-background text-foreground border border-border hover:bg-muted hover:text-foreground rounded-full h-10 text-sm font-medium transition-all"
                    onClick={() => {
                      navigate("/signin");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Log in
                  </Button>
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full h-10 text-sm font-medium transition-all"
                    onClick={() => {
                      navigate("/signup");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign up
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
