import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RankedListCard({ title, icon, data = [], barColor = "bg-primary" }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <Card className="bg-card border-border rounded-xl shadow-none">
      <CardHeader className="border-b border-border/50 pb-3 px-5 pt-5">
        <CardTitle className="text-[13px] font-semibold text-foreground flex items-center gap-2">
          {icon} {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 py-4">
        {data.length === 0 ? (
          <p className="text-[13px] text-muted-foreground text-center py-8">No data yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.map((item, index) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
              const barWidth = Math.round((item.value / max) * 100);
              return (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-muted-foreground w-4 shrink-0 text-center">
                    {index + 1}
                  </span>
                  <span className="text-[13px] text-foreground font-medium truncate flex-1 min-w-0">
                    {item.name}
                  </span>
                  <div className="w-24 sm:w-32 bg-muted rounded-full h-1.5 shrink-0 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                  <span className="text-[12px] text-muted-foreground w-9 text-right shrink-0">
                    {pct}%
                  </span>
                  <span className="text-[13px] font-semibold text-foreground w-5 text-right shrink-0">
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
