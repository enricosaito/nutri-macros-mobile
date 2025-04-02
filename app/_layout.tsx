import React from "react";
import { View } from "react-native";
import { StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";
import { UserDataProvider } from "../src/context/UserDataContext";

// Import for simple stack navigation
import { Slot } from "expo-router";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <AuthProvider>
      <UserDataProvider>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDark ? "light-content" : "dark-content"}
            backgroundColor={isDark ? "#000000" : "#f5f9f7"}
          />
          <View className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"}`}>
            {/* Use Slot instead of Tabs */}
            <Slot />
          </View>
        </SafeAreaProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}
