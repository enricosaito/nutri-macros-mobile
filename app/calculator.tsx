import React from "react";
import { useRouter } from "expo-router";
import { Screen } from "../components/ui/screen";
import { Text } from "../components/ui/text";
import { View, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";

function CalculatorScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  // Navigation tabs (with calculator active)
  const renderTabBar = () => (
    <View style={[styles.tabBar, { backgroundColor: activeColors.card, borderTopColor: "#333333" }]}>
      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/")}>
        <Feather name="home" size={22} color={"#888888"} />
        <Text style={[styles.tabLabel, { color: "#888888" }]}>Início</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/profile")}>
        <Feather name="user" size={22} color={"#888888"} />
        <Text style={[styles.tabLabel, { color: "#888888" }]}>Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.tabItem, styles.tabPrimaryItem]} onPress={() => {}}>
        <Feather name="plus" size={24} color={"#ffffff"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} onPress={() => router.push("/recipes")}>
        <Feather name="book-open" size={22} color={"#888888"} />
        <Text style={[styles.tabLabel, { color: "#888888" }]}>Receitas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem} disabled={true}>
        <Feather name="more-horizontal" size={22} color={"#888888"} />
        <Text style={[styles.tabLabel, { color: "#888888" }]}>Mais</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Screen title="Calculadora" showHeader={true} scroll={true}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 100 }}>
          <Text style={{ fontSize: 24, color: activeColors.text, marginBottom: 16 }}>Calculadora de Macros</Text>

          <Text color="muted" style={{ textAlign: "center", marginBottom: 32 }}>
            Aqui você poderá calcular suas necessidades de macronutrientes com base em seus dados físicos e objetivos.
          </Text>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: activeColors.primary }]}
            onPress={() => router.push("/calculator")}
          >
            <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Começar Cálculo</Text>
          </TouchableOpacity>
        </View>
      </Screen>

      {renderTabBar()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
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

export default CalculatorScreen;
