import { Card } from "../ui/card";

export function ChartCard({ icon, title, subtitle, children }) {
  const Icon = icon;
  return (
    <Card>
      <div className="flex items-center gap-2 border-b px-5 py-4">
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        <h3 className="text-sm font-semibold">{title}</h3>
        {subtitle && <p className="ml-auto text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="p-5">{children}</div>
    </Card>
  );
}
