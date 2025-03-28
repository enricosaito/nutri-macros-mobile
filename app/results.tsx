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
import { theme } from "../styles/theme";

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
        <Button
          title="Compartilhar"
          variant="ghost"
          onPress={handleShare}
          leftIcon={<Feather name="share-2" size={18} color={theme.colors.primary} />}
        />
      }
      scroll={false}
      padding={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(100).duration(500)} style={styles.header}>
          <Text variant="h2" style={styles.headerTitle}>
            Seus Macros Diários
          </Text>
          <Text style={styles.headerSubtitle}>Baseados nas suas informações e objetivos</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.section}>
          <Card>
            <CardHeader>
              <CardTitle>Necessidade Calórica</CardTitle>
            </CardHeader>
            <CardContent style={styles.caloriesContainer}>
              <View style={styles.caloriesContent}>
                <Text variant="h1" style={styles.caloriesNumber}>
                  {calories}
                </Text>
                <Text variant="subtitle" color="muted">
                  Calorias diárias
                </Text>
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.section}>
          <MacroDisplay macros={macros} calories={calories} showPercentages={true} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(700).duration(500)} style={styles.section}>
          <Card>
            <CardHeader>
              <CardTitle>Dicas de Alimentação</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={styles.tipsIntro}>
                Para atingir seus macros diários, tente incluir estes alimentos na sua dieta:
              </Text>

              {getTips().map((category, index) => (
                <View key={index} style={styles.tipCategory}>
                  <Text variant="subtitle" style={styles.tipTitle}>
                    {category.title}:
                  </Text>
                  <View style={styles.tagContainer}>
                    {category.items.map((item, itemIndex) => (
                      <View key={itemIndex} style={styles.tag}>
                        <Text variant="caption">{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(900).duration(500)} style={styles.section}>
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.featureList}>
                <View style={styles.featureItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>Distribua suas refeições ao longo do dia</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>Priorize alimentos integrais e não processados</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>Mantenha-se hidratado(a) bebendo água suficiente</Text>
                </View>
                <View style={styles.featureItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>Monitore seu progresso semanalmente</Text>
                </View>
              </View>
            </CardContent>
            <CardFooter style={styles.cardFooter}>
              <Button title="Recalcular" variant="outline" onPress={() => router.back()} style={styles.footerButton} />
              <Button title="Salvar" variant="primary" onPress={() => router.push("/")} style={styles.footerButton} />
            </CardFooter>
          </Card>
        </Animated.View>

        <View style={styles.spacer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  header: {
    alignItems: "center",
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    textAlign: "center",
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    textAlign: "center",
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  caloriesContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: theme.spacing.lg,
  },
  caloriesContent: {
    alignItems: "center",
  },
  caloriesNumber: {
    color: theme.colors.primary,
  },
  tipsIntro: {
    marginBottom: theme.spacing.md,
  },
  tipCategory: {
    marginBottom: theme.spacing.md,
  },
  tipTitle: {
    marginBottom: theme.spacing.sm,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  featureList: {
    marginTop: theme.spacing.sm,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.sm,
  },
  featureText: {
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  spacer: {
    height: 80, // Extra space at the bottom for the tab bar
  },
});
