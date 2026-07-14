import { Globe } from "lucide-react";
import { RankedListCard } from "./RankedListCard";

export function TopBrowsersChart({ browserData }) {
  return (
    <RankedListCard
      title="Top Browsers"
      icon={<Globe className="w-4 h-4 text-slate-400" />}
      data={browserData}
      color="#ea580c"
    />
  );
}
