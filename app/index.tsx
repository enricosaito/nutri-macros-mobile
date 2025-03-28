import React from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../components/ui/text";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Feather } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      title: "Calculadora de Macros",
      description: "Calcule suas necessidades diárias de macronutrientes",
      icon: "calculator",
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
    },
    {
      title: "Carboidratos",
      tip: "Principal fonte de energia para o corpo e cérebro",
    },
    {
      title: "Gorduras",
      tip: "Importantes para hormônios e absorção de vitaminas",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NutriMacros</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image source={require("../assets/images/icon.png")} style={styles.logo} resizeMode="contain" />
          <Text style={styles.title}>Bem-vindo ao NutriMacros</Text>
          <Text style={styles.subtitle}>
            Seu assistente nutricional para alcançar seus objetivos de forma saudável e equilibrada
          </Text>
        </View>

        {/* Featured Card */}
        <Card style={styles.featuredCard}>
          <View style={styles.featuredCardContent}>
            <Text style={styles.featuredCardTitle}>Calcule Seus Macros</Text>
            <Text style={styles.featuredCardDescription}>
              Descubra sua necessidade calórica ideal e distribuição de macronutrientes
            </Text>
            <Button
              title="Começar Agora"
              onPress={() => router.push("/calculator")}
              rightIcon={<Feather name="arrow-right" size={16} color={theme.colors.primary} />}
              style={styles.featuredCardButton}
            />
          </View>
        </Card>

        {/* Features */}
        <Text style={styles.sectionTitle}>Recursos</Text>

        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={styles.featureCard}
              onPress={() => {
                if (feature.route) {
                  router.push(feature.route.replace("/", "") as any);
                }
              }}
              disabled={feature.comingSoon}
            >
              <View style={styles.featureIconContainer}>
                <Feather name={feature.icon as any} size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
              {feature.comingSoon ? (
                <View style={styles.comingSoonBadge}>
                  <Text style={styles.comingSoonText}>Em breve</Text>
                </View>
              ) : (
                <Feather name="chevron-right" size={20} color={theme.colors.textMuted} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Nutrition Tips */}
        <Text style={styles.sectionTitle}>Dicas Nutricionais</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsContainer}>
          {nutritionTips.map((item, index) => (
            <Card key={index} style={styles.tipCard}>
              <Text style={styles.tipTitle}>{item.title}</Text>
              <Text style={styles.tipDescription}>{item.tip}</Text>
            </Card>
          ))}
        </ScrollView>

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
    color: theme.colors.text,
    textAlign: "center",
    marginTop: theme.spacing.md,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
    textAlign: "center",
    marginTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  featuredCard: {
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  featuredCardContent: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.lg,
  },
  featuredCardTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: "white",
    marginBottom: theme.spacing.sm,
  },
  featuredCardDescription: {
    fontSize: theme.fontSize.md,
    color: "white",
    marginBottom: theme.spacing.md,
  },
  featuredCardButton: {
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: "700",
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  featuresContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  featureCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    alignItems: "center",
  },
  featureIconContainer: {
    height: 48,
    width: 48,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.secondaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: theme.spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  comingSoonBadge: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  comingSoonText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text,
  },
  tipsContainer: {
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  tipCard: {
    width: 200,
    padding: theme.spacing.md,
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  tipTitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  tipDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textMuted,
  },
  spacer: {
    height: 80, // Extra space at the bottom for the tab bar
  },
});
