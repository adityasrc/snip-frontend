import { Globe } from "lucide-react";
import { RankedListCard } from "./RankedListCard";

export function TopBrowsersChart({ browserData = [] }) {
  const formattedData = browserData.map((item) => ({
    ...item,
    name: !item.name || item.name === "Unknown" ? "Other" : item.name,
  }));

  return (
    <RankedListCard
      title="Top Browsers"
      icon={<Globe className="w-4 h-4 text-muted-foreground" />}
      data={formattedData}
      barColor="bg-blue-600"
    />
  );
}
