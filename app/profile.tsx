import React, { useState } from "react";
import { View, StyleSheet, Switch, useColorScheme, ScrollView, TextInput, Alert } from "react-native";
import { Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { colors, darkColors, spacing } from "../src/styles/globalStyles";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const systemIsDark = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(systemIsDark);
  const activeColors = isDark ? darkColors : colors;

  // Use the Supabase Auth Context
  const { user, session, signIn, signUp, signOut, error, loading } = useAuth();

  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha email e senha.");
      return;
    }

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
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <View style={[styles.header, { backgroundColor: activeColors.card }]}>
        <Text variant="h3" style={{ color: activeColors.text, textAlign: "center" }}>
          Perfil
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: spacing[4] }}>
        <View style={{ paddingVertical: spacing[4] }}>
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
            <Text variant="h3" style={{ marginBottom: spacing[1], color: activeColors.text }}>
              {user ? user.email : "Usuário"}
            </Text>
            <Text variant="caption" color="muted" style={{ textAlign: "center" }}>
              {user
                ? "Sua conta está ativa e seus dados sincronizados"
                : "Configure seu perfil para salvar seus macros"}
            </Text>
          </Animated.View>

          {/* Theme Toggle */}
          <Animated.View entering={FadeInRight.delay(200).duration(500)}>
            <Card style={{ marginBottom: spacing[4], backgroundColor: activeColors.card }}>
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
                    <Text style={{ color: activeColors.text }}>{isDark ? "Tema Escuro" : "Tema Claro"}</Text>
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

          {/* Auth Card */}
          <Animated.View entering={FadeInRight.delay(300).duration(500)}>
            <Card style={{ marginBottom: spacing[4], backgroundColor: activeColors.card }}>
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <>
                    <Text style={{ marginBottom: spacing[4], color: activeColors.text }}>
                      Você está conectado como {user.email}. Seus cálculos são salvos automaticamente.
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
                    <Text style={{ marginBottom: spacing[4], color: activeColors.text }}>
                      {isSignUp
                        ? "Crie sua conta para salvar seus cálculos:"
                        : "Faça login para acessar seus cálculos:"}
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
                      <Text style={{ marginBottom: spacing[1], color: activeColors.text }}>Email</Text>
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
                      <Text style={{ marginBottom: spacing[1], color: activeColors.text }}>Senha</Text>
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

          <Animated.View entering={FadeInRight.delay(400).duration(500)}>
            <Card style={{ backgroundColor: activeColors.card }}>
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
                      <Text style={{ flex: 1, color: activeColors.text }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </CardContent>
            </Card>
          </Animated.View>
        </View>

        {/* Extra space at the bottom for the tab bar */}
        <View style={{ height: 80 }} />
      </ScrollView>

      <TabBar insets={insets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  scrollView: {
    flex: 1,
  },
});

export default ProfileScreen;
