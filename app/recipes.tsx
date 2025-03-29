// app/recipes.tsx
import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent, Button } from "../components";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

function RecipesScreen() {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  // Features to expect
  const expectedFeatures = [
    "Receitas personalizadas com base nos seus macros",
    "Filtros por ingredientes disponíveis",
    "Informações nutricionais completas",
    "Salve suas receitas favoritas",
  ];

  return (
    <Screen title="Receitas" showHeader={true} scroll={true}>
      <Animated.View
        entering={FadeIn.duration(800)}
        style={{
          paddingVertical: spacing[6],
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: `${activeColors.primary}15`,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing[4],
          }}
        >
          <Feather name="book-open" size={32} color={activeColors.primary} />
        </View>

        <Text
          variant="h2"
          style={{
            textAlign: "center",
            marginBottom: spacing[2],
            color: activeColors.text,
          }}
        >
          Receitas em Breve
        </Text>

        <Text
          variant="body"
          color="muted"
          style={{
            textAlign: "center",
            marginBottom: spacing[6],
            paddingHorizontal: spacing[4],
          }}
        >
          Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
        </Text>

        <Animated.View entering={FadeInDown.delay(300).duration(500)} style={{ width: "100%" }}>
          <Card>
            <CardHeader>
              <CardTitle>O que esperar</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={{ marginTop: spacing[2] }}>
                {expectedFeatures.map((item, index) => (
                  <View
                    key={`feature-${index}`}
                    style={{
                      flexDirection: "row",
                      marginBottom: spacing[3],
                      alignItems: "center",
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
                      }}
                    >
                      <Feather name="check" size={14} color="white" />
                    </View>
                    <Text style={{ flex: 1 }}>{item}</Text>
                  </View>
                ))}
              </View>

              <Button
                title="Inscreva-se para notificações"
                variant="outline"
                leftIcon={<Feather name="bell" size={18} color={activeColors.primary} />}
                style={{ marginTop: spacing[4] }}
                onPress={() => {}}
              />
            </CardContent>
          </Card>
        </Animated.View>
      </Animated.View>
    </Screen>
  );
}

export default RecipesScreen;
