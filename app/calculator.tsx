// app/calculator.tsx
import React, { useState } from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Screen, Text, Button, Card, CardContent, CardHeader, CardTitle } from "../components";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";

function CalculatorScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <Screen title="Calculadora" showHeader={true} scroll={true} animate={false}>
      <View style={{ marginBottom: spacing[6] }}>
        <Text variant="body" color="muted" style={{ textAlign: "center" }}>
          Preencha suas informações para calcular suas necessidades diárias de macronutrientes.
        </Text>
      </View>

      <Card style={{ marginBottom: spacing[4] }}>
        <CardHeader>
          <CardTitle>Sexo Biológico</CardTitle>
        </CardHeader>
        <CardContent>
          <View style={{ flexDirection: "row", gap: spacing[4] }}>
            <Button title="Masculino" variant="default" onPress={() => {}} style={{ flex: 1 }} />
            <Button title="Feminino" variant="outline" onPress={() => {}} style={{ flex: 1 }} />
          </View>
        </CardContent>
      </Card>

      <Button
        title="Calcular Macros"
        size="lg"
        onPress={() => router.push("/results")}
        style={{ marginBottom: spacing[6] }}
        fullWidth
      />
    </Screen>
  );
}

export default CalculatorScreen;
