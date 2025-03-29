// components/ui/card.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle, useColorScheme } from "react-native";
import { Text } from "./text";
import { colors, darkColors, spacing, radius } from "../../src/styles/globalStyles";
import Animated, { FadeIn } from "react-native-reanimated";
import { useAnimationsEnabled } from "../../src/utils/animation";

// Card container
interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animate?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function Card({ children, style, animate = false }: CardProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const animationsEnabled = useAnimationsEnabled();

  // Only animate if explicitly requested AND animations are enabled
  const shouldAnimate = animate && animationsEnabled;

  const cardStyle = [
    styles.card,
    {
      backgroundColor: activeColors.card,
      borderColor: activeColors.border,
      borderRadius: radius.xl,
    },
    style,
  ];

  if (shouldAnimate) {
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
  return (
    <View
      style={[
        styles.cardHeader,
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
  style?: ViewStyle;
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View
      style={[
        styles.cardContent,
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
        styles.cardFooter,
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
