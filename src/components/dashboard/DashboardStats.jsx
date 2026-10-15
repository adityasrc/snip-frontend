import { BarChart3, Link2, Activity } from "lucide-react";

export function DashboardStats({ links }) {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const formattedClicks = new Intl.NumberFormat("en-US").format(totalClicks);

  const activeLinks = links.filter((link) => {
    if (!link.expiresAt) return true;
    return new Date(link.expiresAt) > new Date();
  }).length;

  const stats = [
    { label: "Total links", value: totalLinks, icon: Link2, tone: "bg-muted text-foreground" },
    { label: "Total clicks", value: formattedClicks, icon: BarChart3, tone: "border-brand/20 bg-brand/10 text-brand" },
    { label: "Active links", value: activeLinks, icon: Activity, tone: "border-success/20 bg-success/10 text-success" },
  ];

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      {stats.map(({ label, value, icon, tone }, i) => {
        const Icon = icon;
        return (
          <div
            key={label}
            className="animate-fade-up flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-xs"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${tone}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p className="text-3xl font-semibold tracking-tight tabular-nums">
                {value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
