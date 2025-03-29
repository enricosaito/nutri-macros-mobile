// components/ui/text.tsx
import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger" | "white";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

export function Text({
  variant = "body",
  color = "foreground",
  bold = false,
  italic = false,
  style,
  children,
  ...props
}: TextProps) {
  const { theme } = useTheme();

  // Build the base style object
  const getBaseStyle = (): TextStyle => {
    // Base style
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.foreground,
      fontFamily: theme.typography.fontFamily.sans,
    };

    // Add variant styles
    switch (variant) {
      case "h1":
        baseStyle.fontSize = theme.typography.fontSize["3xl"];
        baseStyle.fontWeight = "700";
        baseStyle.letterSpacing = -0.5;
        break;
      case "h2":
        baseStyle.fontSize = theme.typography.fontSize["2xl"];
        baseStyle.fontWeight = "700";
        break;
      case "h3":
        baseStyle.fontSize = theme.typography.fontSize.xl;
        baseStyle.fontWeight = "600";
        break;
      case "h4":
        baseStyle.fontSize = theme.typography.fontSize.lg;
        baseStyle.fontWeight = "600";
        break;
      case "subtitle":
        baseStyle.fontSize = theme.typography.fontSize.base;
        baseStyle.fontWeight = "500";
        break;
      case "body":
        baseStyle.fontSize = theme.typography.fontSize.base;
        baseStyle.lineHeight = theme.typography.lineHeight.normal * baseStyle.fontSize;
        break;
      case "caption":
        baseStyle.fontSize = theme.typography.fontSize.sm;
        baseStyle.color = theme.colors.mutedForeground;
        break;
      case "small":
        baseStyle.fontSize = theme.typography.fontSize.xs;
        break;
    }

    // Add color styles
    switch (color) {
      case "primary":
        baseStyle.color = theme.colors.primary;
        break;
      case "secondary":
        baseStyle.color = theme.colors.secondary;
        break;
      case "foreground":
        baseStyle.color = theme.colors.foreground;
        break;
      case "muted":
        baseStyle.color = theme.colors.mutedForeground;
        break;
      case "success":
        baseStyle.color = theme.colors.success;
        break;
      case "warning":
        baseStyle.color = theme.colors.warning;
        break;
      case "danger":
        baseStyle.color = theme.colors.destructive;
        break;
      case "white":
        baseStyle.color = "#ffffff";
        break;
    }

    // Add weight and style
    if (bold) {
      baseStyle.fontWeight = "700";
    }

    if (italic) {
      baseStyle.fontStyle = "italic";
    }

    return baseStyle;
  };

  return (
    <RNText style={[getBaseStyle(), style]} {...props}>
      {children}
    </RNText>
  );
}
