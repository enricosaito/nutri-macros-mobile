// app/profile.tsx
import React from "react";
import { View, StyleSheet, Switch } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../src/context/ThemeContext";

export default function ProfileScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View style={{ paddingVertical: theme.spacing[6] }}>
        <View style={{ alignItems: "center", marginBottom: theme.spacing[6] }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 48,
              backgroundColor: theme.colors.secondary,
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
        </View>

        {/* Theme Toggle */}
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
                <Feather
                  name={isDark ? "moon" : "sun"}
                  size={20}
                  color={theme.colors.foreground}
                  style={{ marginRight: theme.spacing[3] }}
                />
                <Text>{isDark ? "Tema Escuro" : "Tema Claro"}</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#767577", true: theme.colors.primary + "80" }}
                thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
              />
            </View>
          </CardContent>
        </Card>

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
            />
            <Button
              title="Continuar com Google"
              variant="outline"
              leftIcon={<Feather name="anchor" size={18} color={theme.colors.primary} />}
              onPress={() => {}}
            />
          </CardContent>
        </Card>

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
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.colors.primary,
                      marginTop: 8,
                      marginRight: theme.spacing[2],
                    }}
                  />
                  <Text style={{ flex: 1 }}>{item}</Text>
                </View>
              ))}
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}
