import { FunctionComponent, ReactNode } from "react";
import { ScrollView as ScrollViewImported, StyleSheet } from "react-native";

export const ScrollView: FunctionComponent<{
  isContainer?: boolean;
  isHorizontal?: boolean;
  children: ReactNode;
}> = (props) => {
  const { isContainer, isHorizontal, children } = props;

  return (
    <ScrollViewImported
      horizontal={isHorizontal}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={isContainer && styles.container}
    >
      {children}
    </ScrollViewImported>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 124,
  },
});
