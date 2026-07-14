import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MonitorSmartphone } from "lucide-react";

const COLORS = ["#ea580c", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

export function DevicePieChart({ deviceData }) {
  const total = deviceData.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 px-5 pt-5">
        <CardTitle className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
          <MonitorSmartphone className="w-4 h-4 text-slate-400" /> Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-4 flex flex-col items-center gap-4">
        <div className="flex justify-center">
          <PieChart width={140} height={140}>
            <Pie
              data={deviceData}
              cx={65}
              cy={65}
              innerRadius={38}
              outerRadius={58}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {deviceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                fontSize: "12px",
              }}
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
                  <span className="text-[13px] text-slate-600 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-400">{pct}%</span>
                  <span className="text-[13px] font-bold text-slate-900 w-5 text-right">{item.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
