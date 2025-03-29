// components/simple-test.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../src/styles/theme";

export function SimpleTest() {
  // Use a simple View and Text without custom styling
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Sistema de Temas</Text>
      <Text style={styles.text}>Este componente está usando o sistema de temas simplificado</Text>
    </View>
  );
}

// Simplified styling to avoid type issues
const styles = StyleSheet.create({
  container: {
    padding: 12,
    margin: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
  },
});
