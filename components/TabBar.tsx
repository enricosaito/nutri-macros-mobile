// components/TabBar.tsx
import React from "react";
import { View, TouchableOpacity, StyleSheet, useColorScheme } from "react-native";
import { usePathname } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text } from "./ui/text";
import { colors, darkColors } from "../src/styles/globalStyles";

interface TabBarProps {
  insets?: { bottom: number };
}

export function TabBar({ insets }: TabBarProps) {
  const pathname = usePathname();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  const tabItems = [
    {
      id: 1,
      icon: "home" as const,
      label: "Início",
      route: "/",
    },
    {
      id: 2,
      icon: "user" as const,
      label: "Perfil",
      route: "/profile",
    },
    {
      id: 3,
      icon: "plus" as const,
      label: "",
      route: "/calculator",
      primary: true,
    },
    {
      id: 4,
      icon: "book-open" as const,
      label: "Receitas",
      route: "/recipes",
    },
    {
      id: 5,
      icon: "more-horizontal" as const,
      label: "Mais",
      route: "/more",
      comingSoon: true,
    },
  ];

  // Use require to import the navigation module instead of importing directly
  const handleNavigation = (route: string) => {
    const { router } = require("expo-router");
    router.push(route);
  };

  return (
    <View
      style={[
        styles.tabBar,
        {
          paddingBottom: insets?.bottom ? insets.bottom : 10,
          backgroundColor: activeColors.card,
          borderTopColor: "#333333",
        },
      ]}
    >
      {tabItems.map((item) => {
        // Check if current route matches this tab
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.tabItem,
              item.primary && styles.tabPrimaryItem,
              item.primary && { backgroundColor: activeColors.primary },
            ]}
            onPress={() => !item.comingSoon && handleNavigation(item.route)}
            disabled={item.comingSoon}
          >
            <Feather
              name={item.icon}
              size={item.primary ? 24 : 22}
              color={isActive ? activeColors.primary : item.primary ? "#ffffff" : "#888888"}
            />
            {!item.primary && (
              <Text style={[styles.tabLabel, { color: isActive ? activeColors.primary : "#888888" }]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    borderTopWidth: 1,
    height: 60,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPrimaryItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});
