import { useContext } from "react";
import { Context } from "./useProvider";
import { usePlayTrack } from "./usePlayTrack";
import { usePauseTrack } from "./usePauseTrack";
import { useResumeTrack } from "./useResumeTrack";

type Util = () => {
  playTrack: ReturnType<typeof usePlayTrack>;
  pauseTrack: ReturnType<typeof usePauseTrack>;
  resumeTrack: ReturnType<typeof useResumeTrack>;
} | null;

export const useTrackManager: Util = () => {
  const value = useContext(Context);

  if (!value) {
    return null;
  }

  const { $soundRef, setError, setPlayingTrack, setStatus } = value;

  return {
    playTrack: usePlayTrack({
      $soundRef,
      setError,
      setPlayingTrack,
      setStatus,
    }),
    pauseTrack: usePauseTrack({ setError, setStatus }),
    resumeTrack: useResumeTrack({ setError, setStatus }),
  };
};
