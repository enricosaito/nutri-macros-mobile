// components/ui/text.tsx
import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from "react-native";
import { theme } from "../../src/styles/theme";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger" | "white";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  style?: TextStyle;
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
  const getTextStyle = (): TextStyle => {
    // Base style
    let textStyle: TextStyle = {
      fontSize: theme.fontSize.md,
      color: theme.colors.text,
    };

    // Add variant styles
    switch (variant) {
      case "h1":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.xxl,
          fontWeight: "700",
        };
        break;
      case "h2":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.xl,
          fontWeight: "700",
        };
        break;
      case "h3":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.lg,
          fontWeight: "600",
        };
        break;
      case "h4":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.md,
          fontWeight: "600",
        };
        break;
      case "subtitle":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.md,
          fontWeight: "500",
        };
        break;
      case "body":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.md,
        };
        break;
      case "caption":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.sm,
        };
        break;
      case "small":
        textStyle = {
          ...textStyle,
          fontSize: theme.fontSize.xs,
        };
        break;
    }

    // Add color styles
    switch (color) {
      case "primary":
        textStyle.color = theme.colors.primary;
        break;
      case "secondary":
        textStyle.color = theme.colors.secondary;
        break;
      case "foreground":
        textStyle.color = theme.colors.text;
        break;
      case "muted":
        textStyle.color = theme.colors.textMuted;
        break;
      case "success":
        textStyle.color = theme.colors.success;
        break;
      case "warning":
        textStyle.color = "#f59e0b";
        break;
      case "danger":
        textStyle.color = theme.colors.error;
        break;
      case "white":
        textStyle.color = "white";
        break;
    }

    // Add weight and style
    if (bold) {
      textStyle.fontWeight = "700";
    }

    if (italic) {
      textStyle.fontStyle = "italic";
    }

    return textStyle;
  };

  const textStyles = [getTextStyle(), style].filter(Boolean);

  return (
    <RNText style={textStyles} {...props}>
      {children}
    </RNText>
  );
}
