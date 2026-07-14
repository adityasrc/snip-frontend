import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MonitorSmartphone } from "lucide-react";

const COLORS = ["#ea580c", "#3b82f6", "#22c55e", "#f59e0b", "#a855f7"];

export function DevicePieChart({ deviceData }) {
  return (
    <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 px-5 pt-5">
        <CardTitle className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
          <MonitorSmartphone className="w-4 h-4 text-slate-400" /> Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 h-[250px] flex items-center">
        <div className="w-1/2 h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
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
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="w-1/2 flex flex-col gap-2.5 pl-2">
          {deviceData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-[13px] text-slate-600 font-medium truncate">{entry.name}</span>
              <span className="ml-auto text-[13px] font-bold text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
