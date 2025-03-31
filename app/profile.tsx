import React, { useState } from "react";
import { View, StyleSheet, Switch, useColorScheme, TextInput } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useAuth } from "../src/context/AuthContext";

function ProfileScreen() {
  const systemIsDark = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(systemIsDark);
  const activeColors = isDark ? darkColors : colors;

  const { user, session, signIn, signUp, signOut, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAuth = async () => {
    if (isSignUp) {
      await signUp(email, password);
    } else {
      await signIn(email, password);
    }
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
      {/* Main content - Similar to before but using useAuth */}
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
            {user ? user.email || "Usuário" : "Usuário"}
          </Text>
          <Text variant="caption" color="muted" style={{ textAlign: "center" }}>
            {user ? "Sua conta está ativa e seus dados sincronizados" : "Configure seu perfil para salvar seus macros"}
          </Text>
        </Animated.View>

        {/* Theme Toggle - Same as before */}

        {/* Auth Card - Updated for Supabase */}
        <Animated.View entering={FadeInRight.delay(300).duration(500)}>
          <Card style={{ marginBottom: spacing[4] }}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <>
                  <Text style={{ marginBottom: spacing[4] }}>
                    Você está conectado como {user.email}. Suas cálculos são salvos automaticamente.
                  </Text>
                  <Button
                    title="Sair da Conta"
                    variant="outline"
                    leftIcon={<Feather name="log-out" size={18} color={activeColors.primary} />}
                    onPress={signOut}
                    loading={loading}
                    style={{ marginBottom: spacing[3] }}
                    fullWidth
                  />
                </>
              ) : (
                <>
                  <Text style={{ marginBottom: spacing[4] }}>
                    {isSignUp ? "Crie sua conta para salvar seus cálculos:" : "Faça login para acessar seus cálculos:"}
                  </Text>

                  {error && (
                    <View
                      style={{
                        backgroundColor: `${activeColors.error}20`,
                        padding: spacing[3],
                        borderRadius: 8,
                        marginBottom: spacing[3],
                      }}
                    >
                      <Text color="error">{error}</Text>
                    </View>
                  )}

                  {/* Email Input */}
                  <View style={{ marginBottom: spacing[3] }}>
                    <Text style={{ marginBottom: spacing[1] }}>Email</Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: activeColors.border,
                        borderRadius: 8,
                        padding: spacing[2],
                        color: activeColors.text,
                        backgroundColor: activeColors.card,
                      }}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="seu@email.com"
                      placeholderTextColor={activeColors.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>

                  {/* Password Input */}
                  <View style={{ marginBottom: spacing[4] }}>
                    <Text style={{ marginBottom: spacing[1] }}>Senha</Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: activeColors.border,
                        borderRadius: 8,
                        padding: spacing[2],
                        color: activeColors.text,
                        backgroundColor: activeColors.card,
                      }}
                      value={password}
                      onChangeText={setPassword}
                      placeholder="Sua senha"
                      placeholderTextColor={activeColors.textMuted}
                      secureTextEntry
                    />
                  </View>

                  {/* Auth Button */}
                  <Button
                    title={isSignUp ? "Criar Conta" : "Entrar com Email"}
                    variant="default"
                    leftIcon={<Feather name={isSignUp ? "user-plus" : "log-in"} size={18} color="white" />}
                    style={{ marginBottom: spacing[3] }}
                    onPress={handleAuth}
                    loading={loading}
                    fullWidth
                  />

                  {/* Toggle Sign Up/In */}
                  <Button
                    title={isSignUp ? "Já tenho uma conta" : "Criar nova conta"}
                    variant="ghost"
                    onPress={() => setIsSignUp(!isSignUp)}
                    style={{ marginBottom: spacing[3] }}
                    fullWidth
                  />
                </>
              )}
            </CardContent>
          </Card>
        </Animated.View>

        {/* Account Features - Same as before */}
      </View>
    </Screen>
  );
}

export default ProfileScreen;
