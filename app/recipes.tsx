import React from "react";
import { View } from "react-native";
import { Screen, Text, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";

export default function RecipesScreen() {
  return (
    <Screen title="Receitas" showHeader={true} scroll={true}>
      <View className="py-6 items-center justify-center">
        <View className="w-20 h-20 rounded-full bg-secondary items-center justify-center mb-4">
          <Feather name="book-open" size={32} color="#4CAF50" />
        </View>
        <Text variant="h2" className="text-center mb-2">
          Receitas em Breve
        </Text>
        <Text className="text-center text-muted-foreground mb-6 px-6">
          Estamos trabalhando para trazer receitas personalizadas baseadas nos seus macros. Fique ligado!
        </Text>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>O que esperar</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-3">
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Receitas personalizadas com base nos seus macros</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Filtros por ingredientes disponíveis</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Informações nutricionais completas</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Salve suas receitas favoritas</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}
