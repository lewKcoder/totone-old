import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export default function Icon(
  props: ComponentProps<typeof MaterialCommunityIcons>
) {
  const iconTheme = useThemeColor("tabIconDefault");

  return (
    <MaterialCommunityIcons
      {...props}
      color={props.color ? props.color : iconTheme}
    />
  );
}
