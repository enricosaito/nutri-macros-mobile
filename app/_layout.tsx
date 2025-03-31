import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar, useColorScheme } from "react-native";
import { AuthProvider } from "../src/context/AuthContext";
import { UserDataProvider } from "../src/context/UserDataContext";
import { colors, darkColors } from "../src/styles/globalStyles";

// Import for custom navigation
import { Slot } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <AuthProvider>
      <UserDataProvider>
        <SafeAreaProvider>
          <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={activeColors.background} />
          <View
            style={{
              flex: 1,
              backgroundColor: activeColors.background,
            }}
          >
            {/* Use Slot instead of Tabs */}
            <Slot />
          </View>
        </SafeAreaProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}
