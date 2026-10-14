import { MapPin } from "lucide-react";
import { RankedListCard } from "./RankedListCard";
import { formatCountry } from "../../lib/utils";

export function TopLocationsChart({ countryData = [] }) {
  const formattedData = countryData.map((item) => ({
    ...item,
    name: formatCountry(item.name),
  }));

  return (
    <RankedListCard
      title="Top Locations"
      icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
      data={formattedData}
    />
  );
}
