import { useErrorStore } from "@/stores/errorStore";
import { usePlayingTrackStore } from "@/stores/playingTrackStore";
import { usePlayerStore } from "@/stores/playerStore";
import { Audio } from "expo-av";
import { ImageSourcePropType } from "react-native";

export const usePlayTrack = () => {
  const { $track, setStatus } = usePlayerStore();
  const { setError } = useErrorStore();
  const { setPlayingTrack } = usePlayingTrackStore();

  return async (params: {
    soundUrl: number;
    playingTrack: {
      thumbnail: ImageSourcePropType;
      label: string;
    };
  }) => {
    const { soundUrl, playingTrack } = params;

    if (!$track) {
      return null;
    }

    if ($track.current) {
      try {
        await $track.current.stopAsync();
        await $track.current.unloadAsync();
      } catch (error) {
        setError("既存の音源の停止・解放に失敗しました");
      }
    }

    try {
      const { sound } = await Audio.Sound.createAsync(soundUrl, {
        shouldPlay: true,
      });
      $track.current = sound;
      setStatus("playing");
      setPlayingTrack({ ...playingTrack });
    } catch (error) {
      setError("音源の再生に失敗しました");
    }
  };
};
