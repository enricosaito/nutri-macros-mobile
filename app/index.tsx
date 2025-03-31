import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, useColorScheme, StatusBar, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../components/ui/text";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Screen } from "../components/ui/screen";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing, radius } from "../src/styles/globalStyles";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";

function HomeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const { calculations, loading: calculationsLoading } = useUserData();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();

  // Get the most recent calculation for header display
  const latestCalculation = calculations.length > 0 ? calculations[0] : null;

  const tabItems = [
    {
      id: 1,
      icon: "home",
      label: "Início",
      route: "/",
      active: true,
    },
    {
      id: 2,
      icon: "user",
      label: "Perfil",
      route: "/profile",
    },
    {
      id: 3,
      icon: "plus",
      label: "",
      route: "/calculator",
      primary: true,
    },
    {
      id: 4,
      icon: "book-open",
      label: "Receitas",
      route: "/recipes",
    },
    {
      id: 5,
      icon: "more-horizontal",
      label: "Mais",
      route: "/more",
      comingSoon: true,
    },
  ];

  // Function to get goal display text
  const getGoalText = (goalId) => {
    switch (goalId) {
      case "lose_weight":
        return "Perder Peso";
      case "maintain":
        return "Manter Peso";
      case "gain_muscle":
        return "Ganhar Músculo";
      default:
        return "Manter Peso"; // Default value
    }
  };

  // Format date as DD/MM/YY
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getFullYear()
      .toString()
      .slice(2)}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={activeColors.background} />

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
      <View style={styles.content}>
        {/* Macros Card */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.macroCardContainer}>
          <Card style={[styles.macroCard, { backgroundColor: activeColors.card, borderColor: "#333333" }]}>
            <CardContent style={{ padding: spacing[4] }}>
              <Text style={[styles.macroTitle, { color: "#9ca29d" }]}>Seus macros diários</Text>

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
                <Text style={styles.goalText}>{getGoalText(latestCalculation?.goal)}</Text>
                <Text style={styles.dateText}>
                  {formatDate(latestCalculation?.date) || formatDate(new Date().toISOString())}
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        {/* Explore Recipes Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.exploreCardContainer}>
          <Card style={[styles.exploreCard, { backgroundColor: activeColors.card, borderColor: "#333333" }]}>
            <CardContent style={{ padding: spacing[4] }}>
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
      </View>

      {/* Custom Tab Bar */}
      <View style={[styles.tabBar, { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }]}>
        {tabItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.tabItem, item.primary && styles.tabPrimaryItem]}
            onPress={() => !item.comingSoon && router.push(item.route)}
            disabled={item.comingSoon}
          >
            <Feather
              name={item.icon}
              size={item.primary ? 24 : 22}
              color={item.active ? activeColors.primary : item.primary ? "#ffffff" : "#888888"}
            />
            {!item.primary && (
              <Text style={[styles.tabLabel, { color: item.active ? activeColors.primary : "#888888" }]}>
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  macroCard: {
    borderRadius: 16,
    borderWidth: 1,
  },
  macroTitle: {
    fontSize: 16,
    marginBottom: 8,
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
  exploreCard: {
    borderRadius: 16,
    borderWidth: 1,
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
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#121212",
    borderTopWidth: 1,
    borderTopColor: "#333333",
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
    backgroundColor: "#2ac46e",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -30,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
  },
});

export default HomeScreen;
