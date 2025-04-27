import { Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function PlanScreen() {
  const router = useRouter();

  return (
    <ThemedView useAppBackground style={styles.container}>
      <ThemedText style={styles.title}>プラン画面です</ThemedText>

      <ThemedView style={styles.buttonContainer}>
        <Button title="戻る" onPress={() => router.back()} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 20,
  },
});
