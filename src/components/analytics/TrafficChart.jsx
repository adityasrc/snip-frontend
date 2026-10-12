import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function TrafficChart({ timelineData = [] }) {
  const totalClicks = timelineData.reduce((sum, d) => sum + (d.clicks || 0), 0);

  return (
    <Card className="bg-card border-border rounded-xl shadow-none">
      <CardHeader className="border-b border-border pb-4 px-5 pt-5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-semibold text-foreground">
            Traffic (Last 7 Days)
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            {totalClicks} {totalClicks === 1 ? "click" : "clicks"} recorded this week
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[210px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={timelineData}
            margin={{ top: 12, right: 12, left: -20, bottom: 4 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.22} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
              dy={10}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, (dataMax) => Math.max(dataMax, 2)]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.08)",
                fontSize: "12px",
                color: "hsl(var(--card-foreground))",
              }}
              labelStyle={{ fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 2 }}
              itemStyle={{ color: "#2563eb", fontWeight: 600 }}
              formatter={(value) => [`${value} ${value === 1 ? "click" : "clicks"}`, "Traffic"]}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#2563eb"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorClicks)"
              dot={{ r: 3, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#2563eb", stroke: "hsl(var(--card))", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
