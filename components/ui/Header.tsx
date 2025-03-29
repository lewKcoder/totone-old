import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "./Modal/Modal";
import Icon from "../Icon";

export const Header = () => {
  return (
    <View style={styles.container}>
      <Modal />

      <Image
        source={require("../../assets/images/icon-totone.png")}
        style={styles.logo}
      />

      <TouchableOpacity>
        <Icon name="timer-outline" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 48,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  logo: {
    width: 38,
    height: 27,
    margin: "auto",
    zIndex: -1,
  },
});
