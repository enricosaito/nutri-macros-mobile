import React from "react";
import { View, TouchableOpacity, useColorScheme } from "react-native";
import { usePathname } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text } from "./ui/text";

interface TabBarProps {
  insets?: { bottom: number };
}

export function TabBar({ insets }: TabBarProps) {
  const pathname = usePathname();
  const isDark = useColorScheme() === "dark";

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
      className={`flex-row border-t h-[60px] ${isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"}`}
      style={{
        paddingBottom: insets?.bottom ? insets.bottom : 10,
      }}
    >
      {tabItems.map((item) => {
        // Check if current route matches this tab
        const isActive = pathname === item.route;

        return (
          <TouchableOpacity
            key={item.id}
            className={`flex-1 items-center justify-center ${
              item.primary ? "w-[60px] h-[60px] rounded-full -mt-[30px]" : ""
            } ${item.primary && isDark ? "bg-[#2ac46e]" : item.primary ? "bg-[#22c069]" : ""}`}
            onPress={() => !item.comingSoon && handleNavigation(item.route)}
            disabled={item.comingSoon}
          >
            <Feather
              name={item.icon}
              size={item.primary ? 24 : 22}
              color={isActive ? (isDark ? "#2ac46e" : "#22c069") : item.primary ? "#ffffff" : "#888888"}
            />
            {!item.primary && (
              <Text
                className={`text-xs mt-0.5 ${
                  isActive ? (isDark ? "text-[#2ac46e]" : "text-[#22c069]") : "text-[#888888]"
                }`}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
