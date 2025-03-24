import { Context } from "@/hooks/useProvider";
import { Audio } from "expo-av";
import { MutableRefObject, useContext } from "react";
import { ImageSourcePropType } from "react-native";

type Util = (params: {
  setError: (param: string) => void;
  setStatus: (param: string) => void;
  setPlayingTrack: (param: {
    thumbnail: ImageSourcePropType;
    label: string;
  }) => void;
}) => (
  soundUrl: number,
  $soundRef: MutableRefObject<Audio.Sound | null>,
  playingTrack: {
    thumbnail: ImageSourcePropType;
    label: string;
  }
) => Promise<void>;

export const usePlayTrack: Util = (params) => {
  const { setError, setPlayingTrack, setStatus } = params;

  return async (soundUrl, $soundRef, playingTrack) => {
    if ($soundRef.current) {
      try {
        await $soundRef.current.stopAsync();
        await $soundRef.current.unloadAsync();
      } catch (error) {
        setError("既存の音源の停止・解放に失敗しました");
      }
    }

    try {
      const { sound } = await Audio.Sound.createAsync(soundUrl, {
        shouldPlay: true,
      });
      $soundRef.current = sound;
      setStatus("playing");
      setPlayingTrack({ ...playingTrack });
    } catch (error) {
      setError("音源の再生に失敗しました");
    }
  };
};
