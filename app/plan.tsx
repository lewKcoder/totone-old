import { StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { PlanCard } from "@/components/ui/SubscriptionPlan";

export default function PlanScreen() {
  const router = useRouter();

  const handleUpgrade = () => {
    // TODO: サブスクリプション購入処理
    console.log("プレミアムプランへアップグレード");
  };

  return (
    <ThemedView useAppBackground style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ThemedText style={styles.title}>サブスクリプション</ThemedText>

        <PlanCard
          name="プレミアム"
          price="¥ 500"
          period="月"
          features={[
            "全ての音と音楽が再生できます",
            "将来追加される新機能も制限なく利用できます",
          ]}
          action="アップグレードする"
          isPremium
          onPress={handleUpgrade}
        />

        <PlanCard
          name="フリー"
          price="¥ 0"
          period="月"
          features={[
            "フリープランで楽しめる全ての音と音楽を再生できます",
            "将来追加される新機能を制限付きで利用できます",
          ]}
          note="プレミアムプランからフリープランに移行する場合は、本端末のサブスクリプションから操作ください"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
});
