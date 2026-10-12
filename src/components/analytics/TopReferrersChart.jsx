import { Share2 } from "lucide-react";
import { RankedListCard } from "./RankedListCard";

export function TopReferrersChart({ referrerData = [] }) {
  const formattedData = referrerData.map((item) => ({
    ...item,
    name: !item.name || item.name === "Unknown" ? "Direct" : item.name,
  }));

  return (
    <RankedListCard
      title="Top Referrers"
      icon={<Share2 className="w-4 h-4 text-muted-foreground" />}
      data={formattedData}
      barColor="bg-purple-600"
    />
  );
}
