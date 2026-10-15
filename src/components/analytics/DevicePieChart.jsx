import { PieChart, Pie, Cell } from "recharts";
import { MonitorSmartphone } from "lucide-react";
import { ChartCard } from "./ChartCard";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function DevicePieChart({ deviceData = [] }) {
  const total = deviceData.reduce((sum, d) => sum + d.value, 0);

  return (
    <ChartCard icon={MonitorSmartphone} title="Devices">
      {deviceData.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative h-36 w-36 shrink-0 flex items-center justify-center">
            <PieChart width={144} height={144}>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={64}
                paddingAngle={deviceData.length > 1 ? 3 : 0}
                dataKey="value"
                strokeWidth={0}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold tabular-nums">
                {total}
              </span>
              <span className="text-xs text-muted-foreground">clicks</span>
            </div>
          </div>

          <div className="w-full flex-1 flex flex-col gap-2.5 min-w-0">
            {deviceData.map((item, index) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
              return (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0 truncate">
                    <div
                      className="h-2.5 w-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="font-medium truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
                    <span className="font-semibold tabular-nums w-5 text-right">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ChartCard>
  );
}
