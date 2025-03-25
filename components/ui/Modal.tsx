import React, { useState } from "react";
import {
  Modal as ModalImported,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";

export default function Modal() {
  const theme = useThemeColor("tabIconDefault");
  const { colorScheme, setColorScheme } = useColorSchemeStore();

  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = () => setModalVisible(true);
  const closeMenu = () => setModalVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={32} color={theme} />
      </TouchableOpacity>

      <ModalImported
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.modalContainer}>
          <Image
            source={require("../../assets/images/icon-totone.png")}
            style={styles.logo}
          />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setColorScheme(colorScheme === "dark" ? "light" : "dark");
              closeMenu();
            }}
          >
            <Text style={styles.menuItemText}>ライト/ダークモード切替</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>プラン画面</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItemText}>お問い合わせ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Text style={styles.closeButtonText}>閉じる</Text>
          </TouchableOpacity>
        </View>
      </ModalImported>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 38,
    height: 27,
    marginBottom: 33,
  },
  menuItem: {
    marginVertical: 15,
  },
  menuItemText: {
    fontSize: 18,
    color: "#333",
  },
  closeButton: {
    marginTop: 30,
    alignSelf: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
});
