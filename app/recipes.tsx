// app/recipes.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent, Button } from "../components";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../src/context/ThemeContext";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";

function RecipesScreen() {
  const { theme } = useTheme();

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
          paddingVertical: theme.spacing[6],
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: `${theme.colors.primary}15`,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: theme.spacing[4],
          }}
        >
          <Feather name="book-open" size={32} color={theme.colors.primary} />
        </View>

        <Text
          variant="h2"
          style={{
            textAlign: "center",
            marginBottom: theme.spacing[2],
            color: theme.colors.foreground,
          }}
        >
          Receitas em Breve
        </Text>

        <Text
          variant="body"
          color="muted"
          style={{
            textAlign: "center",
            marginBottom: theme.spacing[6],
            paddingHorizontal: theme.spacing[4],
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
              <View style={{ marginTop: theme.spacing[2] }}>
                {expectedFeatures.map((item, index) => (
                  <View
                    key={`feature-${index}`}
                    style={{
                      flexDirection: "row",
                      marginBottom: theme.spacing[3],
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        backgroundColor: theme.colors.primary,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: theme.spacing[3],
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
                leftIcon={<Feather name="bell" size={18} color={theme.colors.primary} />}
                style={{ marginTop: theme.spacing[4] }}
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
