// components/ui/card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Text } from "./text";
import { useTheme } from "../../src/context/ThemeContext";
import Animated, { FadeIn } from "react-native-reanimated";

// Card container
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animate?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function Card({ children, style, animate = false }: CardProps) {
  const { theme } = useTheme();

  const cardStyle = {
    ...styles.card,
    backgroundColor: theme.colors.card,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    ...(style as object),
  };

  if (animate) {
    return (
      <AnimatedView entering={FadeIn.duration(400)} style={cardStyle}>
        {children}
      </AnimatedView>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

// Card header
interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function CardHeader({ children, style }: CardHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={{
        ...styles.cardHeader,
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[4],
        ...(style as object),
      }}
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
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.semibold as TextStyle["fontWeight"],
        color: theme.colors.cardForeground,
        ...(style as object),
      }}
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
  const { theme } = useTheme();

  return (
    <Text
      style={{
        fontSize: theme.typography.fontSize.sm,
        color: theme.colors.mutedForeground,
        marginTop: theme.spacing[1],
        ...(style as object),
      }}
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
  const { theme } = useTheme();

  return (
    <View
      style={{
        ...styles.cardContent,
        paddingHorizontal: theme.spacing[6],
        paddingBottom: theme.spacing[6],
        ...(style as object),
      }}
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
  const { theme } = useTheme();

  return (
    <View
      style={{
        ...styles.cardFooter,
        borderTopColor: theme.colors.border,
        paddingHorizontal: theme.spacing[6],
        paddingVertical: theme.spacing[4],
        ...(style as object),
      }}
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
  },
  cardHeader: {
    borderBottomWidth: 0,
  },
  cardContent: {
    paddingTop: 0,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
  },
});
