import React from "react";
import { View, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";

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

  return (
    <Screen title="NutriMacros" showHeader={true} scroll={true}>
      <View className="py-4">
        {/* Hero Section */}
        <View className="items-center mb-6">
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text variant="h2" className="text-center mt-4">
            Bem-vindo ao NutriMacros
          </Text>
          <Text className="text-center text-muted-foreground mt-2 px-6">
            Seu assistente nutricional para alcançar seus objetivos de forma saudável e equilibrada
          </Text>
        </View>

        {/* Featured Card */}
        <Card className="mb-6">
          <CardContent className="p-0 overflow-hidden">
            <View className="bg-primary-600 p-6">
              <Text variant="h3" color="primary" className="mb-2">
                Calcule Seus Macros
              </Text>
              <Text color="primary" className="mb-4">
                Descubra sua necessidade calórica ideal e distribuição de macronutrientes
              </Text>
              <Button
                variant="secondary"
                onPress={() => router.push("/calculator")}
                rightIcon={<Feather name="arrow-right" size={16} color="#4CAF50" />}
              >
                Começar Agora
              </Button>
            </View>
          </CardContent>
        </Card>

        {/* Features */}
        <Text variant="h3" className="mb-4">
          Recursos
        </Text>
        <View className="space-y-4">
          {features.map((feature, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="flex-row items-center p-4">
                <View className="h-12 w-12 rounded-full bg-primary-50 items-center justify-center mr-4">
                  <Feather name={feature.icon as any} size={24} color="#4CAF50" />
                </View>
                <View className="flex-1">
                  <Text variant="subtitle" className="mb-1">
                    {feature.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    {feature.description}
                  </Text>
                </View>
                {feature.comingSoon ? (
                  <View className="bg-secondary py-1 px-2 rounded">
                    <Text variant="caption">Em breve</Text>
                  </View>
                ) : (
                  <Feather name="chevron-right" size={20} color="#9CA3AF" />
                )}
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Nutrition Tips */}
        <Text variant="h3" className="mt-8 mb-4">
          Dicas Nutricionais
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
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
          ].map((item, index) => (
            <Card key={index} className="mr-4" style={{ width: 200 }}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="caption">{item.tip}</Text>
              </CardContent>
            </Card>
          ))}
        </ScrollView>
      </View>
    </Screen>
  );
}
