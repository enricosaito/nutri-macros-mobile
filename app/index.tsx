import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { SimpleTest } from "../components/simple-test";
import { createStyles } from "../styles/utils";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>NutriMacros</Text>
        <Text style={styles.subtitle}>Calculadora de Macronutrientes</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo ao NutriMacros</Text>
          <Text style={styles.cardText}>
            Calcule suas necessidades diárias de calorias e macronutrientes baseado em seus objetivos.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/calculator")}>
              <Text style={styles.buttonText}>Começar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <SimpleTest />
      </View>
    </ScrollView>
  );
}

// Using the theme system for consistent styling
const styles = createStyles((theme) => ({
  scrollView: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: theme.spacing[5],
  },
  title: {
    fontSize: theme.typography.fontSizes["3xl"],
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: "center",
    marginTop: theme.spacing[12],
    marginBottom: theme.spacing[2],
    color: theme.colors.primary[600],
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.lg,
    textAlign: "center",
    marginBottom: theme.spacing[8],
    color: theme.colors.muted.foreground,
  },
  card: {
    ...theme.presets.card,
    marginBottom: theme.spacing[5],
  },
  cardTitle: {
    fontSize: theme.typography.fontSizes.xl,
    fontWeight: theme.typography.fontWeights.bold,
    marginBottom: theme.spacing[3],
    color: theme.colors.foreground,
  },
  cardText: {
    fontSize: theme.typography.fontSizes.base,
    lineHeight: theme.typography.lineHeights.relaxed * theme.typography.fontSizes.base,
    marginBottom: theme.spacing[5],
    color: theme.colors.foreground,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    ...theme.presets.button.primary,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: theme.typography.fontWeights.bold,
    textAlign: "center",
    fontSize: theme.typography.fontSizes.base,
  },
}));
