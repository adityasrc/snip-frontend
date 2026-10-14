import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function RankedListCard({ title, icon, data = [] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card className="bg-card border-border rounded-xl shadow-none">
      <CardHeader className="flex items-center gap-2 border-b px-5 py-4">
        {icon}
        <CardTitle className="text-sm font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
        ) : (
          <div className="flex flex-col gap-3">
            {data.map((item, index) => {
              const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
              return (
                <div key={item.name + index} className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-muted-foreground w-4 shrink-0 text-center tabular-nums">
                    {index + 1}
                  </span>
                  <span
                    className="text-[13px] text-foreground font-medium truncate flex-1 min-w-0"
                    title={item.title || item.name}
                  >
                    {item.name}
                  </span>
                  <div className="w-24 sm:w-32 bg-muted rounded-full h-1.5 shrink-0 overflow-hidden">
                    <div
                      className="h-1.5 rounded-full animate-grow origin-left"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: "hsl(var(--chart-1))",
                        animationDelay: `${index * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="text-[12px] text-muted-foreground w-9 text-right shrink-0 tabular-nums">
                    {pct}%
                  </span>
                  <span className="text-[13px] font-semibold text-foreground w-5 text-right shrink-0 tabular-nums">
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
