import React, { useState } from "react";
import { View } from "react-native";
import {
  Screen,
  Text,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  MacroDisplay,
} from "../components";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [calculatedMacros, setCalculatedMacros] = useState({
    protein: 150,
    carbs: 200,
    fat: 60,
    calories: 1940,
  });

  return (
    <Screen title="NutriMacros" scroll={true} showHeader={true}>
      <View className="py-4 space-y-6">
        <Text variant="h3" className="text-center">
          Calculadora de Macronutrientes
        </Text>

        <Text color="muted" className="text-center px-4">
          Calcule suas necessidades diárias de calorias e macronutrientes baseado em seus objetivos.
        </Text>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent className="items-center justify-center py-6">
            <View className="mb-4 items-center">
              <Text variant="h2" className="text-primary-600">
                {calculatedMacros.calories}
              </Text>
              <Text variant="caption" color="muted">
                Calorias diárias
              </Text>
            </View>
          </CardContent>
          <CardFooter>
            <Button onPress={() => router.push("/calculator")} variant="primary" fullWidth>
              Calcular Novamente
            </Button>
          </CardFooter>
        </Card>

        <MacroDisplay
          macros={{
            protein: calculatedMacros.protein,
            carbs: calculatedMacros.carbs,
            fat: calculatedMacros.fat,
          }}
          calories={calculatedMacros.calories}
          showPercentages={true}
        />

        <Card>
          <CardHeader>
            <CardTitle>Sobre NutriMacros</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-2">
              O NutriMacros é uma calculadora de macronutrientes desenvolvida para ajudar você a alcançar seus objetivos
              de fitness.
            </Text>
            <Text>
              Baseado em informações científicas, o app calcula suas necessidades calóricas e distribuição ideal de
              proteínas, carboidratos e gorduras.
            </Text>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}
