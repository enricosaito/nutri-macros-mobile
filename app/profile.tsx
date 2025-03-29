// app/profile.tsx
import React, { useState } from "react";
import { View, StyleSheet, Switch, useColorScheme } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";

function ProfileScreen() {
  const systemIsDark = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(systemIsDark);
  const activeColors = isDark ? darkColors : colors;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Resources that will be listed
  const accountResources = [
    "Salvar histórico de cálculos de macros",
    "Acompanhamento diário de alimentação",
    "Receitas premium personalizadas",
    "Sincronização entre dispositivos",
  ];

  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View style={{ paddingVertical: spacing[6] }}>
        <Animated.View entering={FadeIn.duration(800)} style={{ alignItems: "center", marginBottom: spacing[6] }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: `${activeColors.primary}15`,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: spacing[3],
            }}
          >
            <Feather name="user" size={40} color={activeColors.primary} />
          </View>
          <Text variant="h3" style={{ marginBottom: spacing[1] }}>
            Usuário
          </Text>
          <Text variant="caption" color="muted" style={{ textAlign: "center" }}>
            Configure seu perfil para salvar seus macros
          </Text>
        </Animated.View>

        {/* Theme Toggle */}
        <Animated.View entering={FadeInRight.delay(200).duration(500)}>
          <Card style={{ marginBottom: spacing[4] }}>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
            </CardHeader>
            <CardContent>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: `${activeColors.primary}15`,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: spacing[3],
                    }}
                  >
                    <Feather name={isDark ? "moon" : "sun"} size={20} color={activeColors.primary} />
                  </View>
                  <Text>{isDark ? "Tema Escuro" : "Tema Claro"}</Text>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#767577", true: `${activeColors.primary}80` }}
                  thumbColor={isDark ? activeColors.primary : "#f4f3f4"}
                />
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(300).duration(500)}>
          <Card style={{ marginBottom: spacing[4] }}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ marginBottom: spacing[4] }}>
                Faça login para salvar seus cálculos de macros e acessar recursos premium.
              </Text>
              <Button
                title="Entrar com Email"
                variant="default"
                leftIcon={<Feather name="log-in" size={18} color="white" />}
                style={{ marginBottom: spacing[3] }}
                onPress={() => {}}
                fullWidth
              />
              <Button
                title="Continuar com Google"
                variant="outline"
                leftIcon={<Feather name="anchor" size={18} color={activeColors.primary} />}
                onPress={() => {}}
                fullWidth
              />
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(400).duration(500)}>
          <Card>
            <CardHeader>
              <CardTitle>Recursos da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={{ marginTop: spacing[2] }}>
                {accountResources.map((item, index) => (
                  <View
                    key={`resource-${index}`}
                    style={{
                      flexDirection: "row",
                      marginBottom: spacing[3],
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
                        marginTop: 2,
                      }}
                    >
                      <Feather name="check" size={14} color="white" />
                    </View>
                    <Text style={{ flex: 1 }}>{item}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </Animated.View>
      </View>
    </Screen>
  );
}

export default ProfileScreen;
