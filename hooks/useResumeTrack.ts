import { useErrorStore } from "@/stores/errorStore";
import { usePlayerStore } from "@/stores/playerStore";

export const useResumeTrack = () => {
  const { $track, setStatus } = usePlayerStore();
  const { setError } = useErrorStore();

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
