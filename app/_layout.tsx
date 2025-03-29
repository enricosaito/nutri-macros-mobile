// app/_layout.tsx
import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "../src/context/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
            elevation: 0,
            shadowOpacity: 0,
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
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
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  React.useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TabsNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
