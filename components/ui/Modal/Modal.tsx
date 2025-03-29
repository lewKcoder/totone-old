import { useState, useRef } from "react";
import { Animated } from "react-native";
import {
  Modal as ModalImported,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";
import SideMenu from "./SlideMenu";
import Icon from "@/components/Icon";

export default function Modal() {
  const [modalVisible, setModalVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;

  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const openMenu = () => {
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  return (
    <View>
      <TouchableOpacity onPress={openMenu}>
        <Icon name="menu" size={32} />
      </TouchableOpacity>

      <ModalImported
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <Animated.View
            style={[
              styles.overlay,
              {
                backgroundColor: overlayAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [
                    "rgba(25, 25, 25, 0)",
                    "rgba(25, 25, 25, 0.68)",
                  ],
                }),
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <SideMenu slideAnim={slideAnim} closeMenu={closeMenu} />
            </TouchableWithoutFeedback>
          </Animated.View>
        </TouchableWithoutFeedback>
      </ModalImported>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
  },
});
