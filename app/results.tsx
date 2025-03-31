import React from "react";
import { View, Share, StyleSheet, useColorScheme, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Text, Button, Card, CardContent, CardHeader, CardTitle, CardFooter, MacroDisplay } from "../components";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

function ResultsScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
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
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={[styles.header, { backgroundColor: activeColors.card }]}>
        <View style={styles.headerContent}>
          <Text variant="h3" style={{ color: activeColors.text }}>
            Resultados
          </Text>
          <Button
            variant="ghost"
            onPress={handleShare}
            leftIcon={<Feather name="share-2" size={18} color={activeColors.primary} />}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: spacing[4] }}>
        <Animated.View
          entering={FadeInUp.delay(100).duration(500)}
          style={{
            marginTop: spacing[2],
            marginBottom: spacing[4],
            alignItems: "center",
          }}
        >
          <Text variant="h2" style={{ marginBottom: spacing[2], textAlign: "center", color: activeColors.text }}>
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
            Baseados nas suas informações e objetivo: <Text color="primary">{getGoalTitle()}</Text>
          </Text>
        </Animated.View>

        <MacroDisplay macros={macros} calories={calories} showPercentages={true} />

        <Animated.View entering={FadeInDown.delay(400).duration(500)} style={{ marginVertical: spacing[6] }}>
          <Card style={{ backgroundColor: activeColors.card }}>
            <CardHeader>
              <CardTitle>Dicas de Alimentação</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ marginBottom: spacing[4], color: activeColors.text }}>
                Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
              </Text>

              {getTips().map((category, index) => (
                <View key={`category-${index}`} style={{ marginBottom: spacing[4] }}>
                  <Text
                    style={{
                      fontSize: colors.typography?.fontSize.lg || 18,
                      fontWeight: "500",
                      marginBottom: spacing[2],
                      color: activeColors.text,
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
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={{ marginBottom: spacing[6] }}>
          <Card style={{ backgroundColor: activeColors.card }}>
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
                    <Text style={{ flex: 1, color: activeColors.text }}>{item}</Text>
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
                onPress={handleSave}
                loading={savingCalculation}
                style={{ flex: 1, marginLeft: spacing[2] }}
              />
            </CardFooter>
          </Card>
        </Animated.View>

        {/* Extra space at the bottom for the tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>

      <TabBar insets={insets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scrollView: {
    flex: 1,
  },
});

export default ResultsScreen;
