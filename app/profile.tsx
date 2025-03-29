// app/profile.tsx
import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../src/context/ThemeContext";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View style={{ paddingVertical: theme.spacing[6] }}>
        <Animated.View entering={FadeIn.duration(800)} style={{ alignItems: "center", marginBottom: theme.spacing[6] }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: `${theme.colors.primary}15`,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: theme.spacing[3],
            }}
          >
            <Feather name="user" size={40} color={theme.colors.primary} />
          </View>
          <Text variant="h3" style={{ marginBottom: theme.spacing[1] }}>
            Usuário
          </Text>
          <Text variant="caption" color="muted" style={{ textAlign: "center" }}>
            Configure seu perfil para salvar seus macros
          </Text>
        </Animated.View>

        {/* Theme Toggle */}
        <Animated.View entering={FadeInRight.delay(200).duration(500)}>
          <Card style={{ marginBottom: theme.spacing[4] }}>
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
                      backgroundColor: `${theme.colors.primary}15`,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: theme.spacing[3],
                    }}
                  >
                    <Feather name={isDark ? "moon" : "sun"} size={20} color={theme.colors.primary} />
                  </View>
                  <Text>{isDark ? "Tema Escuro" : "Tema Claro"}</Text>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  trackColor={{ false: "#767577", true: `${theme.colors.primary}80` }}
                  thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
                />
              </View>
            </CardContent>
          </Card>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(300).duration(500)}>
          <Card style={{ marginBottom: theme.spacing[4] }}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <Text style={{ marginBottom: theme.spacing[4] }}>
                Faça login para salvar seus cálculos de macros e acessar recursos premium.
              </Text>
              <Button
                title="Entrar com Email"
                variant="default"
                leftIcon={<Feather name="log-in" size={18} color="white" />}
                style={{ marginBottom: theme.spacing[3] }}
                onPress={() => {}}
                fullWidth
              />
              <Button
                title="Continuar com Google"
                variant="outline"
                leftIcon={<Feather name="anchor" size={18} color={theme.colors.primary} />}
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
              <View style={{ marginTop: theme.spacing[2] }}>
                {[
                  "Salvar histórico de cálculos de macros",
                  "Acompanhamento diário de alimentação",
                  "Receitas premium personalizadas",
                  "Sincronização entre dispositivos",
                ].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      marginBottom: theme.spacing[3],
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
