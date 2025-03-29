import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function PlanScreen() {
  const router = useRouter();

  return (
    <View>
      <Text>プラン画面です</Text>
      <Button title="戻る" onPress={() => router.back()} />
    </View>
  );
}
