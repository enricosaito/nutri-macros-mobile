import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from "react-native";
import { useTheme } from "../../context/ThemeContext";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger" | "white";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  style?: TextStyle | TextStyle[] | undefined;
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

  const getTextStyle = (): TextStyle => {
    // Base style
    let textStyle: TextStyle = {
      fontSize: theme.typography.fontSize.base,
      color: theme.colors.foreground,
    };

    // Add variant styles
    switch (variant) {
      case "h1":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize["4xl"],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.fontSize["4xl"] * theme.typography.lineHeight.tight,
        };
        break;
      case "h2":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize["3xl"],
          fontWeight: theme.typography.fontWeight.bold,
          lineHeight: theme.typography.fontSize["3xl"] * theme.typography.lineHeight.tight,
        };
        break;
      case "h3":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize["2xl"],
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.fontSize["2xl"] * theme.typography.lineHeight.tight,
        };
        break;
      case "h4":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize.xl,
          fontWeight: theme.typography.fontWeight.semibold,
          lineHeight: theme.typography.fontSize.xl * theme.typography.lineHeight.tight,
        };
        break;
      case "subtitle":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.medium,
          lineHeight: theme.typography.fontSize.lg * theme.typography.lineHeight.normal,
        };
        break;
      case "body":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize.base,
          lineHeight: theme.typography.fontSize.base * theme.typography.lineHeight.normal,
        };
        break;
      case "caption":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.fontSize.sm * theme.typography.lineHeight.normal,
        };
        break;
      case "small":
        textStyle = {
          ...textStyle,
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.fontSize.xs * theme.typography.lineHeight.normal,
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
        textStyle.color = theme.colors.foreground;
        break;
      case "muted":
        textStyle.color = theme.colors.mutedForeground;
        break;
      case "success":
        textStyle.color = theme.colors.success;
        break;
      case "warning":
        textStyle.color = theme.colors.warning;
        break;
      case "danger":
        textStyle.color = theme.colors.destructive;
        break;
      case "white":
        textStyle.color = "#ffffff";
        break;
    }

    // Add weight and style
    if (bold) {
      textStyle.fontWeight = theme.typography.fontWeight.bold;
    }

    if (italic) {
      textStyle.fontStyle = "italic";
    }

    return textStyle;
  };

  const finalStyle = [getTextStyle(), ...(Array.isArray(style) ? style : [style])].filter(Boolean);

  return (
    <RNText style={finalStyle} {...props}>
      {children}
    </RNText>
  );
}
