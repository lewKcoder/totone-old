import { StyleSheet, Pressable } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

type PlanCardProps = {
  name: string;
  price: string;
  period: string;
  features: string[];
  action?: string;
  note?: string;
  isPremium?: boolean;
  onPress?: () => void;
};

export function PlanCard({
  name,
  price,
  period,
  features,
  action,
  note,
  isPremium,
  onPress,
}: PlanCardProps) {
  const borderColor = useThemeColor("tabIconDefault");
  const tintColor = useThemeColor("tint");

  return (
    <ThemedView style={[styles.card, { borderColor }]}>
      <ThemedText style={styles.name}>{name}</ThemedText>
      <ThemedView style={styles.priceContainer}>
        <ThemedText style={styles.price}>{price}</ThemedText>
        <ThemedText style={styles.period}>/ {period}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.features}>
        {features.map((feature, index) => (
          <ThemedText key={index} style={styles.feature}>
            {feature}
          </ThemedText>
        ))}
      </ThemedView>

      {action && (
        <Pressable
          onPress={onPress}
          style={[
            styles.actionButton,
            { backgroundColor: isPremium ? tintColor : "transparent" },
          ]}
        >
          <ThemedText
            style={[
              styles.actionText,
              { color: isPremium ? "#fff" : tintColor },
            ]}
          >
            {action}
          </ThemedText>
        </Pressable>
      )}

      {note && <ThemedText style={styles.note}>{note}</ThemedText>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
  },
  features: {
    marginBottom: 20,
  },
  feature: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  actionButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
  },
});
