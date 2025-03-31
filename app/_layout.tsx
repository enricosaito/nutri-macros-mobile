import React from "react";
import { View } from "react-native";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";
import { UserDataProvider } from "../src/context/UserDataContext";
import { colors, darkColors } from "../src/styles/globalStyles";

// Import for simple stack navigation
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
