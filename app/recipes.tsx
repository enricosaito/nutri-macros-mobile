// app/recipes.tsx
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent, Button } from "../components";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";

function RecipesScreen() {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <Screen title="Receitas" showHeader={true} scroll={true} animate={false}>
      <View style={{ paddingVertical: spacing[6], alignItems: "center" }}>
        <Text
          variant="h2"
          style={{
            textAlign: "center",
            marginBottom: spacing[2],
            color: activeColors.text,
          }}
        >
          Receitas em Breve
        </Text>

        <Text
          variant="body"
          color="muted"
          style={{
            textAlign: "center",
            marginBottom: spacing[6],
            paddingHorizontal: spacing[4],
          }}
        >
          Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
        </Text>

        <Card>
          <CardHeader>
            <CardTitle>O que esperar</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={{ marginBottom: spacing[3] }}>• Receitas personalizadas com base nos seus macros</Text>
            <Text style={{ marginBottom: spacing[3] }}>• Filtros por ingredientes disponíveis</Text>
            <Button
              title="Inscreva-se para notificações"
              variant="outline"
              style={{ marginTop: spacing[4] }}
              onPress={() => {}}
            />
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}

export default RecipesScreen;
