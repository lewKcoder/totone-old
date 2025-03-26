import React, { useState } from "react";
import {
  Modal as ModalImported,
  TouchableOpacity,
  View,
  StyleSheet,
  Switch,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import { Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export default function Modal() {
  const iconTheme = useThemeColor("tabIconDefault");
  const backgroundTheme = useThemeColor("background");
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const isLightMode = colorScheme === "light";

  const [modalVisible, setModalVisible] = useState(false);

  const openMenu = () => setModalVisible(true);
  const closeMenu = () => setModalVisible(false);

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={32} color={iconTheme} />
      </TouchableOpacity>

      <ModalImported
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <View
          style={[styles.modalContainer, { backgroundColor: backgroundTheme }]}
        >
          <View style={styles.modalContent}>
            <View style={styles.modeToggle}>
              <Feather
                name="moon"
                size={32}
                color={!isLightMode ? "orange" : "#3e3e3e"}
              />

              <Switch
                trackColor={{ false: "#3e3e3e", true: "#3e3e3e" }}
                thumbColor={isLightMode ? "#fff" : "#fff"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  setColorScheme(isLightMode ? "dark" : "light")
                }
                value={isLightMode}
              />

              <Feather
                name="sun"
                size={32}
                color={isLightMode ? "red" : "#3e3e3e"}
              />
            </View>

            <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
              <FontAwesome name="inbox" size={28} color={iconTheme} />

              <ThemedText style={styles.menuItemText}>プラン画面</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
              <Feather name="mail" size={24} color={iconTheme} />

              <ThemedText style={styles.menuItemText}>お問い合わせ</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
              <AntDesign name="arrowdown" size={24} color={iconTheme} />
            </TouchableOpacity>
          </View>
        </View>
      </ModalImported>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "88%",
    marginTop: "auto",
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    alignItems: "baseline",
  },
  modalContent: {
    padding: 20,
    justifyContent: "center",
    alignItems: "baseline",
    gap: 32,
    margin: "auto",
  },
  logo: {
    width: 38,
    height: 27,
    marginBottom: 33,
  },
  modeToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  closeButton: {
    marginTop: 80,
    alignSelf: "center",
  },
});
