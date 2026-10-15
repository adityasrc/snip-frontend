import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Link2, ShieldCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { isLoggedIn } from "@/lib/utils";

export function LandingHero() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const loggedIn = isLoggedIn();

  const handleSubmit = (e) => {
    e.preventDefault();
    const prefillUrl = url.trim();
    navigate(
      loggedIn ? "/dashboard" : "/signup",
      prefillUrl ? { state: { prefillUrl } } : undefined
    );
  };

  return (
    <div className="relative isolate overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px]" />

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pt-16 pb-16 md:pt-24 md:pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="max-w-2xl">
          <h1 className="mb-6 text-5xl font-semibold tracking-tight leading-[1.05] text-balance sm:text-6xl animate-fade-up [animation-delay:0ms]">
            Short links,<br />
            <span className="text-muted-foreground">without the clutter.</span>
          </h1>
          <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg animate-fade-up [animation-delay:60ms]">
            Create short links, set expiry dates, and see where your clicks come from.
          </p>
          <div className="flex flex-wrap items-center gap-4 animate-fade-up [animation-delay:120ms]">
            <Button asChild size="lg" className="group">
              <Link to={loggedIn ? "/dashboard" : "/signup"}>
                {loggedIn ? "Open dashboard" : "Get started"}{" "}
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
          className="rounded-2xl border bg-card p-6 shadow-md animate-fade-up [animation-delay:180ms]"
        >
          <div className="mb-5 text-sm font-semibold">
            Shorten a link
          </div>
          <label
            htmlFor="hero-url"
            className="mb-2 block text-xs font-medium text-muted-foreground"
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
          <div className="mt-4 flex items-center gap-1.5 border-t border-border/60 pt-3.5 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-muted-foreground" /> Sign in to save your link
          </div>
        </form>
      </section>
    </div>
  );
}
