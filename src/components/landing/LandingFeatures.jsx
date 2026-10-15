import {
  BarChart3,
  CalendarClock,
  Clock,
  Copy,
  Gauge,
  Link2,
  Zap,
} from "lucide-react";

const REFERRERS = [
  { label: "Direct", pct: 54 },
  { label: "GitHub", pct: 28 },
  { label: "Google", pct: 18 },
];

function FeatureCard({ icon, title, description, children }) {
  const Icon = icon;
  return (
    <article className="flex min-h-[300px] flex-col rounded-2xl border bg-card p-6 shadow-xs">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      <div className="mt-auto pt-6">{children}</div>
    </article>
  );
}

export function LandingFeatures() {
  return (
    <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-12 lg:py-16">
      <div className="mb-12 max-w-xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Features
        </p>
        <h2 className="mb-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Short links you can actually manage.
        </h2>
        <p className="text-base text-muted-foreground">
          Aliases, expiry dates and click analytics for every link you create.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FeatureCard
          icon={Link2}
          title="Branded custom links"
          description="Use a readable alias for every destination."
        >
          <div className="rounded-xl border bg-muted/30 p-3.5 font-mono text-xs">
            <p className="truncate text-muted-foreground">github.com/adityasrc/portfolio</p>
            <div className="mt-2 flex items-center justify-between border-t pt-2">
              <span className="text-muted-foreground">
                {window.location.host}/<span className="font-semibold text-foreground">portfolio</span>
              </span>
              <Copy className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          icon={CalendarClock}
          title="Auto-expiring links"
          description="Set custom expiration dates for limited-time shares."
        >
          <div className="flex items-center justify-between rounded-xl border bg-muted/30 px-4 py-3.5 text-sm">
            <span className="text-muted-foreground">Expires</span>
            <span className="inline-flex items-center gap-1.5 rounded-lg border bg-card px-2.5 py-1 text-xs font-medium">
              <Clock className="h-3 w-3 text-muted-foreground" /> in 7 days
            </span>
          </div>
        </FeatureCard>

        <FeatureCard
          icon={BarChart3}
          title="Click insights"
          description="See what sends visitors your way."
        >
          <div className="rounded-xl border bg-muted/30 p-3.5">
            <p className="mb-2 text-xs font-medium text-muted-foreground">Top referrers</p>
            <div className="flex flex-col gap-2">
              {REFERRERS.map(({ label, pct }) => (
                <div
                  key={label}
                  className="grid grid-cols-[3.5rem_1fr_2rem] items-center gap-2 text-xs"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <div className="h-1.5 rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-brand"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-right font-medium tabular-nums">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </FeatureCard>

        <FeatureCard
          icon={Gauge}
          title="Fast redirects"
          description="Frequently used links are served from Redis cache."
        >
          <div className="flex items-center gap-2 rounded-xl border bg-muted/30 px-4 py-3.5 text-sm">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">Redis Cache</span>
            <span className="ml-auto text-xs text-muted-foreground">in-memory redirect</span>
          </div>
        </FeatureCard>
      </div>
    </section>
  );
}
