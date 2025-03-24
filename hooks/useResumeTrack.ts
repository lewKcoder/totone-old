import { useErrorStore } from "@/stores/errorStore";
import { useStatusStore } from "@/stores/statusStore";
import { useTrackRefStore } from "@/stores/trackRefStore";

export const useResumeTrack = () => {
  const { $track } = useTrackRefStore();
  const { setError } = useErrorStore();
  const { setStatus } = useStatusStore();

  return async () => {
    if ($track && $track.current) {
      try {
        await $track.current.playAsync();
        setStatus("playing");
      } catch (error) {
        setError("音源の再開に失敗しました");
      }
    }
  };
};
