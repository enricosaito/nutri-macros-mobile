// app/recipes.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../src/context/ThemeContext";

export default function RecipesScreen() {
  const { theme } = useTheme();

  return (
    <Screen title="Receitas" showHeader={true} scroll={true}>
      <View style={{ paddingVertical: theme.spacing[6], alignItems: "center" }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.secondary,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing[4],
          }}
        >
          <Feather name="book-open" size={32} color={theme.colors.primary} />
        </View>
        <Text
          variant="h2"
          style={{
            textAlign: "center",
            marginBottom: theme.spacing[2],
          }}
        >
          Receitas em Breve
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.mutedForeground,
            marginBottom: theme.spacing[6],
            paddingHorizontal: theme.spacing.xl,
          }}
        >
          Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
        </Text>

        <Card style={{ width: "100%" }}>
          <CardHeader>
            <CardTitle>O que esperar</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ marginTop: theme.spacing[2] }}>
              {[
                "Receitas personalizadas com base nos seus macros",
                "Filtros por ingredientes disponíveis",
                "Informações nutricionais completas",
                "Salve suas receitas favoritas",
              ].map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    marginBottom: theme.spacing[3],
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.primary,
                      marginTop: 8,
                      marginRight: theme.spacing[2],
                    }}
                  />
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}
