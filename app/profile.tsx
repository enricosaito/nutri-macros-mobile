import React from "react";
import { View } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View className="py-6">
        <View className="items-center mb-6">
          <View className="w-24 h-24 rounded-full bg-primary-100 items-center justify-center mb-3">
            <Feather name="user" size={40} color="#4CAF50" />
          </View>
          <Text variant="h3">Usuário</Text>
          <Text variant="caption" color="muted">
            Configure seu perfil para salvar seus macros
          </Text>
        </View>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Text className="mb-4">Faça login para salvar seus cálculos de macros e acessar recursos premium.</Text>
            <Button variant="primary" leftIcon={<Feather name="log-in" size={18} color="white" />} className="mb-2">
              Entrar com Email
            </Button>
            <Button variant="outline" leftIcon={<Feather name="search" size={18} color="#4CAF50" />}>
              Continuar com Google
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recursos da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="space-y-3">
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Salvar histórico de cálculos de macros</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Acompanhamento diário de alimentação</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Receitas premium personalizadas</Text>
              </View>
              <View className="flex-row">
                <View className="w-2 h-2 rounded-full bg-primary-600 mt-2 mr-2" />
                <Text className="flex-1">Sincronização entre dispositivos</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}
