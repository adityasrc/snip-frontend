import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RankedListCard({ title, icon, data, color = "#ea580c" }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className="bg-white border-slate-200 rounded-3xl shadow-sm">
      <CardHeader className="border-b border-slate-100 pb-3 px-5 pt-5">
        <CardTitle className="text-[14px] font-bold text-slate-900 flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-4">
        {data.length === 0 ? (
          <p className="text-[13px] text-slate-400 text-center py-8">No data yet</p>
        ) : (
          <div className="flex flex-col gap-3.5">
            {data.map((item, index) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
              const barWidth = Math.round((item.value / max) * 100);
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[11px] font-bold text-slate-300 w-3.5 shrink-0 text-center">
                    {index + 1}
                  </span>
                  <span className="text-[13px] text-slate-700 font-medium truncate flex-1 min-w-0">
                    {item.name}
                  </span>
                  <div className="w-20 bg-slate-100 rounded-full h-1.5 shrink-0">
                    <div
                      className="h-1.5 rounded-full"
                      style={{ width: `${barWidth}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="text-[12px] text-slate-400 w-8 text-right shrink-0">
                    {pct}%
                  </span>
                  <span className="text-[13px] font-bold text-slate-900 w-5 text-right shrink-0">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
