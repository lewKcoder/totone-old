import { useErrorStore } from "@/stores/errorStore";
import { useStatusStore } from "@/stores/statusStore";
import { useTrackRefStore } from "@/stores/trackRefStore";

export const usePauseTrack = () => {
  const { $track } = useTrackRefStore();
  const { setError } = useErrorStore();
  const { setStatus } = useStatusStore();

  return async () => {
    if ($track && $track.current) {
      try {
        await $track.current.pauseAsync();
        setStatus("pause");
      } catch (error) {
        setError("音源の停止に失敗しました");
      }
    }
  };
};
