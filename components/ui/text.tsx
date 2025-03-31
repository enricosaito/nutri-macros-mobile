import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps, useColorScheme } from "react-native";
import { colors, darkColors, typography } from "../../src/styles/globalStyles";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "text" | "muted" | "success" | "warning" | "error" | "white";

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

export function Text({
  variant = "body",
  color = "text",
  bold = false,
  italic = false,
  style,
  children,
  ...props
}: CustomTextProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;

  // Build the base style
  const baseStyle: TextStyle = {
    fontFamily: typography.fontFamily,
    color: activeColors.text, // Always default to theme text color
  };

  // Add variant styles
  switch (variant) {
    case "h1":
      baseStyle.fontSize = typography.fontSize["3xl"];
      baseStyle.fontWeight = "700";
      baseStyle.letterSpacing = -0.5;
      break;
    case "h2":
      baseStyle.fontSize = typography.fontSize["2xl"];
      baseStyle.fontWeight = "700";
      break;
    case "h3":
      baseStyle.fontSize = typography.fontSize.xl;
      baseStyle.fontWeight = "600";
      break;
    case "h4":
      baseStyle.fontSize = typography.fontSize.lg;
      baseStyle.fontWeight = "600";
      break;
    case "subtitle":
      baseStyle.fontSize = typography.fontSize.base;
      baseStyle.fontWeight = "500";
      break;
    case "body":
      baseStyle.fontSize = typography.fontSize.base;
      break;
    case "caption":
      baseStyle.fontSize = typography.fontSize.sm;
      baseStyle.color = activeColors.textMuted;
      break;
    case "small":
      baseStyle.fontSize = typography.fontSize.xs;
      break;
  }

  // Add color styles - fixed to ensure proper dark mode coloring
  switch (color) {
    case "primary":
      baseStyle.color = activeColors.primary;
      break;
    case "secondary":
      baseStyle.color = activeColors.secondary;
      break;
    case "text":
      baseStyle.color = activeColors.text;
      break;
    case "muted":
      baseStyle.color = activeColors.textMuted;
      break;
    case "success":
      baseStyle.color = activeColors.success;
      break;
    case "warning":
      baseStyle.color = activeColors.warning;
      break;
    case "error":
      baseStyle.color = activeColors.error;
      break;
    case "white":
      baseStyle.color = "#ffffff"; // Always white
      break;
  }

  // Add weight and style
  if (bold) {
    baseStyle.fontWeight = "700";
  }

  if (italic) {
    baseStyle.fontStyle = "italic";
  }

  return (
    <RNText style={[baseStyle, style]} {...props}>
      {children}
    </RNText>
  );
}
