import { create } from "zustand";

type LanguageState = {
  language: {
    code: string;
    label: string;
  };
  setLanguage: (language: { code: string; label: string }) => void;
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: { code: "ja", label: "日本語" },
  setLanguage: (language) => set({ language }),
}));
