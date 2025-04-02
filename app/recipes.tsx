// app/recipes.tsx
import React from "react";
import { View, useColorScheme, ScrollView } from "react-native";
import { Text, Card, CardHeader, CardTitle, CardContent, Button } from "../components";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function RecipesScreen() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === "dark";

  // Features to expect
  const expectedFeatures = [
    "Receitas personalizadas com base nos seus macros",
    "Filtros por ingredientes disponíveis",
    "Informações nutricionais completas",
    "Salve suas receitas favoritas",
  ];

  return (
    <View className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"}`}>
      <View
        className={`py-4 pt-[50px] border-b ${isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"}`}
      >
        <Text variant="h3" className="text-center">
          Receitas
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Animated.View entering={FadeIn.duration(800)} className="items-center">
            <View
              className={`w-20 h-20 rounded-full ${
                isDark ? "bg-[#2ac46e]/15" : "bg-[#22c069]/15"
              } items-center justify-center mb-4`}
            >
              <Feather name="book-open" size={32} color={isDark ? "#2ac46e" : "#22c069"} />
            </View>

            <Text variant="h2" className="text-center mb-2">
              Receitas em Breve
            </Text>

            <Text variant="body" color="muted" className="text-center mb-6 px-4">
              Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
            </Text>

            <Animated.View entering={FadeInDown.delay(300).duration(500)} className="w-full">
              <Card>
                <CardHeader>
                  <CardTitle>O que esperar</CardTitle>
                </CardHeader>
                <CardContent>
                  <View className="mt-2">
                    {expectedFeatures.map((item, index) => (
                      <View key={`feature-${index}`} className="flex-row mb-3 items-center">
                        <View
                          className={`w-6 h-6 rounded-full ${
                            isDark ? "bg-[#2ac46e]" : "bg-[#22c069]"
                          } items-center justify-center mr-3`}
                        >
                          <Feather name="check" size={14} color="white" />
                        </View>
                        <Text className="flex-1">{item}</Text>
                      </View>
                    ))}
                  </View>

                  <Button
                    title="Inscreva-se para notificações"
                    variant="outline"
                    leftIcon={<Feather name="bell" size={18} color={isDark ? "#2ac46e" : "#22c069"} />}
                    className="mt-4"
                  />
                </CardContent>
              </Card>
            </Animated.View>
          </Animated.View>
        </View>

        {/* Extra space at the bottom for the tab bar */}
        <View className="h-20" />
      </ScrollView>

      <TabBar insets={insets} />
    </View>
  );
}

export default RecipesScreen;
