import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Activity } from "lucide-react";
import { ChartCard } from "./ChartCard";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value ?? 0;
    return (
      <div className="rounded-lg border bg-card px-3 py-2 text-xs shadow-md">
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-muted-foreground mt-0.5">
          <span className="font-semibold text-foreground tabular-nums">{value}</span>{" "}
          {value === 1 ? "click" : "clicks"}
        </p>
      </div>
    );
  }
  return null;
}

export function TrafficChart({ timelineData = [] }) {
  const totalClicks = timelineData.reduce((sum, d) => sum + (d.clicks || 0), 0);

  return (
    <ChartCard
      icon={Activity}
      title="Traffic (last 7 days)"
      subtitle={`${totalClicks} ${totalClicks === 1 ? "click" : "clicks"} this week`}
    >
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timelineData}
            margin={{ top: 12, right: 12, left: -20, bottom: 4 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity={0.18} />
                <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, (dataMax) => Math.max(dataMax, 2)]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorClicks)"
              dot={{ r: 3.5, fill: "hsl(var(--chart-1))", stroke: "hsl(var(--card))", strokeWidth: 1.5 }}
              activeDot={{ r: 5.5, fill: "hsl(var(--chart-1))", stroke: "hsl(var(--card))", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
