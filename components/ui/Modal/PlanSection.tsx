import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import Icon from "@/components/Icon";

type Props = {
  handlePressPlan: () => void;
};

export default function PlanSection(props: Props) {
  const { handlePressPlan } = props;

  return (
    <TouchableOpacity onPress={handlePressPlan}>
      <View style={styles.container}>
        <Icon name="inbox-full" size={22} />
        <ThemedText style={styles.label}>プラン</ThemedText>
      </View>

      <ThemedText style={styles.text}>
        あなたの現在のプラン：プレミアム
      </ThemedText>

      <ThemedText style={styles.text}>
        全てのサウンドとミュージックを聴くことができます。
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 4,
  },
  label: {
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
  },
});
