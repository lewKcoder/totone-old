import { ReactNode, useEffect } from "react";
import {
  ThemeProvider,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "./useColorScheme";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";

export const Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorSchemeOrigin = useColorScheme();
  const { colorScheme, setColorScheme } = useColorSchemeStore();

  useEffect(() => {
    setColorScheme(colorSchemeOrigin);
  }, []);

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return <ThemeProvider value={theme}>{children}</ThemeProvider>;
};
