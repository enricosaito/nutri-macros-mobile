import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../src/context/ThemeContext";

// Card container
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function Card({ children, style }: CardProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.xl,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Card header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.cardHeader,
        {
          padding: theme.spacing[6],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Card title
interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[] | undefined;
}

export function CardTitle({ children, style }: CardTitleProps) {
  const { theme } = useTheme();

  return (
    <Text
      style={[
        styles.cardTitle,
        {
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.semibold,
          color: theme.colors.cardForeground,
        },
        style,
      ]}
    >
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
  const { theme } = useTheme();

  return (
    <Text
      style={[
        styles.cardDescription,
        {
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.mutedForeground,
        },
        style,
      ]}
    >
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
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.cardContent,
        {
          padding: theme.spacing[6],
          paddingTop: 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Card footer
interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[] | undefined;
}

export function CardFooter({ children, style }: CardFooterProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.cardFooter,
        {
          padding: theme.spacing[6],
          paddingTop: 0,
          borderTopColor: theme.colors.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  cardHeader: {},
  cardTitle: {
    lineHeight: 1.2 * 18, // fontSize * lineHeight.tight
  },
  cardDescription: {
    marginTop: 4,
  },
  cardContent: {},
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
  },
});
