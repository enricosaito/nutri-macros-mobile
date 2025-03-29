// app/results.tsx
import React from "react";
import { View, Share, ScrollView, StyleSheet } from "react-native";
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
import { useTheme } from "../src/context/ThemeContext";

export default function ResultsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
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

  return (
    <Screen
      title="Resultados"
      showHeader={true}
      headerRight={
        <Button
          title="Compartilhar"
          variant="ghost"
          onPress={handleShare}
          leftIcon={<Feather name="share-2" size={18} color={theme.colors.primary} />}
        />
      }
      scroll={true}
    >
      <Animated.View
        entering={FadeInUp.delay(100).duration(500)}
        style={{
          marginTop: theme.spacing[4],
          marginBottom: theme.spacing[4],
          alignItems: "center",
        }}
      >
        <Text variant="h2" style={{ marginBottom: theme.spacing[2], textAlign: "center" }}>
          Seus Macros Diários
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.mutedForeground,
            marginBottom: theme.spacing[4],
          }}
        >
          Baseados nas suas informações e objetivos
        </Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={{ marginBottom: theme.spacing[6] }}>
        <Card>
          <CardHeader>
            <CardTitle>Necessidade Calórica</CardTitle>
          </CardHeader>
          <CardContent style={{ alignItems: "center", paddingVertical: theme.spacing[6] }}>
            <View style={{ alignItems: "center" }}>
              <Text
                variant="h1"
                style={{
                  color: theme.colors.primary,
                  marginBottom: theme.spacing[2],
                }}
              >
                {calories}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.lg,
                  color: theme.colors.mutedForeground,
                }}
              >
                Calorias diárias
              </Text>
            </View>
          </CardContent>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(500)} style={{ marginBottom: theme.spacing[6] }}>
        <MacroDisplay macros={macros} calories={calories} showPercentages={true} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(500)} style={{ marginBottom: theme.spacing[6] }}>
        <Card>
          <CardHeader>
            <CardTitle>Dicas de Alimentação</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={{ marginBottom: theme.spacing[4] }}>
              Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
            </Text>

            {getTips().map((category, index) => (
              <View key={index} style={{ marginBottom: theme.spacing[4] }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.medium,
                    marginBottom: theme.spacing[2],
                  }}
                >
                  {category.title}:
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {category.items.map((item, itemIndex) => (
                    <View
                      key={itemIndex}
                      style={{
                        backgroundColor: theme.colors.secondary,
                        borderRadius: theme.radius.full,
                        paddingHorizontal: theme.spacing[3],
                        paddingVertical: 4,
                        marginRight: theme.spacing[2],
                        marginBottom: theme.spacing[2],
                      }}
                    >
                      <Text variant="caption">{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(900).duration(500)} style={{ marginBottom: theme.spacing[6] }}>
        <Card>
          <CardHeader>
            <CardTitle>Próximos Passos</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={{ marginTop: theme.spacing[2] }}>
              {[
                "Distribua suas refeições ao longo do dia",
                "Priorize alimentos integrais e não processados",
                "Mantenha-se hidratado(a) bebendo água suficiente",
                "Monitore seu progresso semanalmente",
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
          <CardFooter style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              title="Recalcular"
              variant="outline"
              onPress={() => router.back()}
              style={{ flex: 1, marginRight: theme.spacing[2] }}
            />
            <Button
              title="Salvar"
              variant="default"
              onPress={() => router.push("/")}
              style={{ flex: 1, marginLeft: theme.spacing[2] }}
            />
          </CardFooter>
        </Card>
      </Animated.View>
    </Screen>
  );
}
