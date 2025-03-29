// app/index.tsx - Fix for router and icon type issues
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
import { useAnimationsEnabled } from "../src/utils/animation";

// Define Icon type to address the type issues
type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

function HomeScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

  // Type-safe feature objects
  const features = [
    {
      title: "Calculadora de Macros",
      description: "Calcule suas necessidades diárias de macronutrientes",
      icon: "sliders" as FeatherIconName,
      route: "/calculator",
    },
    {
      title: "Receitas Personalizadas",
      description: "Encontre receitas que se encaixam nos seus macros",
      icon: "book-open" as FeatherIconName,
      route: "/recipes",
    },
    {
      title: "Acompanhamento Diário",
      description: "Registre suas refeições e acompanhe seu progresso",
      icon: "bar-chart-2" as FeatherIconName,
      route: "/tracker",
      comingSoon: true,
    },
  ];

  // Type-safe tip objects
  const nutritionTips = [
    {
      title: "Proteínas",
      tip: "Essenciais para reparação muscular e saciedade",
      icon: "award" as FeatherIconName,
      color: activeColors.chart3,
    },
    {
      title: "Carboidratos",
      tip: "Principal fonte de energia para o corpo e cérebro",
      icon: "battery-charging" as FeatherIconName,
      color: activeColors.chart1,
    },
    {
      title: "Gorduras",
      tip: "Importantes para hormônios e absorção de vitaminas",
      icon: "droplet" as FeatherIconName,
      color: activeColors.chart5,
    },
  ];

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  // Safe navigation function
  const navigateTo = (path: string) => {
    // Using the router.push method with type assertion
    router.push(path as any);
  };

  return (
    <Screen showHeader={false} scroll={true} padding={false}>
      {/* Hero Section */}
      <View style={[styles.heroContainer, { backgroundColor: activeColors.card }]}>
        <AnimatedContainer
          entering={animationsEnabled ? FadeInDown.duration(800).springify() : undefined}
          style={styles.logoContainer}
        >
          <Image source={require("../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
        </AnimatedContainer>

        <AnimatedContainer entering={animationsEnabled ? FadeInUp.delay(200).duration(800).springify() : undefined}>
          <Text variant="h1" style={[styles.title, { color: activeColors.foreground }]}>
            NutriMacros
          </Text>
          <Text variant="body" color="muted" style={styles.subtitle}>
            Seu assistente nutricional para alcançar seus objetivos de forma saudável e equilibrada
          </Text>
        </AnimatedContainer>
      </View>

      <View style={{ padding: spacing[4] }}>
        {/* Featured Card */}
        <AnimatedContainer entering={animationsEnabled ? FadeInUp.delay(400).duration(800).springify() : undefined}>
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
                onPress={() => navigateTo("/calculator")}
                rightIcon={<Feather name="arrow-right" size={16} color={activeColors.primary} />}
                style={styles.featuredCardButton}
                variant="secondary"
              />
            </CardContent>
          </Card>
        </AnimatedContainer>

        {/* Features */}
        <AnimatedContainer entering={animationsEnabled ? FadeInUp.delay(600).duration(800).springify() : undefined}>
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
                    navigateTo(feature.route);
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
                  <Feather name={feature.icon} size={24} color={activeColors.primary} />
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
                  <Feather name={"chevron-right" as FeatherIconName} size={20} color={activeColors.mutedForeground} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedContainer>

        {/* Nutrition Tips */}
        <AnimatedContainer entering={animationsEnabled ? FadeInUp.delay(800).duration(800).springify() : undefined}>
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
                    <Feather name={item.icon} size={22} color={item.color} />
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
        </AnimatedContainer>

        <View style={styles.spacer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Existing styles remain the same
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
});

export default HomeScreen;
