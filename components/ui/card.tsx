// components/ui/card.tsx (partial fix for the style type issues)
import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle, useColorScheme } from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing, radius } from "../../src/styles/globalStyles";

// Card container
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animate?: boolean;
}

export function Card({ children, style, animate = false }: CardProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  const cardStyle: ViewStyle = {
    ...styles.card,
    backgroundColor: activeColors.card,
    borderColor: activeColors.border,
    borderRadius: radius.xl,
    ...(style as ViewStyle),
  };

  return <View style={cardStyle}>{children}</View>;
}

// Card header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return (
    <View
      style={[
        styles.cardHeader as ViewStyle,
        {
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[4],
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
  style?: TextStyle;
}

export function CardTitle({ children, style }: CardTitleProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <Text
      variant="h3"
      style={[
        {
          color: activeColors.text,
        } as TextStyle,
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
  style?: TextStyle;
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <Text
      variant="caption"
      style={[
        {
          color: activeColors.textMuted,
          marginTop: spacing[1],
        } as TextStyle,
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
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View
      style={[
        styles.cardContent as ViewStyle,
        {
          paddingHorizontal: spacing[6],
          paddingBottom: spacing[6],
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
  style?: ViewStyle;
}

export function CardFooter({ children, style }: CardFooterProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  return (
    <View
      style={[
        styles.cardFooter as ViewStyle,
        {
          borderTopColor: activeColors.border,
          paddingHorizontal: spacing[6],
          paddingVertical: spacing[4],
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
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  } as ViewStyle,
  cardHeader: {
    borderBottomWidth: 0,
  } as ViewStyle,
  cardContent: {
    paddingTop: 0,
  } as ViewStyle,
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
  } as ViewStyle,
});
