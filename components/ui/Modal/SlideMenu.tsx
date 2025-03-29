import { Animated } from "react-native";
import { StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import VersionText from "./VersionText";
import ContactItem from "./ContactItem";
import LanguageSelector from "./LanguageSelector";
import PlanSection from "./PlanSection";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

type Props = {
  slideAnim: Animated.Value;
  closeMenu: () => void;
};

export default function SideMenu(props: Props) {
  const { closeMenu, slideAnim } = props;

  const backgroundTheme = useThemeColor("background");
  const router = useRouter();

  const handlePressPlan = () => {
    closeMenu();
    router.push("/plan");
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: backgroundTheme,
          transform: [{ translateX: slideAnim }],
        },
      ]}
    >
      <Logo />

      <ThemeToggle />

      <PlanSection handlePressPlan={handlePressPlan} />

      <LanguageSelector />

      <ContactItem closeMenu={closeMenu} />

      <VersionText />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "68%",
    height: "100%",
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    alignSelf: "flex-start",
    gap: 24,
    paddingTop: 54,
    paddingRight: 20,
    paddingLeft: 20,
  },
});
