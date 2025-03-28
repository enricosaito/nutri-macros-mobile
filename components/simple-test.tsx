import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../styles/theme";

export function SimpleTest() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Sistema de Temas</Text>
      <Text style={styles.text}>Este componente está usando o sistema de temas simplificado</Text>
    </View>
  );
}

// Estilos sem usar o sistema de temas dinâmico por enquanto
const styles = StyleSheet.create({
  container: {
    padding: theme.spacing[3],
    margin: theme.spacing[3],
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius,
  },
  title: {
    fontSize: theme.fontSize.large,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: theme.spacing[1],
  },
  text: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
  },
});
