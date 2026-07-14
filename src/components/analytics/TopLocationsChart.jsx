import { MapPin } from "lucide-react";
import { RankedListCard } from "./RankedListCard";

export function TopLocationsChart({ countryData }) {
  return (
    <RankedListCard
      title="Top Locations"
      icon={<MapPin className="w-4 h-4 text-slate-400" />}
      data={countryData}
      color="#f59e0b"
    />
  );
}
