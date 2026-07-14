import { Share2 } from "lucide-react";
import { RankedListCard } from "./RankedListCard";

export function TopReferrersChart({ referrerData }) {
  return (
    <RankedListCard
      title="Top Referrers"
      icon={<Share2 className="w-4 h-4 text-slate-400" />}
      data={referrerData}
      color="#3b82f6"
    />
  );
}
