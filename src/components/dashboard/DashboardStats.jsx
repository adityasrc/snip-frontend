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
      {/* Total Links */}
      <div className="stat-card bg-white border border-[#e1e5eb] rounded-xl p-5 shadow-none flex items-center gap-4 hover:border-[#b9c4d4] transition-colors">
        <div className="bg-[#f5f5f5] w-11 h-11 rounded-xl flex items-center justify-center border border-[#e5e5e5]">
          <Link2 className="w-5 h-5 text-[#0a0a0a]" />
        </div>
        <div>
          <p className="text-[12px] font-medium text-[#737373] uppercase tracking-[0.05em]">Total Links</p>
          <p className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">{totalLinks}</p>
        </div>
      </div>

      {/* Total Clicks */}
      <div className="stat-card bg-white border border-[#e1e5eb] rounded-xl p-5 shadow-none flex items-center gap-4 hover:border-[#b9c4d4] transition-colors">
        <div className="bg-[#eff6ff] w-11 h-11 rounded-xl flex items-center justify-center border border-[#dbeafe]">
          <BarChart3 className="w-5 h-5 text-[#2563eb]" />
        </div>
        <div>
          <p className="text-[12px] font-medium text-[#737373] uppercase tracking-[0.05em]">Total Clicks</p>
          <p className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">{totalClicks}</p>
        </div>
      </div>

      {/* Active Links */}
      <div className="stat-card bg-white border border-[#e1e5eb] rounded-xl p-5 shadow-none flex items-center gap-4 hover:border-[#b9c4d4] transition-colors">
        <div className="bg-[#f0fdf4] w-11 h-11 rounded-xl flex items-center justify-center border border-[#dcfce7]">
          <Activity className="w-5 h-5 text-[#16a34a]" />
        </div>
        <div>
          <p className="text-[12px] font-medium text-[#737373] uppercase tracking-[0.05em]">Active Links</p>
          <p className="text-2xl font-semibold text-[#0a0a0a] tracking-tight">{activeLinks}</p>
        </div>
      </div>
    </div>
  );
}
