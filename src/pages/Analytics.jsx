import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { HTTP_BACKEND } from "../../config";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  ArrowLeft,
  MousePointerClick,
  Globe,
  MonitorSmartphone,
  Calendar as CalendarIcon,
  ExternalLink,
  Activity,
  MapPin,
  Clock,
} from "lucide-react";
import { format, parseISO, subDays, formatDistanceToNow } from "date-fns";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#ea580c", "#fb923c", "#fdba74", "#ffedd5"];

export default function Analytics() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [link, setLink] = useState(null);
  const [clicks, setClicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(
          `${HTTP_BACKEND}/api/links/analytics/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        setLink(response.data.link);
        setClicks(response.data.clicks || []);
      } catch (e) {
        console.error("Failed to fetch analytics:", e);
        setError("Link not found or you don't have permission to view it.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const deviceData = useMemo(() => {
    const counts = clicks.reduce((acc, curr) => {
      const device = curr.device || "Unknown";
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [clicks]);

  const browserData = useMemo(() => {
    const counts = clicks.reduce((acc, curr) => {
      const browser = curr.browser || "Unknown";
      acc[browser] = (acc[browser] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [clicks]);

  const countryData = useMemo(() => {
    const counts = clicks.reduce((acc, curr) => {
      const country = curr.country || "Unknown";
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [clicks]);

  const timelineData = useMemo(() => {
    if (clicks.length === 0) return [];

    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      return {
        date: format(d, "MMM dd"),
        rawDate: format(d, "yyyy-MM-dd"),
        clicks: 0,
      };
    });

    clicks.forEach((click) => {
      const timeString = click.createdAt || click.timestamp;
      if (!timeString) return;
      const clickDateStr = format(parseISO(timeString), "yyyy-MM-dd");
      const dayIndex = last7Days.findIndex((d) => d.rawDate === clickDateStr);
      if (dayIndex !== -1) last7Days[dayIndex].clicks += 1;
    });

    return last7Days;
  }, [clicks]);

  const lastClickText = useMemo(() => {
    if (clicks.length === 0) return null;

    const latestDate = clicks.reduce((maxDate, click) => {
      const timeString = click.createdAt || click.timestamp;
      if (!timeString) return maxDate;
      const clickDate = new Date(timeString);
      return clickDate > maxDate ? clickDate : maxDate;
    }, new Date(0));

    if (latestDate.getTime() === 0) return null;

    return formatDistanceToNow(latestDate, { addSuffix: true });
  }, [clicks]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <Activity className="w-8 h-8 text-orange-400 mb-4 animate-bounce" />
            <p className="text-slate-500 font-medium">
              Crunching your numbers...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !link) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 flex justify-center items-center flex-col gap-4 p-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center max-w-md w-full">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Oops!</h2>
            <p className="text-slate-500 mb-6">
              {error || "Link data is unavailable."}
            </p>
            <Button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11"
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
    : "Unknown";

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <DashboardHeader />

      <main className="max-w-5xl mx-auto p-6 mt-4">
        <div className="flex items-center gap-3 mb-6">
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-xl border-slate-200 hover:bg-slate-100 text-slate-600"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Link Analytics
          </h1>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 truncate">
            {link.title || "Untitled Link"}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm mb-4">
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center text-slate-500 hover:text-slate-800 hover:underline truncate max-w-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5 shrink-0" />{" "}
              {link.originalUrl}
            </a>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
            <a
              href={`${HTTP_BACKEND}/${link.shortId}`}
              target="_blank"
              rel="noreferrer"
              className="text-orange-600 font-bold text-[15px] hover:underline flex items-center gap-1.5"
            >
              {HTTP_BACKEND.replace(/^https?:\/\//, "")}/{link.shortId}{" "}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="bg-white border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                <MousePointerClick className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Total Clicks
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {link.clicks || 0}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                <MonitorSmartphone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Unique Devices
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {deviceData.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <CalendarIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[13px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
                  Created On
                </p>
                <p className="text-lg font-bold text-slate-900 mt-1">
                  {createdDate}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {clicks.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              No traffic yet
            </h3>
            <p className="text-slate-500">
              Share your short link to start seeing analytics here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
              <CardHeader className="border-b border-slate-100 pb-4 px-6 pt-6">
                <CardTitle className="text-lg font-bold text-slate-900">
                  Traffic (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={timelineData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorClicks"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ea580c"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ea580c"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      allowDecimals={false}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: "#ea580c", fontWeight: "bold" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="clicks"
                      stroke="#ea580c"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorClicks)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 px-6 pt-6">
                  <CardTitle className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-slate-400" />{" "}
                    Devices
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 px-6 pt-6">
                  <CardTitle className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-slate-400" /> Top Browsers
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={browserData}
                      layout="vertical"
                      margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#475569",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        width={80}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#ea580c"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
                <CardHeader className="border-b border-slate-100 pb-4 px-6 pt-6">
                  <CardTitle className="text-[16px] font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" /> Top Locations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={countryData}
                      layout="vertical"
                      margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="#f1f5f9"
                      />
                      <XAxis
                        type="number"
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#64748b", fontSize: 12 }}
                      />
                      <YAxis
                        dataKey="name"
                        type="category"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "#475569",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        width={80}
                      />
                      <Tooltip
                        cursor={{ fill: "#f8fafc" }}
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #e2e8f0",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill="#fb923c"
                        radius={[0, 4, 4, 0]}
                        barSize={20}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {lastClickText && (
              <div className="flex justify-center mt-2 mb-4">
                <p className="text-[13px] text-slate-400 font-medium flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> Last click {lastClickText}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
