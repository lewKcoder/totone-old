import { View, type ViewProps } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useAppBackground?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  useAppBackground,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    useAppBackground ? "appBackground" : "background",
    {
      light: lightColor,
      dark: darkColor,
    }
  );

  console.log("ThemedView backgroundColor:", backgroundColor);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
