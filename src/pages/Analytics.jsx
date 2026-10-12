import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Activity,
  Clock,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { TrafficChart } from "../components/analytics/TrafficChart";
import { DevicePieChart } from "../components/analytics/DevicePieChart";
import { TopBrowsersChart } from "../components/analytics/TopBrowsersChart";
import { TopLocationsChart } from "../components/analytics/TopLocationsChart";
import { formatCountry } from "../lib/utils";
import { TopReferrersChart } from "../components/analytics/TopReferrersChart";

const initialAnalytics = {
  devices: [],
  browsers: [],
  countries: [],
  referrers: [],
  timeline: [],
  summary: { totalClicks: 0, lastClick: null },
};

export function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState(null);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/api/links/analytics/${id}`);
        const resData = response.data || {};
        const linkObj = resData.link || null;
        setLink(linkObj);

        if (resData.analytics) {
          const data = resData.analytics;
          setAnalytics({
            devices: data?.devices || [],
            browsers: data?.browsers || [],
            countries: data?.countries || [],
            referrers: data?.referrers || [],
            timeline: data?.timeline || [],
            summary: {
              totalClicks: Math.max(data?.summary?.totalClicks || 0, linkObj?.clicks || 0),
              lastClick: data?.summary?.lastClick || null,
            },
          });
        } else if (Array.isArray(resData.clicks)) {
          const rawClicks = resData.clicks;
          const countBy = (fn) => {
            const map = {};
            rawClicks.forEach((c) => {
              const k = fn(c) || "Unknown";
              map[k] = (map[k] || 0) + 1;
            });
            return Object.entries(map)
              .map(([name, value]) => ({ name, value }))
              .sort((a, b) => b.value - a.value);
          };

          const devices = countBy((c) => c.device);
          const browsers = countBy((c) => c.browser).slice(0, 5);
          const countries = countBy((c) => c.country).slice(0, 5);
          const referrers = countBy((c) => c.referrer || "Direct").slice(0, 5);

          const latestDate = rawClicks.reduce((max, c) => {
            const ts = c.timestamp || c.createdAt;
            if (!ts) return max;
            const d = new Date(ts);
            return d > max ? d : max;
          }, new Date(0));

          setAnalytics({
            devices,
            browsers,
            countries,
            referrers,
            timeline: rawClicks.map((c) => ({
              date: c.timestamp || c.createdAt,
              clicks: 1,
            })),
            summary: {
              totalClicks: Math.max(rawClicks.length, linkObj?.clicks || 0),
              lastClick: latestDate.getTime() > 0 ? latestDate.toISOString() : null,
            },
          });
        } else {
          setAnalytics({
            devices: [],
            browsers: [],
            countries: [],
            referrers: [],
            timeline: [],
            summary: {
              totalClicks: linkObj?.clicks || 0,
              lastClick: null,
            },
          });
        }
      } catch {
        setError("Link not found or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const timelineData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      days.push(d);
    }

    const countsByDate = {};
    if (analytics?.timeline?.length) {
      analytics.timeline.forEach((point) => {
        if (!point?.date) return;
        const dateKey =
          typeof point.date === "string" && point.date.length === 10
            ? point.date
            : format(new Date(point.date), "yyyy-MM-dd");
        countsByDate[dateKey] = (countsByDate[dateKey] || 0) + (point.clicks || 0);
      });
    }

    return days.map((day) => {
      const key = format(day, "yyyy-MM-dd");
      return {
        date: format(day, "MMM dd"),
        clicks: countsByDate[key] || 0,
      };
    });
  }, [analytics.timeline]);

  const totalClicks = Math.max(analytics?.summary?.totalClicks ?? 0, link?.clicks ?? 0);

  const rawTopCountry = analytics?.countries?.[0]?.name;
  const topCountry =
    totalClicks === 0
      ? "None"
      : rawTopCountry && rawTopCountry !== "—" && rawTopCountry !== "Unknown"
      ? formatCountry(rawTopCountry)
      : "Unknown";

  const lastClickText = analytics?.summary?.lastClick
    ? formatDistanceToNow(new Date(analytics.summary.lastClick), { addSuffix: true })
    : null;

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-foreground mb-4 animate-spin" />
            <p className="text-muted-foreground text-sm font-medium">Loading analytics...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex justify-center items-center flex-col gap-4 p-6">
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm text-center max-w-md w-full">
            <div className="w-12 h-12 bg-muted text-foreground rounded-2xl flex items-center justify-center mx-auto mb-4 border border-border">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Unable to load link</h2>
            <p className="text-sm text-muted-foreground mb-6">{error || "Link data is unavailable."}</p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 font-medium text-xs"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const createdDate = link.createdAt
    ? format(new Date(link.createdAt), "MMM dd, yyyy")
    : "Recently";

  return (
    <div className="min-h-screen bg-background pb-20">
      <DashboardHeader />

      <div className="bg-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-full mb-4 -ml-2 gap-1.5 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Links
          </Button>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-semibold text-foreground tracking-tight truncate mb-1">
                {link.title || "Untitled Link"}
              </h1>
              <a
                href={link.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1.5 truncate max-w-lg transition-colors"
              >
                <span className="truncate">{link.originalUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>

            <a
              href={`${window.location.origin}/${link.shortId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-muted/50 hover:bg-muted border border-border text-foreground px-3.5 py-1.5 rounded-full text-sm font-medium shrink-0 transition-colors"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>{window.location.host}/{link.shortId}</span>
              <ExternalLink className="w-3 h-3 text-muted-foreground" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            <div className="bg-muted/30 rounded-2xl p-4 border border-border">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.05em] mb-1">Total Clicks</p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{totalClicks}</p>
              {lastClickText && (
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {lastClickText}
                </p>
              )}
            </div>
            <div className="bg-muted/30 rounded-2xl p-4 border border-border">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.05em] mb-1">Top Location</p>
              <p className="text-2xl font-semibold text-foreground tracking-tight truncate">{topCountry}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalClicks === 0 ? "no traffic yet" : "primary traffic source"}
              </p>
            </div>
            <div className="bg-muted/30 rounded-2xl p-4 border border-border">
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-[0.05em] mb-1">Created</p>
              <p className="text-xl font-semibold text-foreground tracking-tight mt-1">{createdDate}</p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 mt-6 pb-4">
        {totalClicks === 0 ? (
          <div className="bg-card p-12 rounded-2xl border border-dashed border-border text-center shadow-sm">
            <div className="w-12 h-12 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-3 border border-border">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No clicks recorded yet</h3>
            <p className="text-sm text-muted-foreground">Share your short link to start seeing real-time visitor analytics.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TrafficChart timelineData={timelineData} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DevicePieChart deviceData={analytics.devices} />
              <TopBrowsersChart browserData={analytics.browsers} />
              <TopLocationsChart countryData={analytics.countries} />
              <TopReferrersChart referrerData={analytics.referrers} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Analytics;
