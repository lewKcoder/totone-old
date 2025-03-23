import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { View, Image, TouchableOpacity } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: true,
            header: () => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingTop: 56,
                  paddingLeft: 16,
                  paddingRight: 16,
                }}
              >
                <TouchableOpacity>
                  <Entypo name="menu" size={32} color={theme.colors.text} />
                </TouchableOpacity>
                <Image
                  source={require("../assets/images/icon-totone.png")}
                  style={{
                    width: 38,
                    height: 27,
                    margin: "auto",
                  }}
                />
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={32}
                    color={theme.colors.text}
                  />
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
