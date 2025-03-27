import React from "react";
import { Text, View, Button } from "react-native";
import { createStyles } from "@/styles/utils";
import { useTheme } from "@/styles/theme-context";
import { SimpleTest } from "@/components/simple-test";

export default function Index() {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  const styles = stylesWithTheme(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Macros</Text>
      <Text style={styles.subtitle}>Bem-vindo ao NutriMacros</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Seu assistente para calcular macronutrientes e acompanhar sua dieta.</Text>
      </View>

      <Button title={isDarkMode ? "Mudar para Tema Claro" : "Mudar para Tema Escuro"} onPress={toggleTheme} />

      <SimpleTest />
    </View>
  );
}

const stylesWithTheme = createStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing[4],
  },
  title: {
    fontSize: theme.typography.fontSize.xxl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.secondary,
    marginBottom: theme.spacing[4],
  },
  card: {
    backgroundColor: theme.colors.muted.DEFAULT,
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.md,
    width: "100%",
    marginBottom: theme.spacing[4],
  },
  text: {
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    textAlign: "center",
  },
}));
