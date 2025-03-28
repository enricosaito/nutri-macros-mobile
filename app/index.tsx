// app/index.tsx
import React from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Text } from "../components/ui/text";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();

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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View
        style={{
          paddingTop: 50,
          paddingHorizontal: theme.spacing[4],
          paddingBottom: theme.spacing[4],
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.card,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.foreground,
          }}
        >
          NutriMacros
        </Text>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View
          style={{
            alignItems: "center",
            paddingHorizontal: theme.spacing[4],
            paddingTop: theme.spacing.xl,
            paddingBottom: theme.spacing.lg,
          }}
        >
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text
            variant="h2"
            style={{
              textAlign: "center",
              marginTop: theme.spacing[4],
            }}
          >
            Bem-vindo ao NutriMacros
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: theme.spacing[2],
              color: theme.colors.mutedForeground,
              paddingHorizontal: theme.spacing[4],
            }}
          >
            Seu assistente nutricional para alcançar seus objetivos de forma saudável e equilibrada
          </Text>
        </View>

        {/* Featured Card */}
        <Card
          style={{
            marginHorizontal: theme.spacing[4],
            marginBottom: theme.spacing[6],
            borderRadius: theme.radius.xl,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.primary,
              padding: theme.spacing[6],
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.fontSize.lg,
                fontWeight: theme.typography.fontWeight.bold,
                color: "white",
                marginBottom: theme.spacing[2],
              }}
            >
              Calcule Seus Macros
            </Text>
            <Text
              style={{
                fontSize: theme.typography.fontSize.md,
                color: "white",
                marginBottom: theme.spacing[4],
              }}
            >
              Descubra sua necessidade calórica ideal e distribuição de macronutrientes
            </Text>
            <Button
              title="Começar Agora"
              onPress={() => router.push("/calculator")}
              rightIcon={<Feather name="arrow-right" size={16} color={theme.colors.primary} />}
              style={{ backgroundColor: "white" }}
              textStyle={{ color: theme.colors.primary }}
            />
          </View>
        </Card>

        {/* Features */}
        <Text
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.foreground,
            marginBottom: theme.spacing[4],
            marginHorizontal: theme.spacing[4],
            marginTop: theme.spacing[6],
          }}
        >
          Recursos
        </Text>

        <View style={{ paddingHorizontal: theme.spacing[4] }}>
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                backgroundColor: theme.colors.card,
                borderRadius: theme.radius.lg,
                padding: theme.spacing[4],
                borderWidth: 1,
                borderColor: theme.colors.border,
                marginBottom: theme.spacing[4],
                alignItems: "center",
              }}
              onPress={() => {
                if (feature.route && !feature.comingSoon) {
                  router.push(feature.route.replace("/", "") as any);
                }
              }}
              disabled={feature.comingSoon}
            >
              <View
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: theme.radius.full,
                  backgroundColor: theme.colors.secondary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: theme.spacing[4],
                }}
              >
                <Feather name={feature.icon as any} size={24} color={theme.colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.md,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: theme.colors.foreground,
                    marginBottom: 4,
                  }}
                >
                  {feature.title}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.fontSize.sm,
                    color: theme.colors.mutedForeground,
                  }}
                >
                  {feature.description}
                </Text>
              </View>
              {feature.comingSoon ? (
                <View
                  style={{
                    backgroundColor: theme.colors.secondary,
                    paddingHorizontal: theme.spacing[2],
                    paddingVertical: 4,
                    borderRadius: theme.radius.full,
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography.fontSize.xs,
                      color: theme.colors.foreground,
                    }}
                  >
                    Em breve
                  </Text>
                </View>
              ) : (
                <Feather name="chevron-right" size={20} color={theme.colors.mutedForeground} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Nutrition Tips */}
        <Text
          style={{
            fontSize: theme.typography.fontSize.lg,
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.foreground,
            marginBottom: theme.spacing[4],
            marginHorizontal: theme.spacing[4],
            marginTop: theme.spacing[6],
          }}
        >
          Dicas Nutricionais
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: theme.spacing[4], marginBottom: theme.spacing[6] }}
        >
          {nutritionTips.map((item, index) => (
            <Card
              key={index}
              style={{
                width: 200,
                padding: theme.spacing[4],
                marginRight: theme.spacing[4],
                borderRadius: theme.radius.lg,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.fontSize.md,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: theme.colors.foreground,
                  marginBottom: theme.spacing[2],
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.mutedForeground,
                }}
              >
                {item.tip}
              </Text>
            </Card>
          ))}
        </ScrollView>

        <View style={{ height: 80 }} />
      </ScrollView>
    </View>
  );
}
