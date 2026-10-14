import { BarChart3, Link2, Activity } from "lucide-react";

export function DashboardStats({ links }) {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);
  const formattedClicks = new Intl.NumberFormat("en-US").format(totalClicks);

  const activeLinks = links.filter((link) => {
    if (!link.expiresAt) return true;
    return new Date(link.expiresAt) > new Date();
  }).length;

  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-3">
      <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-xs">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border bg-muted text-foreground">
          <Link2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Links
          </p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {totalLinks}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-xs">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Clicks
          </p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {formattedClicks}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-xs">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-600/20 bg-emerald-50 text-emerald-600">
          <Activity className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Active Links
          </p>
          <p className="text-3xl font-semibold tracking-tight tabular-nums text-foreground">
            {activeLinks}
          </p>
        </div>
      </div>
    </div>
  );
}
