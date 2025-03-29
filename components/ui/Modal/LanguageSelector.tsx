import { TouchableOpacity, View, StyleSheet } from "react-native";
import { ThemedText } from "../../ThemedText";
import { languages } from "@/constants/Language";
import { useLanguageStore } from "@/stores/languageStore";
import Icon from "@/components/Icon";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <View>
      <View style={styles.container}>
        <Icon name="earth" size={22} />
        <ThemedText style={styles.label}>言語: {language.label}</ThemedText>
      </View>

      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={styles.option}
          onPress={() => setLanguage(lang)}
        >
          <Icon
            name={
              lang.code === language.code
                ? "check-circle"
                : "checkbox-blank-circle-outline"
            }
            size={18}
          />

          <ThemedText style={styles.language}>{lang.label}</ThemedText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 4,
  },
  label: {
    fontSize: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 2,
  },
  language: {
    fontSize: 12,
  },
});
