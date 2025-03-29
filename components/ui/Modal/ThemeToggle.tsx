import { View, StyleSheet, Switch } from "react-native";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import { ThemedText } from "../../ThemedText";
import Icon from "@/components/Icon";

export default function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorSchemeStore();

  const isLightMode = colorScheme === "light";

  return (
    <View style={styles.container}>
      <Icon name="brightness-6" size={22} />

      <ThemedText>テーマ</ThemedText>

      <Switch
        trackColor={{ false: "#3e3e3e", true: "#3e3e3e" }}
        thumbColor="#fff"
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setColorScheme(isLightMode ? "dark" : "light")}
        value={isLightMode}
        style={styles.switch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  switch: {
    marginLeft: "auto",
  },
});
