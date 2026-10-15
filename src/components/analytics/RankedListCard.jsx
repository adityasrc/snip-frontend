import { ChartCard } from "./ChartCard";

export function RankedListCard({ title, icon, data = [], formatName = (name) => name }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <ChartCard title={title} icon={icon}>
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No data yet</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {data.map((item, index) => {
            const pct = total ? Math.round((item.value / total) * 100) : 0;
            return (
              <li key={item.name} className="flex items-center gap-3">
                <span className="w-4 shrink-0 text-center text-xs font-medium tabular-nums text-muted-foreground">{index + 1}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium" title={item.name}>{formatName(item.name)}</span>
                <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-muted sm:w-32">
                  <div className="h-full origin-left animate-grow rounded-full bg-chart-1" style={{ width: `${pct}%`, animationDelay: `${index * 80}ms` }} />
                </div>
                <span className="w-9 shrink-0 text-right text-xs tabular-nums text-muted-foreground">{pct}%</span>
                <span className="w-8 shrink-0 text-right text-sm font-semibold tabular-nums">{item.value}</span>
              </li>
            );
          })}
        </ul>
      )}
    </ChartCard>
  );
}
