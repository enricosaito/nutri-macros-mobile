import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function RecipesScreen() {
  return (
    <Screen title="Receitas" showHeader={true} scroll={true}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Feather name="book-open" size={32} color={theme.colors.primary} />
        </View>
        <Text variant="h2" style={styles.title}>
          Receitas em Breve
        </Text>
        <Text style={styles.subtitle}>
          Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
        </Text>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>O que esperar</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Receitas personalizadas com base nos seus macros</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Filtros por ingredientes disponíveis</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Informações nutricionais completas</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Salve suas receitas favoritas</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  title: {
    textAlign: "center",
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  card: {
    width: "100%",
  },
  featureList: {
    marginTop: theme.spacing.sm,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.sm,
  },
  featureText: {
    flex: 1,
  },
});
