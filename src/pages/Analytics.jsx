import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Activity,
  Link as LinkIcon,
  Check,
  Copy,
  MapPin,
  Share2,
} from "lucide-react";
import api from "../lib/api";
import { useCopy } from "../lib/useCopy";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { TrafficChart } from "../components/analytics/TrafficChart";
import { DevicePieChart } from "../components/analytics/DevicePieChart";
import { RankedListCard } from "../components/analytics/RankedListCard";
import { formatBrowser, formatCountry, formatReferrer } from "../lib/utils";

const initialAnalytics = {
  devices: [],
  browsers: [],
  countries: [],
  referrers: [],
  timeline: [],
  summary: { totalClicks: 0, lastClick: null },
};

function AnalyticsSkeleton() {
  return (
    <div>
      <Skeleton className="h-6 w-48" />
      <Skeleton className="mt-3 h-4 w-72" />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="mt-6 h-72 rounded-2xl" />
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function ErrorCard({ message, onBack }) {
  return (
    <div className="mx-auto mt-16 max-w-md rounded-2xl border bg-card p-8 text-center shadow-xs">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border bg-muted">
        <Globe className="h-6 w-6 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-lg font-semibold">Unable to load link</h2>
      <p className="mb-6 text-sm text-muted-foreground">{message || "Link data is unavailable."}</p>
      <Button onClick={onBack} className="w-full">
        Back to Dashboard
      </Button>
    </div>
  );
}

export default function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState(null);
  const [analytics, setAnalytics] = useState(initialAnalytics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, copy] = useCopy();
  const handleCopy = () => copy(`${window.location.origin}/${link.shortId}`);

  useEffect(() => {
    document.title = link?.title ? `Snip | ${link.title}` : "Snip | Analytics";
  }, [link]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get(`/api/links/analytics/${id}`);
        setLink(data.link);
        setAnalytics({ ...initialAnalytics, ...data.analytics });
      } catch {
        setError("Link not found or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const { summary, timeline } = analytics;
  // the counter on the link and the click records can lag behind each other, so show the larger one
  const totalClicks = Math.max(summary.totalClicks, link?.clicks ?? 0);
  const topCountry = totalClicks === 0 ? "None" : formatCountry(analytics.countries[0]?.name);
  const topReferrer = totalClicks === 0 ? "None" : formatReferrer(analytics.referrers[0]?.name);
  const lastClickText = summary.lastClick ? formatDistanceToNow(new Date(summary.lastClick), { addSuffix: true }) : null;

  const timelineData = useMemo(() => {
    const counts = Object.fromEntries(timeline.map((p) => [p.date, p.clicks]));
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(Date.now() - (6 - i) * 86400000);
      const key = day.toISOString().slice(0, 10);
      return { date: format(parseISO(key), "MMM d"), clicks: counts[key] || 0 };
    });
  }, [timeline]);

  const stats = [
    { label: "Total clicks", value: new Intl.NumberFormat("en-US").format(totalClicks), hint: lastClickText ? `Last click ${lastClickText}` : "No clicks yet" },
    { label: "Top location", value: topCountry, hint: totalClicks === 0 ? "No traffic yet" : topCountry === "Unknown" ? "Location not detected" : "Most visits come from here" },
    { label: "Top referrer", value: topReferrer, hint: totalClicks === 0 ? "No traffic yet" : "Most common source" },
  ];

  const createdDate = link?.createdAt
    ? format(new Date(link.createdAt), "MMM d, yyyy")
    : "recently";

  return (
    <div className="min-h-screen bg-muted/50 pb-20">
      <DashboardHeader />
      <div className="mx-auto max-w-6xl px-6 pt-8">
        {loading ? (
          <AnalyticsSkeleton />
        ) : error || !link ? (
          <ErrorCard message={error} onBack={() => navigate("/dashboard")} />
        ) : (
          <>
            <Button
              onClick={() => navigate("/dashboard")}
              variant="ghost"
              size="sm"
              className="-ml-3 mb-4 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Links
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div className="min-w-0">
                <h1 className="mb-1 truncate text-2xl font-semibold tracking-tight">
                  {link.title || "Untitled link"}
                </h1>
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-w-lg items-center gap-1.5 truncate text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="truncate">{link.originalUrl}</span>
                  <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
                <p className="mt-1 text-xs text-muted-foreground">Created {createdDate}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={`${window.location.origin}/${link.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1.5 text-sm font-medium shadow-xs transition-colors hover:bg-muted"
                >
                  <LinkIcon className="h-3.5 w-3.5" />
                  <span className="font-mono text-brand">{window.location.host}/{link.shortId}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  aria-label="Copy short link"
                >
                  {copied ? <Check className="h-4 w-4 text-success animate-pop-in" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="animate-fade-up rounded-2xl border bg-card p-4 shadow-xs"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="mt-1 truncate text-2xl font-semibold tracking-tight tabular-nums">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
                </div>
              ))}
            </div>

            <div className="mt-6">
              {totalClicks === 0 ? (
                <div className="rounded-2xl border border-dashed bg-card p-12 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border bg-muted text-muted-foreground">
                    <Activity className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold">No clicks recorded yet</h3>
                  <p className="text-sm text-muted-foreground">Visits show up here as soon as someone opens your link.</p>
                  <Button variant="outline" className="mt-5" onClick={handleCopy}>
                    Copy short link
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 animate-fade-up">
                  <TrafficChart timelineData={timelineData} />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DevicePieChart deviceData={analytics.devices} />
                    <RankedListCard title="Top browsers" icon={Globe} data={analytics.browsers} formatName={formatBrowser} />
                    <RankedListCard title="Top locations" icon={MapPin} data={analytics.countries} formatName={formatCountry} />
                    <RankedListCard title="Top referrers" icon={Share2} data={analytics.referrers} formatName={formatReferrer} />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
