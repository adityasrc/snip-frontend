import { BarChart3, Link2, Activity } from "lucide-react";

export function DashboardStats({ links }) {
  const totalLinks = links.length;
  const totalClicks = links.reduce((sum, link) => sum + (link.clicks || 0), 0);

  const activeLinks = links.filter((link) => {
    if (!link.expiresAt) return true;
    return new Date(link.expiresAt) > new Date();
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="stat-card bg-background border border-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition-all">
        <div className="bg-muted w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-border">
          <Link2 className="w-5 h-5 text-foreground" />
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">Total Links</p>
          <p className="text-3xl font-semibold text-foreground tracking-tight">{totalLinks}</p>
        </div>
      </div>

      <div className="stat-card bg-background border border-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition-all">
        <div className="bg-blue-50 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-blue-600/20">
          <BarChart3 className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">Total Clicks</p>
          <p className="text-3xl font-semibold text-foreground tracking-tight">{totalClicks}</p>
        </div>
      </div>

      <div className="stat-card bg-background border border-border rounded-2xl p-5 flex items-center gap-4 hover:shadow-sm transition-all">
        <div className="bg-green-50 w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-green-600/20">
          <Activity className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">Active Links</p>
          <p className="text-3xl font-semibold text-foreground tracking-tight">{activeLinks}</p>
        </div>
      </div>
    </div>
  );
}
