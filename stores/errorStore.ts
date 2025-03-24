import { create } from "zustand";

type State = string | null;

type ErrorState = {
  error: State;
  setError: (error: State) => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));
