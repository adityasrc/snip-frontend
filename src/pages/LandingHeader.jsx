import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, Link as LinkIcon } from "lucide-react"; 
import { Button } from "../components/ui/button";

export function LandingHeader() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const elem = document.getElementById("features");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm py-3" 
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      {/* Added 'relative' here so the absolute center nav works properly */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 relative">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group">
            {/* Changed from rounded-xl to rounded-full for circular look */}
            <div className="bg-orange-600 p-1.5 rounded-full transition-transform group-hover:rotate-6">
              <LinkIcon className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-[20px] tracking-tight text-slate-900">
              Snip.
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered Floating Pill Design */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-slate-50/50 border border-slate-200/80 rounded-full px-2 py-1.5 backdrop-blur-sm shadow-sm">
          <a 
            href="#features" 
            onClick={scrollToFeatures} 
            className="text-[13px] font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-all"
          >
            Features
          </a>
          <a 
            href="https://github.com/adityasrc/snip" 
            target="_blank" 
            rel="noreferrer"
            className="text-[13px] font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-all"
          >
            GitHub
          </a>
          <Link 
            to="/docs" 
            className="text-[13px] font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-3 py-1.5 rounded-full transition-all"
          >
            API Docs
          </Link>
        </nav>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-full" />
          ) : isLoggedIn ? (
            <Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700 rounded-full px-5 transition-all shadow-md" onClick={() => navigate("/dashboard")}>
              Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="text-[13px] font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50 px-4" onClick={() => navigate("/signin")}>
                Log In
              </Button>
              
              {/* Vertical Divider Line */}
              <div className="w-px h-4 bg-slate-300 mx-1"></div>

              <Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700 text-[13px] font-medium rounded-full px-5 shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 transition-all" onClick={() => navigate("/signup")}>
                Sign Up Free
              </Button>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 rounded-full hover:bg-orange-50 text-slate-600 hover:text-orange-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] z-40 bg-white/95 backdrop-blur-lg animate-in fade-in slide-in-from-top-4 duration-300 border-t border-slate-100">
          <nav className="flex flex-col p-8 gap-6">
            <a href="#features" onClick={scrollToFeatures} className="text-xl font-bold text-slate-900 hover:text-orange-600">Features</a>
            <Link to="/docs" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-slate-900 hover:text-orange-600">API Docs</Link>
            <a href="https://github.com/adityasrc/snip" target="_blank" rel="noreferrer" className="text-xl font-bold text-slate-900 hover:text-orange-600">GitHub</a>
            
            <div className="flex flex-col gap-4 mt-4 border-t border-slate-200 pt-8">
              {isLoggedIn ? (
                <Button className="w-full py-6 text-lg bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-600/20" onClick={() => { navigate("/dashboard"); setIsMobileMenuOpen(false); }}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" className="w-full py-6 text-lg rounded-xl border-slate-200 text-slate-700" onClick={() => { navigate("/signin"); setIsMobileMenuOpen(false); }}>
                    Log In
                  </Button>
                  <Button className="w-full py-6 text-lg bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-600/20" onClick={() => { navigate("/signup"); setIsMobileMenuOpen(false); }}>
                    Get Started Free
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}