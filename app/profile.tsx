// app/profile.tsx
import React, { useState } from "react";
import { View, Switch, useColorScheme, ScrollView, TextInput, Alert } from "react-native";
import { Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeIn, FadeInRight } from "react-native-reanimated";
import { useAuth } from "../src/context/AuthContext";
import { TabBar } from "../components/TabBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const systemIsDark = useColorScheme() === "dark";
  const [isDark, setIsDark] = useState(systemIsDark);

  // Use the Supabase Auth Context
  const { user, signIn, signUp, signOut, error, loading } = useAuth();

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
    <View className={`flex-1 ${isDark ? "bg-black" : "bg-[#f5f9f7]"}`}>
      <View
        className={`py-4 pt-[50px] border-b ${isDark ? "bg-[#121212] border-[#333333]" : "bg-white border-[#dfe5df]"}`}
      >
        <Text variant="h3" className="text-center">
          Perfil
        </Text>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16 }}>
        <View className="py-4">
          <Animated.View entering={FadeIn.duration(800)} className="items-center mb-6">
            <View
              className={`w-24 h-24 rounded-full items-center justify-center mb-3 ${
                isDark ? "bg-[#2ac46e]/15" : "bg-[#22c069]/15"
              }`}
            >
              <Feather name="user" size={40} color={isDark ? "#2ac46e" : "#22c069"} />
            </View>
            <Text variant="h3" className="mb-1">
              {user ? user.email : "Usuário"}
            </Text>
            <Text variant="caption" color="muted" className="text-center">
              {user
                ? "Sua conta está ativa e seus dados sincronizados"
                : "Configure seu perfil para salvar seus macros"}
            </Text>
          </Animated.View>

          {/* Theme Toggle */}
          <Animated.View entering={FadeInRight.delay(200).duration(500)}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <View
                      className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${
                        isDark ? "bg-[#2ac46e]/15" : "bg-[#22c069]/15"
                      }`}
                    >
                      <Feather name={isDark ? "moon" : "sun"} size={20} color={isDark ? "#2ac46e" : "#22c069"} />
                    </View>
                    <Text>{isDark ? "Tema Escuro" : "Tema Claro"}</Text>
                  </View>
                  <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{
                      false: "#767577",
                      true: isDark ? "rgba(42, 196, 110, 0.5)" : "rgba(34, 192, 105, 0.5)",
                    }}
                    thumbColor={isDark ? "#2ac46e" : "#f4f3f4"}
                  />
                </View>
              </CardContent>
            </Card>
          </Animated.View>

          {/* Auth Card */}
          <Animated.View entering={FadeInRight.delay(300).duration(500)}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Login</CardTitle>
              </CardHeader>
              <CardContent>
                {user ? (
                  <>
                    <Text className="mb-4">
                      Você está conectado como {user.email}. Seus cálculos são salvos automaticamente.
                    </Text>
                    <Button
                      title="Sair da Conta"
                      variant="outline"
                      leftIcon={<Feather name="log-out" size={18} color={isDark ? "#2ac46e" : "#22c069"} />}
                      onPress={signOut}
                      loading={loading}
                      className="mb-3"
                      fullWidth
                    />
                  </>
                ) : (
                  <>
                    <Text className="mb-4">
                      {isSignUp
                        ? "Crie sua conta para salvar seus cálculos:"
                        : "Faça login para acessar seus cálculos:"}
                    </Text>

                    {error && (
                      <View className={`${isDark ? "bg-[#9b1f1f]/20" : "bg-[#e92c2c]/20"} p-3 rounded-lg mb-3`}>
                        <Text color="error">{error}</Text>
                      </View>
                    )}

                    {/* Email Input */}
                    <View className="mb-3">
                      <Text className="mb-1">Email</Text>
                      <TextInput
                        className={`border rounded-lg p-2 ${
                          isDark
                            ? "border-[#333333] bg-[#121212] text-white"
                            : "border-[#dfe5df] bg-white text-[#151915]"
                        }`}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="seu@email.com"
                        placeholderTextColor={isDark ? "#9ca29d" : "#6a706b"}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>

                    {/* Password Input */}
                    <View className="mb-4">
                      <Text className="mb-1">Senha</Text>
                      <TextInput
                        className={`border rounded-lg p-2 ${
                          isDark
                            ? "border-[#333333] bg-[#121212] text-white"
                            : "border-[#dfe5df] bg-white text-[#151915]"
                        }`}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Sua senha"
                        placeholderTextColor={isDark ? "#9ca29d" : "#6a706b"}
                        secureTextEntry
                      />
                    </View>

                    {/* Auth Button */}
                    <Button
                      title={isSignUp ? "Criar Conta" : "Entrar com Email"}
                      variant="default"
                      leftIcon={<Feather name={isSignUp ? "user-plus" : "log-in"} size={18} color="white" />}
                      className="mb-3"
                      onPress={handleAuth}
                      loading={loading}
                      fullWidth
                    />

                    {/* Toggle Sign Up/In */}
                    <Button
                      title={isSignUp ? "Já tenho uma conta" : "Criar nova conta"}
                      variant="ghost"
                      onPress={() => setIsSignUp(!isSignUp)}
                      className="mb-3"
                      fullWidth
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(400).duration(500)}>
            <Card>
              <CardHeader>
                <CardTitle>Recursos da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <View className="mt-2">
                  {accountResources.map((item, index) => (
                    <View key={`resource-${index}`} className="flex-row mb-3">
                      <View
                        className={`w-6 h-6 rounded-full ${
                          isDark ? "bg-[#2ac46e]" : "bg-[#22c069]"
                        } items-center justify-center mr-3 mt-0.5`}
                      >
                        <Feather name="check" size={14} color="white" />
                      </View>
                      <Text className="flex-1">{item}</Text>
                    </View>
                  ))}
                </View>
              </CardContent>
            </Card>
          </Animated.View>
        </View>

        {/* Extra space at the bottom for the tab bar */}
        <View className="h-20" />
      </ScrollView>

      <TabBar insets={insets} />
    </View>
  );
}

export default ProfileScreen;
