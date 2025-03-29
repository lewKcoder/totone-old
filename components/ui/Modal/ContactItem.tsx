import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import Icon from "@/components/Icon";

type Props = {
  closeMenu: () => void;
};

export default function ContactItem(props: Props) {
  const { closeMenu } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={closeMenu}>
      <Icon name="email-outline" size={22} />
      <ThemedText style={styles.content}>お問い合わせ</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  content: {
    fontSize: 16,
  },
});
