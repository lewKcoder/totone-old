import { useEffect } from "react";
import { useTrackRefStore } from "@/stores/trackRefStore";
import { useFilterStore } from "@/stores/filterStore";
import { musicTabs } from "@/constants/TabMenu";
import TrackList from "@/components/TrackList";

export default function MusicScreen() {
  const { $track } = useTrackRefStore();
  const { musicFilter, setMusicFilter } = useFilterStore();

  useEffect(() => {
    return () => {
      if ($track && $track.current) {
        $track.current.unloadAsync();
      }
    };
  }, []);

  return (
    <TrackList
      tabs={musicTabs}
      filter={musicFilter}
      setFilter={setMusicFilter}
    />
  );
}
