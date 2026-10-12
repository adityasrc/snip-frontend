import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart3, CalendarClock, Check, Copy, Gauge, Link2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export function LandingHero() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const isLoggedIn = !!localStorage.getItem("token");

  const goToCreate = () =>
    navigate(
      isLoggedIn ? "/dashboard" : "/signup",
      url.trim() ? { state: { prefillUrl: url.trim() } } : undefined
    );

  return (
    <div className="text-foreground">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none" />

        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:py-24 grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-20 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tighter leading-[0.96] text-foreground mb-6">
              Short links,<br />
              <span className="text-muted-foreground">without the clutter.</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Create links you can share, manage, and measure from one dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                onClick={goToCreate}
                className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                Create a link <ArrowRight size={16} />
              </Button>
              <a
                href="#features"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-xs font-semibold transition-colors"
              >
                Explore features <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-muted/30 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm">
            <div className="text-xs font-semibold text-foreground mb-5">
              Shorten a link
            </div>
            <label htmlFor="hero-url" className="block text-xs font-semibold text-muted-foreground mb-2">
              Destination URL
            </label>
            <div className="flex items-center gap-2.5 p-1.5 pl-3.5 min-w-0 border border-border/80 rounded-xl bg-background shadow-sm focus-within:border-foreground focus-within:ring-2 focus-within:ring-foreground/10 transition-all">
              <Link2 size={18} className="shrink-0 text-muted-foreground" />
              <Input
                id="hero-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goToCreate()}
                placeholder="https://example.com/page"
                className="border-0 shadow-none focus-visible:ring-0 text-xs text-foreground h-9 p-0 bg-transparent placeholder:text-muted-foreground truncate"
              />
              <Button
                onClick={goToCreate}
                className="h-9 px-4 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shrink-0 transition-colors"
              >
                Continue
              </Button>
            </div>
            <div className="mt-4 pt-3.5 border-t border-border/60 text-muted-foreground text-xs flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-muted-foreground" /> Sign in to save your link
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-20 lg:py-28" id="features">
        <div className="max-w-xl mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Built for sharing
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground mb-3">
            Everything a short link needs.
          </h2>
          <span className="text-base text-muted-foreground">
            Create links that look right, travel well, and give you useful data.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <article className="relative min-h-[280px] p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5 transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground mb-5">
              <Link2 size={17} />
            </div>
            <div className="relative z-10 mb-16">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Branded custom links
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Use a readable alias for every destination.
              </p>
            </div>
            <div className="absolute right-6 bottom-6 left-6 flex items-center gap-1 p-3.5 border border-border rounded-lg bg-card shadow-sm font-mono text-xs text-muted-foreground">
              <span>snip.sh/</span>
              <strong className="text-foreground font-medium">your-brand</strong>
              <Copy size={14} className="ml-auto text-muted-foreground" />
            </div>
            <div className="absolute right-6 bottom-20 flex gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 text-[11px] font-medium">
                <Check size={12} /> Available
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded border border-border bg-muted text-muted-foreground text-[11px]">
                Custom alias
              </span>
            </div>
          </article>

          <article className="relative min-h-[280px] p-6 rounded-2xl border border-border bg-muted hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5 transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-foreground mb-5">
              <CalendarClock size={17} />
            </div>
            <div className="relative z-10 mb-16">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Auto-expiring links
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                Set custom expiration dates for limited-time shares.
              </p>
            </div>
            <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between p-3.5 px-4 border border-border rounded-xl bg-card shadow-sm">
              <div className="inline-flex items-center gap-2 text-foreground text-xs font-medium">
                <ShieldCheck size={14} className="text-muted-foreground" />
                <span>Time-limited</span>
              </div>
              <div className="text-right">
                <strong className="block text-foreground font-mono text-xs font-semibold">
                  Auto-deactivates
                </strong>
                <span className="text-muted-foreground text-[11px]">on your schedule</span>
              </div>
            </div>
          </article>

          <article className="relative min-h-[280px] p-6 rounded-2xl border border-border bg-card hover:border-foreground/20 hover:shadow-lg hover:shadow-black/5 transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted text-foreground mb-5">
              <BarChart3 size={17} />
            </div>
            <div className="relative z-10 mb-16">
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-1.5">
                Click insights
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
                See what sends visitors your way.
              </p>
            </div>
            <div className="absolute right-6 bottom-6 left-6 flex flex-col gap-2 p-3.5 border border-border rounded-xl bg-muted">
              <div className="grid grid-cols-[50px_1fr_32px] items-center gap-2 text-xs text-muted-foreground">
                <span>Direct</span>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-foreground rounded-full w-[72%]" />
                </div>
                <strong className="font-mono text-[11px] text-right text-foreground">72%</strong>
              </div>
              <div className="grid grid-cols-[50px_1fr_32px] items-center gap-2 text-xs text-muted-foreground">
                <span>GitHub</span>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-foreground rounded-full w-[46%]" />
                </div>
                <strong className="font-mono text-[11px] text-right text-foreground">46%</strong>
              </div>
              <div className="grid grid-cols-[50px_1fr_32px] items-center gap-2 text-xs text-muted-foreground">
                <span>India</span>
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full bg-foreground rounded-full w-[31%]" />
                </div>
                <strong className="font-mono text-[11px] text-right text-foreground">31%</strong>
              </div>
            </div>
          </article>

          <article className="relative min-h-[280px] p-6 rounded-2xl border border-neutral-800 bg-neutral-950 text-white hover:border-neutral-700 hover:shadow-xl transition-all">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900 text-white mb-5">
              <Gauge size={17} />
            </div>
            <div className="relative z-10 mb-16">
              <h3 className="text-base font-semibold tracking-tight text-white mb-1.5">
                Fast redirects
              </h3>
              <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                Frequently used links are served from Redis cache.
              </p>
            </div>
            <div className="absolute right-6 bottom-6 left-6 flex items-center gap-2 p-3.5 border border-neutral-800 rounded-xl bg-neutral-900 text-white">
              <Zap size={16} className="text-amber-400" />
              <strong className="font-mono text-base tracking-tight font-semibold">Redis Cache</strong>
              <span className="ml-auto text-neutral-400 text-xs">in-memory redirect</span>
            </div>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 p-10 border border-border rounded-2xl bg-card shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Ready to get started?
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground mb-2">
              Create your first short link.
            </h2>
            <span className="text-sm text-muted-foreground block">
              Free to use. Your dashboard is ready when you are.
            </span>
          </div>
          <Button
            onClick={goToCreate}
            className="h-11 px-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 shrink-0"
          >
            Create a link <ArrowRight size={16} />
          </Button>
        </div>
      </section>
    </div>
  );
}
