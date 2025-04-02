// app/results.tsx
import React from "react";
import { View, Share, useColorScheme, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text, Button, Card, CardContent, CardHeader, CardTitle, CardFooter, MacroDisplay } from "../components";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const params = useLocalSearchParams<{
    protein: string;
    carbs: string;
    fat: string;
    calories: string;
    goal: string;
  }>();

  const { addCalculation, loading: savingCalculation } = useUserData();
  const { user } = useAuth();

  const macros = {
    protein: parseInt(params.protein || "0", 10),
    carbs: parseInt(params.carbs || "0", 10),
    fat: parseInt(params.fat || "0", 10),
  };

  const calories = parseInt(params.calories || "0", 10);
  const goal = params.goal || "maintain";

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Meus macros diários calculados pelo NutriMacros:\n\n🔥 Calorias: ${calories} kcal\n💪 Proteína: ${macros.protein}g\n🍚 Carboidratos: ${macros.carbs}g\n🥑 Gorduras: ${macros.fat}g`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    await addCalculation({
      date: new Date().toISOString(),
      calories,
      protein: macros.protein,
      carbs: macros.carbs,
      fat: macros.fat,
      goal,
    });

    // Navigate back to home page after saving
    router.push("/");
  };

  const getTips = () => {
    // Simple tips based on the calculated macros
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

  const getGoalTitle = () => {
    switch (goal) {
      case "lose_weight":
        return "Perder Peso";
      case "maintain":
        return "Manter Peso";
      case "gain_muscle":
        return "Ganhar Músculo";
      default:
        return "";
    }
  };

  return (
    <View className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"}`}>
      <View
        className={`px-4 py-4 pt-[50px] border-b flex-row items-center justify-between ${
          isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"
        }`}
      >
        <Text variant="h3">Resultados</Text>
        <Button
          variant="ghost"
          onPress={handleShare}
          leftIcon={<Feather name="share-2" size={18} color={isDark ? "#2ac46e" : "#22c069"} />}
        />
      </View>

      <ScrollView className="flex-1 px-4">
        <Animated.View entering={FadeInUp.delay(100).duration(500)} className="mt-2 mb-4 items-center">
          <Text variant="h2" className="mb-2 text-center">
            Seus Macros Diários
          </Text>
          <Text variant="body" color="muted" className="text-center mb-4">
            Baseados nas suas informações e objetivo: <Text color="primary">{getGoalTitle()}</Text>
          </Text>
        </Animated.View>

        <MacroDisplay macros={macros} calories={calories} showPercentages={true} />

        <Animated.View entering={FadeInDown.delay(400).duration(500)} className="my-6">
          <Card>
            <CardHeader>
              <CardTitle>Dicas de Alimentação</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="mb-4">
                Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
              </Text>

              {getTips().map((category, index) => (
                <View key={`category-${index}`} className="mb-4">
                  <Text className="text-lg font-medium mb-2">{category.title}:</Text>
                  <View className="flex-row flex-wrap">
                    {category.items.map((item, itemIndex) => (
                      <View
                        key={`item-${index}-${itemIndex}`}
                        className={`${isDark ? "bg-[#1e231e]" : "bg-[#edf4ee]"} rounded-full px-3 py-2 mr-2 mb-2`}
                      >
                        <Text variant="caption" className={isDark ? "text-white" : "text-[#151915]"}>
                          {item}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <View className="mt-2">
                {[
                  "Distribua suas refeições ao longo do dia",
                  "Priorize alimentos integrais e não processados",
                  "Mantenha-se hidratado(a) bebendo água suficiente",
                  "Monitore seu progresso semanalmente",
                ].map((item, index) => (
                  <View key={`step-${index}`} className="flex-row mb-3">
                    <View
                      className={`w-6 h-6 rounded-full ${
                        isDark ? "bg-[#2ac46e]" : "bg-[#22c069]"
                      } items-center justify-center mr-3 mt-0.5`}
                    >
                      <Feather name="check" size={14} color="white" />
                    </View>
                    <Text className="flex-1">{item}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
            <CardFooter className="flex-row justify-between">
              <Button title="Recalcular" variant="outline" onPress={() => router.back()} className="flex-1 mr-2" />
              <Button
                title="Salvar"
                variant="default"
                onPress={handleSave}
                loading={savingCalculation}
                className="flex-1 ml-2"
              />
            </CardFooter>
          </Card>
        </Animated.View>

        {/* Extra space at the bottom for the tab bar */}
        <View className="h-20" />
      </ScrollView>

      <TabBar insets={insets} />
    </View>
  );
}

export default ResultsScreen;
