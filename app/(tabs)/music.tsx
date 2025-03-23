import {
  Image,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

const screenWidth = Dimensions.get("window").width;

export default function MusicScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.cardContainer}>
        {Array.from({ length: 16 }).map((_, index) => (
          <TouchableOpacity>
            <View key={index} style={styles.card}>
              <Image
                source={require("@/assets/images/partial-react-logo.png")}
                style={styles.cardImage}
              />
              <ThemedText>Card {index + 1}</ThemedText>
            </View>
          </TouchableOpacity>
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
    rowGap: 16,
  },
  card: {
    width: screenWidth / 3 - 24,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
});
