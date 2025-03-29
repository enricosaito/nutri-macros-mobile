// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ErrorBoundary from "../components/error-boundary";

// Create a separate TabsNavigator component that uses the theme
function TabsNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedForeground,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: theme.colors.border,
            backgroundColor: theme.colors.card,
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
            tabBarIcon: ({ color, size }) => <Feather name="cpu" size={size} color={color} />,
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
      </Tabs>
    </>
  );
}

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <TabsNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
