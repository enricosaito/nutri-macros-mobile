// app/index.tsx (simplified version to fix style issues)
import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Text } from "../components/ui/text";
import { Card, CardContent } from "../components/ui/card";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
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
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.push("/profile")}>
            <View style={styles.profileIcon}>
              <Feather name="user" size={22} color={activeColors.primary} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NutriMacros</Text>
          <TouchableOpacity>
            <View style={styles.notificationIcon}>
              <Feather name="bell" size={22} color={activeColors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Macros Card */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.macroCardContainer}>
          <Card>
            <CardContent>
              <Text style={styles.macroTitle}>Seus macros diários</Text>

              <View style={styles.calorieContainer}>
                <Text style={styles.calorieValue}>{latestCalculation?.calories || "0"}</Text>
                <Text style={styles.calorieUnit}>kcal</Text>
              </View>

              <View style={styles.macroValues}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroItemValue}>{latestCalculation?.protein || "0"}g</Text>
                  <Text style={styles.macroItemLabel}>Proteína</Text>
                </View>

                <View style={styles.macroItem}>
                  <Text style={[styles.macroItemValue, { color: "#2ac46e" }]}>{latestCalculation?.carbs || "0"}g</Text>
                  <Text style={styles.macroItemLabel}>Carbos</Text>
                </View>

                <View style={styles.macroItem}>
                  <Text style={[styles.macroItemValue, { color: "#4d8df6" }]}>{latestCalculation?.fat || "0"}g</Text>
                  <Text style={styles.macroItemLabel}>Gorduras</Text>
                </View>
              </View>

              <View style={styles.macroFooter}>
                <Text style={styles.goalText}>
                  {latestCalculation ? getGoalText(latestCalculation.goal) : "Manter Peso"}
                </Text>
                <Text style={styles.dateText}>
                  {latestCalculation ? formatDate(latestCalculation.date) : formatDate(new Date().toISOString())}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Explore Recipes Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.exploreCardContainer}>
          <Card>
            <CardContent>
              <Text style={styles.exploreTitle}>Explore Receitas</Text>
              <Text style={styles.exploreSubtitle}>Encontre receitas que se encaixam nos seus macros</Text>

              <View style={styles.exploreContent}>
                <TouchableOpacity style={styles.recipeButton} onPress={() => router.push("/recipes")}>
                  <Text style={styles.recipeButtonText}>
                    Ver Receitas <Feather name="arrow-right" size={14} color="#2ac46e" />
                  </Text>
                </TouchableOpacity>

                <View style={styles.coffeeIconContainer}>
                  <Feather name="coffee" size={24} color="#2ac46e" />
                </View>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Extra space for tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Custom Tab Bar */}
      <TabBar insets={insets} />
    </View>
  );
}

// Simplified styles without complex typing
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(42, 196, 110, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  notificationIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(42, 196, 110, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  macroCardContainer: {
    marginBottom: 16,
    marginTop: 16,
  },
  macroTitle: {
    fontSize: 16,
    marginBottom: 8,
    color: "#9ca29d",
  },
  calorieContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  calorieValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#2ac46e",
    marginRight: 5,
  },
  calorieUnit: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
  },
  macroValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  macroItem: {
    alignItems: "center",
  },
  macroItemValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ac46e",
    marginBottom: 4,
  },
  macroItemLabel: {
    fontSize: 14,
    color: "#ffffff",
  },
  macroFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  goalText: {
    fontSize: 14,
    color: "#9ca29d",
  },
  dateText: {
    fontSize: 14,
    color: "#9ca29d",
  },
  exploreCardContainer: {
    marginBottom: 16,
  },
  exploreTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  exploreSubtitle: {
    fontSize: 14,
    color: "#9ca29d",
    marginBottom: 16,
  },
  exploreContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recipeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 20,
  },
  recipeButtonText: {
    color: "#2ac46e",
    fontSize: 14,
  },
  coffeeIconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
