import React from "react";
import { View, Share } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import {
  Screen,
  Text,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  MacroDisplay,
} from "../components";

export default function ResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    protein: string;
    carbs: string;
    fat: string;
    calories: string;
  }>();

  const macros = {
    protein: parseInt(params.protein || "0", 10),
    carbs: parseInt(params.carbs || "0", 10),
    fat: parseInt(params.fat || "0", 10),
  };

  const calories = parseInt(params.calories || "0", 10);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Meus macros diários calculados pelo NutriMacros:\n\n🔥 Calorias: ${calories} kcal\n💪 Proteína: ${macros.protein}g\n🍚 Carboidratos: ${macros.carbs}g\n🥑 Gorduras: ${macros.fat}g`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Screen
      title="Resultados"
      showHeader={true}
      headerRight={
        <Button variant="ghost" onPress={handleShare} leftIcon={<Feather name="share-2" size={18} color="#0891b2" />}>
          Compartilhar
        </Button>
      }
      scroll={true}
    >
      <View className="space-y-6 py-4">
        <Text variant="h2" className="text-center">
          Seus Macros Diários
        </Text>

        <Card>
          <CardHeader>
            <CardTitle>Necessidade Calórica</CardTitle>
          </CardHeader>
          <CardContent className="items-center justify-center py-6">
            <View className="mb-2 items-center">
              <Text variant="h1" className="text-primary-600">
                {calories}
              </Text>
              <Text variant="subtitle" color="muted">
                Calorias diárias
              </Text>
            </View>
          </CardContent>
        </Card>

        <MacroDisplay macros={macros} calories={calories} showPercentages={true} />

        <Card>
          <CardHeader>
            <CardTitle>Dicas de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-3">
              Use esses valores como referência para montar seu plano alimentar diário. Lembre-se que é importante:
            </Text>
            <View className="space-y-2">
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Distribuir suas refeições ao longo do dia</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Priorizar alimentos integrais e não processados</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Manter-se hidratado(a) bebendo água suficiente</Text>
              </View>
            </View>
          </CardContent>
          <CardFooter className="flex-row space-x-3">
            <Button variant="outline" onPress={() => router.back()} className="flex-1">
              Recalcular
            </Button>
            <Button variant="primary" onPress={() => router.push("/")} className="flex-1">
              Salvar
            </Button>
          </CardFooter>
        </Card>
      </View>
    </Screen>
  );
}
