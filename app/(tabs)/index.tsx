import { Image, StyleSheet, View, ScrollView } from "react-native";

import { Dimensions } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.cardContainer}>
        {Array.from({ length: 16 }).map((_, index) => (
          <ThemedView key={index} style={styles.card}>
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.cardImage}
            />
            <ThemedText>Card {index + 1}</ThemedText>
          </ThemedView>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    padding: 16,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: screenWidth / 3 - 24,
    borderRadius: 16,
    alignItems: "center",
  },
  cardImage: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    height: 100,
    marginBottom: 8,
  },
});
