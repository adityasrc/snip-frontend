import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, CalendarClock, Copy, Gauge, Link2, ShieldCheck, Zap } from "lucide-react";
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

  return (
    <div className="text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:py-24 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05] text-balance text-foreground mb-6">
              Short links,<br />
              <span className="text-muted-foreground">without the clutter.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Create short links, set expiry dates, and see where your clicks come from.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
                  {isLoggedIn ? "Open dashboard" : "Get started"} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <a href="#features">See features</a>
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-muted/30 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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
                  className="bg-background pl-9"
                  inputMode="url"
                />
              </div>
              <Button type="submit">Continue</Button>
            </div>
            <div className="mt-4 border-t border-border/60 pt-3.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck size={14} className="text-muted-foreground" /> Sign in to save your link
            </div>
          </form>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28 scroll-mt-24" id="features">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="flex flex-col min-h-[280px] p-6 rounded-2xl border border-border bg-card transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground mb-5">
              <Link2 size={17} />
            </div>
            <div className="mb-8">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Branded custom links
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Use a readable alias for every destination.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-1 p-3.5 border border-border rounded-lg bg-card shadow-xs font-mono text-xs text-muted-foreground">
              <span>{window.location.host}/</span>
              <strong className="text-foreground font-medium">portfolio</strong>
              <Copy size={14} className="ml-auto text-muted-foreground" />
            </div>
          </article>

          <article className="flex flex-col min-h-[280px] p-6 rounded-2xl border border-border bg-muted transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground mb-5">
              <CalendarClock size={17} />
            </div>
            <div className="mb-8">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Auto-expiring links
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Set custom expiration dates for limited-time shares.
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between p-3.5 px-4 border border-border rounded-xl bg-card shadow-xs">
              <div className="inline-flex items-center gap-2 text-foreground text-xs font-medium">
                <ShieldCheck size={14} className="text-muted-foreground" />
                <span>Time-limited</span>
              </div>
              <div className="text-right">
                <span className="block text-foreground text-xs font-semibold">
                  Auto-deactivates
                </span>
                <span className="text-muted-foreground text-xs">on your schedule</span>
              </div>
            </div>
          </article>

          <article className="flex flex-col min-h-[280px] p-6 rounded-2xl border border-border bg-card transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground mb-5">
              <BarChart3 size={17} />
            </div>
            <div className="mb-8">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Click insights
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                See what sends visitors your way.
              </p>
            </div>
            <div className="mt-auto flex flex-col gap-2 p-3.5 border border-border rounded-xl bg-muted">
              <span className="text-[11px] font-medium text-muted-foreground">Top referrers</span>
              {REFERRERS.map(({ label, pct }) => (
                <div key={label} className="grid grid-cols-[50px_1fr_32px] items-center gap-2 text-xs text-muted-foreground">
                  <span>{label}</span>
                  <div className="h-1.5 rounded-full bg-border overflow-hidden">
                    <div className="h-full bg-brand rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <strong className="font-mono text-xs font-medium tabular-nums text-right text-foreground">{pct}%</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="flex flex-col min-h-[280px] p-6 rounded-2xl border border-foreground bg-foreground text-background transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-background/20 bg-background/10 text-background mb-5">
              <Gauge size={17} />
            </div>
            <div className="mb-8">
              <h3 className="text-base font-semibold tracking-tight text-background mb-1.5">
                Fast redirects
              </h3>
              <p className="text-xs text-background/60 max-w-xs leading-relaxed">
                Frequently used links are served from Redis cache.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 p-3.5 border border-background/15 rounded-xl bg-background/10 text-background">
              <Zap size={16} className="text-amber-400" />
              <strong className="text-sm tracking-tight font-semibold">Redis Cache</strong>
              <span className="ml-auto text-background/60 text-xs">in-memory redirect</span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-10 border border-border rounded-2xl bg-card shadow-xs">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
              Create your first short link.
            </h2>
            <p className="text-sm text-muted-foreground block">
              Free to use. Your dashboard is ready when you are.
            </p>
          </div>
          <Button asChild size="lg" className="shrink-0">
            <Link to={isLoggedIn ? "/dashboard" : "/signup"}>
              Create a link <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
