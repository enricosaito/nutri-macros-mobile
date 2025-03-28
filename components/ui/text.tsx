// components/ui/text.tsx
import React from "react";
import { Text as RNText, StyleSheet, StyleProp, TextStyle, TextProps as RNTextProps } from "react-native";
import { theme } from "../../src/styles/theme";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger" | "white";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  style?: StyleProp<any>; // Use 'any' type to avoid TextStyle type errors
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
  // Build the base style object with type any to avoid strict type checking
  const getBaseStyle = (): any => {
    // Base style
    const baseStyle: any = {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    };

    // Add variant styles
    switch (variant) {
      case "h1":
        baseStyle.fontSize = theme.fontSize.xxl;
        baseStyle.fontWeight = "700"; // Use string value instead of number
        break;
      case "h2":
        baseStyle.fontSize = theme.fontSize.xl;
        baseStyle.fontWeight = "700";
        break;
      case "h3":
        baseStyle.fontSize = theme.fontSize.lg;
        baseStyle.fontWeight = "600";
        break;
      case "h4":
        baseStyle.fontSize = theme.fontSize.md;
        baseStyle.fontWeight = "600";
        break;
      case "subtitle":
        baseStyle.fontSize = theme.fontSize.md;
        baseStyle.fontWeight = "500";
        break;
      case "body":
        baseStyle.fontSize = theme.fontSize.md;
        break;
      case "caption":
        baseStyle.fontSize = theme.fontSize.sm;
        break;
      case "small":
        baseStyle.fontSize = theme.fontSize.xs;
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
        baseStyle.color = theme.colors.text;
        break;
      case "muted":
        baseStyle.color = theme.colors.textMuted;
        break;
      case "success":
        baseStyle.color = theme.colors.success;
        break;
      case "warning":
        baseStyle.color = "#f59e0b";
        break;
      case "danger":
        baseStyle.color = theme.colors.error;
        break;
      case "white":
        baseStyle.color = "white";
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
