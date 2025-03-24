import { Context } from "@/hooks/useProvider";
import { Audio } from "expo-av";
import { MutableRefObject, useContext } from "react";

type Util = (params: {
  setError: (param: string) => void;
  setStatus: (param: string) => void;
}) => ($soundRef: MutableRefObject<Audio.Sound | null>) => void;

export const useResumeTrack: Util = (params) => {
  const { setError, setStatus } = params;

  return async ($soundRef) => {
    if ($soundRef.current) {
      try {
        await $soundRef.current.playAsync();
        setStatus("playing");
      } catch (error) {
        setError("音源の再開に失敗しました");
      }
    }
  };
};
