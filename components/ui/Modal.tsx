import React, { useState, useRef } from "react";
import {
  Modal as ModalImported,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Switch,
  Animated,
  Dimensions,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useColorSchemeStore } from "@/stores/colorSchemeStore";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

export default function Modal() {
  const iconTheme = useThemeColor("tabIconDefault");
  const backgroundTheme = useThemeColor("background");
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const isLightMode = colorScheme === "light";

  const [modalVisible, setModalVisible] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  const openMenu = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Entypo name="menu" size={32} color={iconTheme} />
      </TouchableOpacity>

      <ModalImported
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <Animated.View
                style={[
                  styles.modalContainer,
                  {
                    backgroundColor: backgroundTheme,
                    transform: [{ translateX: slideAnim }],
                  },
                ]}
              >
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
                  <ThemedText style={styles.menuItemText}>
                    プラン画面
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
                  <Feather name="mail" size={24} color={iconTheme} />
                  <ThemedText style={styles.menuItemText}>
                    お問い合わせ
                  </ThemedText>
                </TouchableOpacity>

                <ThemedText style={[styles.version, { color: iconTheme }]}>
                  Version 0.0.1
                </ThemedText>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </ModalImported>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
  },
  modalContainer: {
    width: "68%",
    height: "100%",
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    alignSelf: "flex-start",
    gap: 24,
    paddingTop: 120,
    paddingRight: 20,
    paddingLeft: 20,
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
    gap: 12,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  version: {
    fontSize: 12,
    marginTop: "auto",
    paddingBottom: 24,
  },
});
