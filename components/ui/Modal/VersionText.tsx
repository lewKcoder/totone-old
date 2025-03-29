import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "../../ThemedText";

export default function VersionText() {
  const iconTheme = useThemeColor("tabIconDefault");

  return (
    <ThemedText style={[styles.version, { color: iconTheme }]}>
      Version 0.0.1
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  version: {
    fontSize: 12,
    marginTop: "auto",
    paddingBottom: 24,
  },
});
