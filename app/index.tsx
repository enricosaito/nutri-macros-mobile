import React from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../components/ui/text";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Screen } from "../components/ui/screen";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing, radius } from "../src/styles/globalStyles";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useUserData } from "../src/context/UserDataContext";
import { useAuth } from "../src/context/AuthContext";

function HomeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const { calculations, loading: calculationsLoading } = useUserData();
  const { user } = useAuth();

  const features = [
    {
      title: "Calculadora de Macros",
      description: "Calcule suas necessidades diárias de macronutrientes",
      icon: "sliders",
      route: "/calculator",
    },
    {
      title: "Receitas Personalizadas",
      description: "Encontre receitas que se encaixam nos seus macros",
      icon: "book-open",
      route: "/recipes",
    },
    {
      title: "Acompanhamento Diário",
      description: "Registre suas refeições e acompanhe seu progresso",
      icon: "bar-chart-2",
      route: "/tracker",
      comingSoon: true,
    },
  ];

  const nutritionTips = [
    {
      title: "Proteínas",
      tip: "Essenciais para reparação muscular e saciedade",
      icon: "award",
      color: activeColors.chart3,
    },
    {
      title: "Carboidratos",
      tip: "Principal fonte de energia para o corpo e cérebro",
      icon: "battery-charging",
      color: activeColors.chart1,
    },
    {
      title: "Gorduras",
      tip: "Importantes para hormônios e absorção de vitaminas",
      icon: "droplet",
      color: activeColors.chart5,
    },
  ];

  // Function to get goal display text
  const getGoalText = (goalId) => {
    switch (goalId) {
      case "lose_weight":
        return "Perder Peso";
      case "maintain":
        return "Manter Peso";
      case "gain_muscle":
        return "Ganhar Músculo";
      default:
        return "Objetivo";
    }
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <Screen showHeader={false} scroll={true} padding={false}>
      {/* Hero Section */}
      <View style={[styles.heroContainer, { backgroundColor: activeColors.card }]}>
        <Animated.View entering={FadeInDown.duration(800).springify()} style={styles.logoContainer}>
          <Image source={require("../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(800).springify()}>
          <Text variant="h1" style={[styles.title, { color: activeColors.foreground }]}>
            NutriMacros
          </Text>
          <Text variant="body" color="muted" style={styles.subtitle}>
            Seu assistente nutricional para alcançar seus objetivos de forma saudável e equilibrada
          </Text>
        </Animated.View>
      </View>

      <View style={{ padding: spacing[4] }}>
        {/* Featured Card */}
        <Animated.View entering={FadeInUp.delay(400).duration(800).springify()}>
          <Card style={styles.featuredCard}>
            <CardContent
              style={{
                backgroundColor: activeColors.primary,
                padding: spacing[6],
                borderRadius: radius.xl,
              }}
            >
              <Text variant="h3" style={styles.featuredCardTitle} color="white">
                Calcule Seus Macros
              </Text>
              <Text style={styles.featuredCardDescription} color="white">
                Descubra sua necessidade calórica ideal e distribuição de macronutrientes
              </Text>
              <Button
                title="Começar Agora"
                onPress={() => router.push("/calculator")}
                rightIcon={<Feather name="arrow-right" size={16} color={activeColors.primary} />}
                style={styles.featuredCardButton}
                variant="secondary"
              />
            </CardContent>
          </Card>
        </Animated.View>

        {/* Recent Calculations Section */}
        {calculations.length > 0 && (
          <Animated.View entering={FadeInUp.delay(400).duration(800).springify()}>
            <Text variant="h3" style={[styles.sectionTitle, { color: activeColors.foreground }]}>
              Seus Cálculos Recentes
            </Text>

            {calculations.map((calc) => (
              <Card key={calc.id} style={styles.calculationCard}>
                <CardContent>
                  <View style={styles.calculationHeader}>
                    <Text variant="subtitle">{formatDate(calc.date)}</Text>
                    <Text variant="caption" color="primary">
                      {getGoalText(calc.goal)}
                    </Text>
                  </View>

                  <View style={styles.macroRow}>
                    <Text variant="h3" color="primary">
                      {calc.calories} kcal
                    </Text>
                    <View style={styles.macroValues}>
                      <Text>
                        <Text style={{ fontWeight: "600" }}>P:</Text> {calc.protein}g
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: "600" }}>C:</Text> {calc.carbs}g
                      </Text>
                      <Text>
                        <Text style={{ fontWeight: "600" }}>G:</Text> {calc.fat}g
                      </Text>
                    </View>
                  </View>

                  <Button
                    title="Ver Detalhes"
                    variant="outline"
                    size="sm"
                    onPress={() =>
                      router.push({
                        pathname: "/results",
                        params: {
                          protein: calc.protein,
                          carbs: calc.carbs,
                          fat: calc.fat,
                          calories: calc.calories,
                          goal: calc.goal,
                        },
                      })
                    }
                    rightIcon={<Feather name="chevron-right" size={16} color={activeColors.primary} />}
                  />
                </CardContent>
              </Card>
            ))}

            {!user && calculations.length >= 3 && (
              <Card style={styles.premiumPrompt}>
                <CardContent>
                  <Text variant="subtitle" style={{ textAlign: "center", marginBottom: spacing[2] }}>
                    Crie uma conta para salvar mais cálculos
                  </Text>
                  <Button
                    title="Criar Conta"
                    variant="default"
                    onPress={() => router.push("/profile")}
                    leftIcon={<Feather name="user-plus" size={16} color="white" />}
                  />
                </CardContent>
              </Card>
            )}
          </Animated.View>
        )}

        {/* Features */}
        <Animated.View entering={FadeInUp.delay(600).duration(800).springify()}>
          <Text variant="h3" style={[styles.sectionTitle, { color: activeColors.foreground }]}>
            Recursos
          </Text>

          <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={`feature-${index}`}
                style={[
                  styles.featureCard,
                  {
                    backgroundColor: activeColors.card,
                    borderColor: activeColors.border,
                    borderRadius: radius.lg,
                    opacity: feature.comingSoon ? 0.7 : 1,
                  },
                ]}
                onPress={() => {
                  if (feature.route && !feature.comingSoon) {
                    router.push(feature.route as any);
                  }
                }}
                disabled={feature.comingSoon}
                activeOpacity={feature.comingSoon ? 0.5 : 0.7}
              >
                <View
                  style={[
                    styles.featureIconContainer,
                    {
                      backgroundColor: `${activeColors.primary}15`,
                      borderRadius: radius.md,
                    },
                  ]}
                >
                  <Feather name={feature.icon as any} size={24} color={activeColors.primary} />
                </View>
                <View style={styles.featureContent}>
                  <Text variant="subtitle" style={{ color: activeColors.foreground }}>
                    {feature.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    {feature.description}
                  </Text>
                </View>
                {feature.comingSoon ? (
                  <View
                    style={[
                      styles.comingSoonBadge,
                      {
                        backgroundColor: activeColors.secondary,
                        borderRadius: radius.full,
                      },
                    ]}
                  >
                    <Text variant="small" style={{ color: activeColors.primary }}>
                      Em breve
                    </Text>
                  </View>
                ) : (
                  <Feather name="chevron-right" size={20} color={activeColors.mutedForeground} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Nutrition Tips */}
        <Animated.View entering={FadeInUp.delay(800).duration(800).springify()}>
          <Text variant="h3" style={[styles.sectionTitle, { color: activeColors.foreground }]}>
            Dicas Nutricionais
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsContainer}>
            {nutritionTips.map((item, index) => (
              <Card key={`tip-${index}`} style={{ ...styles.tipCard, borderRadius: radius.lg }}>
                <CardContent style={{ padding: spacing[5] }}>
                  <View
                    style={[
                      styles.tipIconContainer,
                      {
                        backgroundColor: `${item.color}20`,
                        borderRadius: radius.md,
                      },
                    ]}
                  >
                    <Feather name={item.icon as any} size={22} color={item.color} />
                  </View>
                  <Text variant="subtitle" style={{ marginVertical: spacing[2] }}>
                    {item.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    {item.tip}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </ScrollView>
        </Animated.View>

        <View style={styles.spacer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  featuredCard: {
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredCardTitle: {
    marginBottom: 8,
  },
  featuredCardDescription: {
    marginBottom: 20,
  },
  featuredCardButton: {
    alignSelf: "flex-start",
  },
  sectionTitle: {
    marginBottom: 16,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    marginBottom: 12,
    alignItems: "center",
  },
  featureIconContainer: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  comingSoonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tipsContainer: {
    marginBottom: 32,
  },
  tipCard: {
    width: 220,
    marginRight: 16,
  },
  tipIconContainer: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    height: 80, // Extra space at the bottom for the tab bar
  },
  // New styles for calculations
  calculationCard: {
    marginBottom: 12,
  },
  calculationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  macroRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  macroValues: {
    flexDirection: "row",
    gap: 8,
  },
  premiumPrompt: {
    marginTop: 8,
    marginBottom: 24,
    borderStyle: "dashed",
    borderWidth: 1,
    backgroundColor: `${colors.primary}05`,
  },
});

export default HomeScreen;
