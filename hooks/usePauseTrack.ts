import { Audio } from "expo-av";
import { MutableRefObject } from "react";

type Util = (params: {
  setError: (param: string) => void;
  setStatus: (param: string) => void;
}) => ($soundRef: MutableRefObject<Audio.Sound | null>) => void;

export const usePauseTrack: Util = (params) => {
  const { setError, setStatus } = params;

  return async ($soundRef) => {
    if ($soundRef.current) {
      try {
        await $soundRef.current.pauseAsync();
        setStatus("pause");
      } catch (error) {
        setError("音源の停止に失敗しました");
      }
    }
  };
};
