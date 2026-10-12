import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MonitorSmartphone } from "lucide-react";

const COLORS = ["#2563eb", "#38bdf8", "#818cf8", "#a855f7", "#64748b"];

export function DevicePieChart({ deviceData = [] }) {
  const total = deviceData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="bg-card border-border rounded-xl shadow-none">
      <CardHeader className="border-b border-border pb-3 px-5 pt-5">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
          <MonitorSmartphone className="w-4 h-4 text-muted-foreground" /> Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-5 flex flex-col items-center gap-4">
        {deviceData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No device data yet</p>
        ) : (
          <>
            <div className="flex justify-center">
              <PieChart width={140} height={140}>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={60}
                  paddingAngle={deviceData.length > 1 ? 3 : 0}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderRadius: "8px",
                    border: "1px solid hsl(var(--border))",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    fontSize: "12px",
                    color: "hsl(var(--card-foreground))",
                  }}
                  itemStyle={{ fontWeight: 600 }}
                />
              </PieChart>
            </div>

            <div className="w-full flex flex-col gap-2.5">
              {deviceData.map((item, index) => {
                const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-foreground font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                      <span className="text-sm font-semibold text-foreground w-5 text-right">{item.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
