// app/profile.tsx
import React, { useState } from "react";
import { View, StyleSheet, Switch, useColorScheme } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useAnimationsEnabled } from "../src/utils/animation";

function ProfileScreen() {
  const systemIsDark = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(systemIsDark);
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

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

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View style={{ paddingVertical: spacing[6] }}>
        <AnimatedContainer
          entering={animationsEnabled ? FadeIn.duration(800) : undefined}
          style={{ alignItems: "center", marginBottom: spacing[6] }}
        >
          <View style={styles.avatarContainer}>
            <Feather name="user" size={40} color={activeColors.primary} />
          </View>
          <Text variant="h3" style={{ marginBottom: spacing[1] }}>
            Usuário
          </Text>
          <Text variant="caption" color="muted" style={{ textAlign: "center" }}>
            Configure seu perfil para salvar seus macros
          </Text>
        </AnimatedContainer>

        <AnimatedContainer entering={animationsEnabled ? FadeInRight.delay(200).duration(500) : undefined}>
          <Card style={{ marginBottom: spacing[4] }}>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={styles.settingRow}>
                <View style={styles.settingLabelContainer}>
                  <View style={styles.settingIcon}>
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
        </AnimatedContainer>

        <AnimatedContainer entering={animationsEnabled ? FadeInRight.delay(300).duration(500) : undefined}>
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
        </AnimatedContainer>

        <AnimatedContainer entering={animationsEnabled ? FadeInRight.delay(400).duration(500) : undefined}>
          <Card>
            <CardHeader>
              <CardTitle>Recursos da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <View style={{ marginTop: spacing[2] }}>
                {accountResources.map((item, index) => (
                  <View key={`resource-${index}`} style={styles.resourceRow}>
                    <View style={styles.checkIcon}>
                      <Feather name="check" size={14} color="white" />
                    </View>
                    <Text style={{ flex: 1 }}>{item}</Text>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `rgba(34, 192, 105, 0.15)`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `rgba(34, 192, 105, 0.15)`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  resourceRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#22c069",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
});

export default ProfileScreen;
