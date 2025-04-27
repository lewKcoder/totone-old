import { useErrorStore } from "@/stores/errorStore";
import { usePlayerStore } from "@/stores/playerStore";

export const usePauseTrack = () => {
  const { $track, setStatus } = usePlayerStore();
  const { setError } = useErrorStore();

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
