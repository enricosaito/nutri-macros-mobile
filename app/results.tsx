// app/results.tsx
import React from "react";
import { View, Share, StyleSheet, useColorScheme } from "react-native";
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
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import { useAnimationsEnabled } from "../src/utils/animation";

function ResultsScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

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

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <Screen
      title="Resultados"
      showHeader={true}
      headerRight={
        <Button
          variant="ghost"
          onPress={handleShare}
          leftIcon={<Feather name="share-2" size={18} color={activeColors.primary} />}
        />
      }
      scroll={true}
    >
      <AnimatedContainer
        entering={animationsEnabled ? FadeInUp.delay(100).duration(500) : undefined}
        style={{
          marginTop: spacing[4],
          marginBottom: spacing[4],
          alignItems: "center",
        }}
      >
        <Text variant="h2" style={{ marginBottom: spacing[2], textAlign: "center" }}>
          Seus Macros Diários
        </Text>
        <Text
          variant="body"
          color="muted"
          style={{
            textAlign: "center",
            marginBottom: spacing[4],
          }}
        >
          Baseados nas suas informações e objetivos
        </Text>
      </AnimatedContainer>

      <MacroDisplay macros={macros} calories={calories} showPercentages={true} />

      <AnimatedContainer
        entering={animationsEnabled ? FadeInDown.delay(400).duration(500) : undefined}
        style={{ marginVertical: spacing[6] }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Dicas de Alimentação</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={{ marginBottom: spacing[4] }}>
              Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
            </Text>

            {getTips().map((category, index) => (
              <View key={`category-${index}`} style={{ marginBottom: spacing[4] }}>
                <Text
                  style={{
                    fontSize: colors.typography?.fontSize.lg || 18,
                    fontWeight: "500",
                    marginBottom: spacing[2],
                  }}
                >
                  {category.title}:
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {category.items.map((item, itemIndex) => (
                    <View
                      key={`item-${index}-${itemIndex}`}
                      style={{
                        backgroundColor: activeColors.secondary,
                        borderRadius: 9999,
                        paddingHorizontal: spacing[3],
                        paddingVertical: 8,
                        marginRight: spacing[2],
                        marginBottom: spacing[2],
                      }}
                    >
                      <Text variant="caption" style={{ color: activeColors.foreground }}>
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      </AnimatedContainer>

      <AnimatedContainer
        entering={animationsEnabled ? FadeInDown.delay(600).duration(500) : undefined}
        style={{ marginBottom: spacing[6] }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ marginTop: spacing[2] }}>
              {[
                "Distribua suas refeições ao longo do dia",
                "Priorize alimentos integrais e não processados",
                "Mantenha-se hidratado(a) bebendo água suficiente",
                "Monitore seu progresso semanalmente",
              ].map((item, index) => (
                <View
                  key={`step-${index}`}
                  style={{
                    flexDirection: "row",
                    marginBottom: spacing[3],
                  }}
                >
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 12,
                      backgroundColor: activeColors.primary,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: spacing[3],
                      marginTop: 2,
                    }}
                  >
                    <Feather name="check" size={14} color="white" />
                  </View>
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          </CardContent>
          <CardFooter style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              title="Recalcular"
              variant="outline"
              onPress={() => router.back()}
              style={{ flex: 1, marginRight: spacing[2] }}
            />
            <Button
              title="Salvar"
              variant="default"
              onPress={() => router.push("/")}
              style={{ flex: 1, marginLeft: spacing[2] }}
            />
          </CardFooter>
        </Card>
      </AnimatedContainer>
    </Screen>
  );
}

export default ResultsScreen;
