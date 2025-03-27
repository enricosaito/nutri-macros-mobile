import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen once fonts are loaded or if there's an error
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </View>
  );
}
