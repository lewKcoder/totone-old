import { View, StyleSheet, Image } from "react-native";

export default function Logo() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/icon-totone.png")}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 38,
    height: 27,
    marginBottom: 8,
  },
  image: {
    width: 38,
    height: 27,
  },
});
