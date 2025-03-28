import React from "react";
import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textMuted,
          tabBarStyle: styles.tabBar,
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

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: "white",
    height: 60,
    paddingBottom: 10,
  },
});
