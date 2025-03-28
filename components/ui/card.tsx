// Full fix for components/ui/card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Text } from "./text";
import { theme } from "../../styles/theme";

// Card container
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

// Card header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.cardHeader, style]}>{children}</View>;
}

// Card title
interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[] | undefined;
}

export function CardTitle({ children, style }: CardTitleProps) {
  return (
    <Text variant="h3" style={style}>
      {children}
    </Text>
  );
}

// Card description
interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[] | undefined;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return (
    <Text variant="caption" color="muted" style={style}>
      {children}
    </Text>
  );
}

// Card content
interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.cardContent, style]}>{children}</View>;
}

// Card footer
interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function CardFooter({ children, style }: CardFooterProps) {
  return <View style={[styles.cardFooter, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  cardContent: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
