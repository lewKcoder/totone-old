import { useColorSchemeStore } from "@/stores/colorSchemeStore";

// This is a shim for web and Android where the tab bar is generally opaque.
export default undefined;

export function useBottomTabOverflow() {
  const { colorScheme } = useColorSchemeStore();

  return 0;
}
