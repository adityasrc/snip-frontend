import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarClock,
  Clock,
  Copy,
  Gauge,
  Link2,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const REFERRERS = [
  { label: "Direct", pct: 54 },
  { label: "GitHub", pct: 28 },
  { label: "Google", pct: 18 },
];

export function LandingHero() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const prefillUrl = url.trim();
    navigate(
      isLoggedIn ? "/dashboard" : "/signup",
      prefillUrl ? { state: { prefillUrl } } : undefined
    );
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setUrl(text.trim());
    } catch {
      // Clipboard read permission denied or unsupported
    }
  };

  return (
    <div className="text-foreground">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border)/0.55)_1px,transparent_1px)] bg-size-[72px_100%] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)] pointer-events-none" />
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,hsl(var(--muted)/0.7),transparent_70%)]" />

        <section className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <h1
              className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-balance text-foreground mb-6 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              Short links,<br />
              <span className="text-muted-foreground">without the clutter.</span>
            </h1>
            <p
              className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed animate-fade-up"
              style={{ animationDelay: "60ms" }}
            >
              Create short links, set expiry dates, and see where your clicks come from.
            </p>
            <div
              className="flex flex-wrap items-center gap-4 animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <Button asChild size="lg" className="group">
                <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                  {isLoggedIn ? "Open dashboard" : "Get started"}{" "}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#features">See features</a>
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-[0_1px_3px_rgb(0,0,0,0.04),0_12px_24px_-4px_rgb(0,0,0,0.06)] animate-fade-up"
            style={{ animationDelay: "180ms" }}
          >
            <div className="text-sm font-semibold text-foreground mb-5">
              Shorten a link
            </div>
            <label
              htmlFor="hero-url"
              className="text-xs font-medium text-muted-foreground mb-2 block"
            >
              Destination URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="hero-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="bg-background pl-9 pr-14"
                  inputMode="url"
                />
                {url ? (
                  <button
                    type="button"
                    onClick={() => setUrl("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Clear URL"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                    title="Paste from clipboard"
                  >
                    Paste
                  </button>
                )}
              </div>
              <Button type="submit">Continue</Button>
            </div>
            <div className="mt-4 border-t border-border/60 pt-3.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-muted-foreground" /> Sign in to save your link
            </div>
          </form>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-16 scroll-mt-24" id="features">
        <div className="max-w-xl mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3 text-balance">
            Short links you can actually manage.
          </h2>
          <p className="text-base text-muted-foreground">
            Aliases, expiry dates and click analytics for every link you create.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <article className="flex flex-col min-h-[300px] p-6 rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgb(0,0,0,0.03),0_6px_16px_-4px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgb(0,0,0,0.05),0_12px_24px_-4px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                <Link2 size={16} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Domain</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1.5">
                Branded custom links
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Use a readable alias for every destination.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 p-3.5 border border-border rounded-xl bg-muted/30">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="truncate max-w-[200px]">github.com/adityasrc/portfolio</span>
                <span className="rounded border border-border bg-card px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground">302</span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-border/60 font-mono text-xs">
                <span className="text-muted-foreground">
                  {window.location.host}/<strong className="text-foreground font-semibold">portfolio</strong>
                </span>
                <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" title="Copy">
                  <Copy size={13} />
                </span>
              </div>
            </div>
          </article>

          <article className="flex flex-col min-h-[300px] p-6 rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgb(0,0,0,0.03),0_6px_16px_-4px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgb(0,0,0,0.05),0_12px_24px_-4px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                <CalendarClock size={16} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Expiry</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1.5">
                Auto-expiring links
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Set custom expiration dates for limited-time shares.
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between p-3.5 px-4 border border-border rounded-xl bg-muted/30">
              <div className="flex items-center gap-2.5">
                <div className="relative inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-foreground p-0.5">
                  <div className="h-4 w-4 rounded-full bg-background shadow-xs translate-x-4 transition-transform" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">Expiration timer</span>
                  <span className="text-[11px] text-muted-foreground">Auto-deactivates</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-medium text-foreground">
                <Clock size={12} className="text-muted-foreground" />
                <span>7 days left</span>
              </div>
            </div>
          </article>

          <article className="flex flex-col min-h-[300px] p-6 rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgb(0,0,0,0.03),0_6px_16px_-4px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgb(0,0,0,0.05),0_12px_24px_-4px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                <BarChart3 size={16} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Analytics</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1.5">
                Click insights
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                See what sends visitors your way.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 p-3.5 border border-border rounded-xl bg-muted/30">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-border/60">
                <span className="text-muted-foreground text-[11px]">Total clicks</span>
                <div className="flex items-center gap-2">
                  <strong className="font-mono text-foreground font-semibold">1,420</strong>
                  <span className="text-[10px] font-medium text-muted-foreground bg-card border border-border rounded px-1.5 py-0.5">
                    +18%
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {REFERRERS.map(({ label, pct }) => (
                  <div key={label} className="grid grid-cols-[50px_1fr_32px] items-center gap-2 text-xs text-muted-foreground">
                    <span>{label}</span>
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div className="h-full bg-foreground rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <strong className="font-mono text-xs font-medium tabular-nums text-right text-foreground">{pct}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="flex flex-col min-h-[300px] p-6 rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgb(0,0,0,0.03),0_6px_16px_-4px_rgb(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgb(0,0,0,0.05),0_12px_24px_-4px_rgb(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-center justify-between mb-5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground">
                <Gauge size={16} />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Performance</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-1.5">
                Fast redirects
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Frequently used links are served from Redis cache.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 p-3.5 border border-border rounded-xl bg-muted/30">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Zap size={15} className="text-amber-500" />
                  <strong className="text-xs font-semibold text-foreground">Redis Cache</strong>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> Cache-aside
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-border/60 text-[11px] text-muted-foreground">
                <span>In-memory key lookup</span>
                <span className="font-medium text-foreground">Async analytics</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-12 sm:pb-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-muted/50 via-card to-card p-8 sm:p-10 text-center shadow-xs">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-foreground/[0.03] to-transparent"
          />
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground">
              Create your first short link.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2.5 max-w-md leading-relaxed">
              Free to use. Your dashboard is ready when you are.
            </p>
            <Button asChild size="lg" className="mt-6 rounded-full px-6 group">
              <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                Create a link{" "}
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
