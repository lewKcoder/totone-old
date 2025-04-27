import { useEffect } from "react";
import { useTrackRefStore } from "@/stores/trackRefStore";
import { useFilterStore } from "@/stores/filterStore";
import { soundTabs } from "@/constants/TabMenu";
import TrackList from "@/components/TrackList";

export default function HomeScreen() {
  const { $track } = useTrackRefStore();
  const { soundFilter, setSoundFilter } = useFilterStore();

  useEffect(() => {
    return () => {
      if ($track && $track.current) {
        $track.current.unloadAsync();
      }
    };
  }, []);

  return (
    <TrackList
      tabs={soundTabs}
      filter={soundFilter}
      setFilter={setSoundFilter}
    />
  );
}
