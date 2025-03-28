import React from "react";
import { View, Share, ScrollView } from "react-native";
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
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

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

  const getTips = () => {
    // Returning simple tips for now, but ideally these would be based on the calculated macros
    return [
      {
        title: "Fontes de Proteína",
        items: ["Frango", "Ovos", "Peixe", "Tofu", "Iogurte grego", "Whey protein"],
      },
      {
        title: "Fontes de Carboidratos",
        items: ["Arroz integral", "Batata-doce", "Aveia", "Frutas", "Quinoa", "Legumes"],
      },
      {
        title: "Fontes de Gorduras",
        items: ["Abacate", "Azeite de oliva", "Castanhas", "Sementes", "Salmão", "Ovos"],
      },
    ];
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
      <ScrollView className="py-4">
        <Animated.View entering={FadeInUp.delay(100).duration(500)}>
          <Text variant="h2" className="text-center mb-2">
            Seus Macros Diários
          </Text>
          <Text className="text-center text-muted-foreground mb-4">Baseados nas suas informações e objetivos</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Card className="mb-6">
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
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)}>
          <MacroDisplay macros={macros} calories={calories} showPercentages={true} className="mb-6" />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(500)}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Dicas de Alimentação</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4">
                Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
              </Text>

              {getTips().map((category, index) => (
                <View key={index} className="mb-4">
                  <Text variant="subtitle" className="mb-2">
                    {category.title}:
                  </Text>
                  <View className="flex-row flex-wrap">
                    {category.items.map((item, itemIndex) => (
                      <View key={itemIndex} className="bg-secondary mr-2 mb-2 px-3 py-1 rounded-full">
                        <Text variant="caption">{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(500)}>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <View className="space-y-3">
                <View className="flex-row">
                  <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                  <Text className="flex-1">Distribua suas refeições ao longo do dia</Text>
                </View>
                <View className="flex-row">
                  <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                  <Text className="flex-1">Priorize alimentos integrais e não processados</Text>
                </View>
                <View className="flex-row">
                  <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                  <Text className="flex-1">Mantenha-se hidratado(a) bebendo água suficiente</Text>
                </View>
                <View className="flex-row">
                  <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                  <Text className="flex-1">Monitore seu progresso semanalmente</Text>
                </View>
              </View>
            </CardContent>
            <CardFooter className="flex-row space-x-3 pt-4">
              <Button variant="outline" onPress={() => router.back()} className="flex-1">
                Recalcular
              </Button>
              <Button variant="primary" onPress={() => router.push("/")} className="flex-1">
                Salvar
              </Button>
            </CardFooter>
          </Card>
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}
