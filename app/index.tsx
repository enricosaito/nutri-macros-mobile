// app/index.tsx
import React from "react";
import { View, ScrollView, TouchableOpacity, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Text } from "../components/ui/text";
import { Card, CardContent } from "../components/ui/card";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const { calculations } = useUserData();
  const { user } = useAuth();

  // Get the most recent calculation for header display
  const latestCalculation = calculations.length > 0 ? calculations[0] : null;

  // Function to get goal display text
  const getGoalText = (goalId: string) => {
    switch (goalId) {
      case "lose_weight":
        return "Perder Peso";
      case "maintain":
        return "Manter Peso";
      case "gain_muscle":
        return "Ganhar Músculo";
      default:
        return "Manter Peso";
    }
  };

  // Format date as DD/MM/YY
  const formatDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  };

  return (
    <View className="flex-1 bg-black">
      {/* Header */}
      <View className={`pt-[${insets.top}px]`}>
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <View className="w-9 h-9 rounded-full bg-[#2ac46e]/15 items-center justify-center">
              <Feather name="user" size={22} color="#2ac46e" />
            </View>
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">NutriMacros</Text>
          <TouchableOpacity>
            <View className="w-9 h-9 rounded-full bg-[#2ac46e]/15 items-center justify-center">
              <Feather name="bell" size={22} color="#2ac46e" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4">
        {/* Macros Card */}
        <Animated.View entering={FadeInDown.duration(600)} className="mt-4 mb-4">
          <Card>
            <CardContent>
              <Text className="text-base text-[#9ca29d] mb-2">Seus macros diários</Text>

              <View className="flex-row items-end mb-4">
                <Text className="text-4xl font-bold text-[#2ac46e] mr-1">{latestCalculation?.calories || "0"}</Text>
                <Text className="text-lg text-white mb-1">kcal</Text>
              </View>

              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-xl font-bold text-[#2ac46e] mb-1">{latestCalculation?.protein || "0"}g</Text>
                  <Text className="text-sm text-white">Proteína</Text>
                </View>

                <View className="items-center">
                  <Text className="text-xl font-bold text-[#2ac46e] mb-1">{latestCalculation?.carbs || "0"}g</Text>
                  <Text className="text-sm text-white">Carbos</Text>
                </View>

                <View className="items-center">
                  <Text className="text-xl font-bold text-[#4d8df6] mb-1">{latestCalculation?.fat || "0"}g</Text>
                  <Text className="text-sm text-white">Gorduras</Text>
                </View>
              </View>

              <View className="flex-row justify-between pt-2 border-t border-[#333333]">
                <Text className="text-sm text-[#9ca29d]">
                  {latestCalculation ? getGoalText(latestCalculation.goal) : "Manter Peso"}
                </Text>
                <Text className="text-sm text-[#9ca29d]">
                  {latestCalculation ? formatDate(latestCalculation.date) : formatDate(new Date().toISOString())}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Explore Recipes Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} className="mb-4">
          <Card>
            <CardContent>
              <Text className="text-xl font-bold text-white mb-2">Explore Receitas</Text>
              <Text className="text-sm text-[#9ca29d] mb-4">Encontre receitas que se encaixam nos seus macros</Text>

              <View className="flex-row items-center justify-between">
                <TouchableOpacity
                  className="py-2 px-4 border border-[#333333] rounded-full"
                  onPress={() => router.push("/recipes")}
                >
                  <Text className="text-sm text-[#2ac46e]">
                    Ver Receitas <Feather name="arrow-right" size={14} color="#2ac46e" />
                  </Text>
                </TouchableOpacity>

                <View className="w-10 h-10 items-center justify-center">
                  <Feather name="coffee" size={24} color="#2ac46e" />
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Extra space for tab bar */}
        <View className="h-20" />
      </ScrollView>

      {/* Custom Tab Bar */}
      <TabBar insets={insets} />
    </View>
  );
}

export default HomeScreen;
