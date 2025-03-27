import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SimpleTest } from "../components/simple-test";
import { theme } from "../styles/theme";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Macros</Text>
      <Text style={styles.subtitle}>Bem-vindo ao NutriMacros</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Seu assistente para calcular macronutrientes e acompanhar sua dieta.</Text>
      </View>

      <SimpleTest />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing[3],
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing[1],
  },
  subtitle: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.secondary,
    marginBottom: theme.spacing[3],
  },
  card: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing[3],
    borderRadius: theme.borderRadius,
    width: "100%",
    marginBottom: theme.spacing[3],
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  text: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    textAlign: "center",
  },
});
