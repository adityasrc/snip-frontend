import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, Link as LinkIcon } from "lucide-react";
import { Button } from "../components/ui/button";

export function LandingHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    const token = localStorage.getItem("token");
    return !!(token && token !== "undefined" && token !== "null");
  });

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
          ? "bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#0a0a0a] p-1.5 rounded-lg transition-transform group-hover:-rotate-12">
            <LinkIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-[16px] tracking-tight text-[#171717]">
            Snip
          </span>
        </Link>

        {/* Desktop nav — centered pill */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-white border border-[#e5e5e5] rounded-full px-2 py-1.5 shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px]">
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="text-[14px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-4 py-1.5 rounded-full transition-colors"
          >
            How it works
          </a>

          <a
            href="https://github.com/adityasrc/snip-frontend"
            target="_blank"
            rel="noreferrer"
            className="text-[14px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-4 py-1.5 rounded-full transition-colors"
          >
            GitHub
          </a>

          <Link
            to="/docs"
            className="text-[14px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-4 py-1.5 rounded-full transition-colors"
          >
            API Docs
          </Link>
        </nav>

        {/* Desktop CTA cluster */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <Button
              size="sm"
              className="bg-[#0a0a0a] text-white hover:bg-[#262626] rounded-full px-5 h-9 text-[14px] font-medium shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="bg-white text-[#171717] border border-[#e5e5e5] hover:bg-[#f5f5f5] hover:border-[#d4d4d4] rounded-full px-4 h-9 text-[14px] font-medium transition-all"
                onClick={() => navigate("/signin")}
              >
                Log in
              </Button>

              <Button
                size="sm"
                className="bg-[#0a0a0a] text-white hover:bg-[#262626] rounded-full px-5 h-9 text-[14px] font-medium shadow-[rgba(0,0,0,0.05)_0px_1px_2px_0px] transition-all"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#f5f5f5] text-[#171717] border border-transparent hover:border-[#e5e5e5] transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#e5e5e5] shadow-[rgba(0,0,0,0.05)_0px_4px_6px_-1px] py-4 px-6 flex flex-col gap-1">
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="text-[15px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-3 py-2.5 rounded-lg transition-colors"
          >
            How it works
          </a>
          <a
            href="https://github.com/adityasrc/snip-frontend"
            target="_blank"
            rel="noreferrer"
            className="text-[15px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-3 py-2.5 rounded-lg transition-colors"
          >
            GitHub
          </a>
          <Link
            to="/docs"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[15px] font-medium text-[#525252] hover:text-[#171717] hover:bg-[#f5f5f5] px-3 py-2.5 rounded-lg transition-colors"
          >
            API Docs
          </Link>

          <div className="flex flex-col gap-2 mt-3 pt-4 border-t border-[#e5e5e5]">
            {isLoggedIn ? (
              <Button
                className="w-full bg-[#0a0a0a] text-white hover:bg-[#262626] rounded-full h-10 text-[14px] font-medium transition-all"
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
                  variant="outline"
                  className="w-full bg-white text-[#171717] border border-[#e5e5e5] hover:bg-[#f5f5f5] rounded-full h-10 text-[14px] font-medium transition-all"
                  onClick={() => {
                    navigate("/signin");
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  className="w-full bg-[#0a0a0a] text-white hover:bg-[#262626] rounded-full h-10 text-[14px] font-medium transition-all"
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
      )}
    </header>
  );
}
