import React from "react";
import { View, StyleSheet } from "react-native";
import { Screen, Text, Button, Card, CardHeader, CardTitle, CardContent } from "../components";
import { Feather } from "@expo/vector-icons";
import { theme } from "../styles/theme";

export default function ProfileScreen() {
  return (
    <Screen title="Perfil" showHeader={true} scroll={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Feather name="user" size={40} color={theme.colors.primary} />
          </View>
          <Text variant="h3" style={styles.username}>
            Usuário
          </Text>
          <Text variant="caption" color="muted" style={styles.userSubtitle}>
            Configure seu perfil para salvar seus macros
          </Text>
        </View>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Text style={styles.cardText}>
              Faça login para salvar seus cálculos de macros e acessar recursos premium.
            </Text>
            <Button
              title="Entrar com Email"
              variant="primary"
              leftIcon={<Feather name="log-in" size={18} color="white" />}
              style={styles.loginButton}
              onPress={() => {}}
            />
            <Button
              title="Continuar com Google"
              variant="outline"
              leftIcon={<Feather name="google" size={18} color={theme.colors.primary} />}
              onPress={() => {}}
            />
          </CardContent>
        </Card>

        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Recursos da Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Salvar histórico de cálculos de macros</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Acompanhamento diário de alimentação</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Receitas premium personalizadas</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.bullet} />
                <Text style={styles.featureText}>Sincronização entre dispositivos</Text>
              </View>
            </View>
          </CardContent>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: theme.spacing.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.secondaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing.sm,
  },
  username: {
    marginBottom: theme.spacing.xs,
  },
  userSubtitle: {
    textAlign: "center",
  },
  card: {
    marginBottom: theme.spacing.md,
  },
  cardText: {
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    marginBottom: theme.spacing.sm,
  },
  featureList: {
    marginTop: theme.spacing.sm,
  },
  featureItem: {
    flexDirection: "row",
    marginBottom: theme.spacing.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    marginRight: theme.spacing.sm,
  },
  featureText: {
    flex: 1,
  },
});
