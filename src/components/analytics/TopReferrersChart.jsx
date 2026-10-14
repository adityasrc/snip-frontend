import { Share2 } from "lucide-react";
import { RankedListCard } from "./RankedListCard";
import { formatReferrer } from "../../lib/utils";

export function TopReferrersChart({ referrerData = [] }) {
  const formattedData = referrerData.map((item) => {
    const rawName = !item.name || item.name === "Unknown" ? "Direct" : item.name;
    return {
      ...item,
      name: formatReferrer(rawName),
      title: rawName,
    };
  });

  return (
    <RankedListCard
      title="Top Referrers"
      icon={<Share2 className="h-4 w-4 text-muted-foreground" />}
      data={formattedData}
    />
  );
}
