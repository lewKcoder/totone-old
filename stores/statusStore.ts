import { create } from "zustand";

type State = "playing" | "pause" | null;

type StatusState = {
  status: State;
  setStatus: (status: State) => void;
};

export const useStatusStore = create<StatusState>((set) => ({
  status: null,
  setStatus: (status) => set({ status }),
}));
