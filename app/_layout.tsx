// app/_layout.tsx - Add AnimationProvider
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar, useColorScheme, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors, darkColors } from "../src/styles/globalStyles";
import ErrorBoundary from "../components/error-boundary";
import { AnimationProvider } from "../src/context/AnimationContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Directly use theme colors based on color scheme
  const activeColors = isDark ? darkColors : colors;

  return (
    <ErrorBoundary>
      <AnimationProvider>
        <SafeAreaProvider>
          <View style={[styles.container, { backgroundColor: activeColors.background }]}>
            <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={activeColors.background} />
            <Tabs
              screenOptions={{
                tabBarActiveTintColor: activeColors.primary,
                tabBarInactiveTintColor: activeColors.textMuted,
                tabBarStyle: {
                  borderTopWidth: 1,
                  borderTopColor: activeColors.border,
                  backgroundColor: activeColors.card,
                  height: 60,
                  paddingBottom: 10,
                },
                headerShown: false,
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: "Início",
                  tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
                }}
              />
              <Tabs.Screen
                name="calculator"
                options={{
                  title: "Calculadora",
                  tabBarIcon: ({ color, size }) => <Feather name="sliders" size={size} color={color} />,
                }}
              />
              <Tabs.Screen
                name="recipes"
                options={{
                  title: "Receitas",
                  tabBarIcon: ({ color, size }) => <Feather name="book-open" size={size} color={color} />,
                }}
              />
              <Tabs.Screen
                name="profile"
                options={{
                  title: "Perfil",
                  tabBarIcon: ({ color, size }) => <Feather name="user" size={size} color={color} />,
                }}
              />
              <Tabs.Screen
                name="results"
                options={{
                  href: null,
                }}
              />
            </Tabs>
          </View>
        </SafeAreaProvider>
      </AnimationProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
