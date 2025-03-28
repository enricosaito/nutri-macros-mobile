// components/ui/text.tsx
import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps } from "react-native";
import { theme } from "../../styles/theme";

type TextVariant = "h1" | "h2" | "h3" | "h4" | "subtitle" | "body" | "caption" | "small";
type TextColor = "primary" | "secondary" | "foreground" | "muted" | "success" | "warning" | "danger" | "white";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
  bold?: boolean;
  italic?: boolean;
  // Fix the style type definition:
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
  const getTextStyle = (): Array<TextStyle> => {
    const textStyles: Array<TextStyle> = [{ ...styles.base }];

    // Add variant styles
    switch (variant) {
      case "h1":
        textStyles.push({ ...styles.h1 });
        break;
      case "h2":
        textStyles.push({ ...styles.h2 });
        break;
      case "h3":
        textStyles.push({ ...styles.h3 });
        break;
      case "h4":
        textStyles.push({ ...styles.h4 });
        break;
      case "subtitle":
        textStyles.push({ ...styles.subtitle });
        break;
      case "body":
        textStyles.push({ ...styles.body });
        break;
      case "caption":
        textStyles.push({ ...styles.caption });
        break;
      case "small":
        textStyles.push({ ...styles.small });
        break;
    }

    // Add color styles
    switch (color) {
      case "primary":
        textStyles.push({ ...styles.primaryText });
        break;
      case "secondary":
        textStyles.push({ ...styles.secondaryText });
        break;
      case "foreground":
        textStyles.push({ ...styles.foregroundText });
        break;
      case "muted":
        textStyles.push({ ...styles.mutedText });
        break;
      case "success":
        textStyles.push({ ...styles.successText });
        break;
      case "warning":
        textStyles.push({ ...styles.warningText });
        break;
      case "danger":
        textStyles.push({ ...styles.dangerText });
        break;
      case "white":
        textStyles.push({ ...styles.whiteText });
        break;
    }

    // Add weight and style
    if (bold) {
      textStyles.push({ ...styles.bold });
    }

    if (italic) {
      textStyles.push({ ...styles.italic });
    }

    // Add custom style as the last item to override defaults if needed
    if (style) {
      if (Array.isArray(style)) {
        textStyles.push(...style);
      } else {
        textStyles.push(style);
      }
    }

    return textStyles;
  };

  return (
    <RNText style={getTextStyle()} {...props}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  h1: {
    fontSize: theme.fontSize.xxl,
    fontWeight: "700",
  },
  h2: {
    fontSize: theme.fontSize.xl,
    fontWeight: "700",
  },
  h3: {
    fontSize: theme.fontSize.lg,
    fontWeight: "600",
  },
  h4: {
    fontSize: theme.fontSize.md,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    fontWeight: "500",
  },
  body: {
    fontSize: theme.fontSize.md,
  },
  caption: {
    fontSize: theme.fontSize.sm,
  },
  small: {
    fontSize: theme.fontSize.xs,
  },
  primaryText: {
    color: theme.colors.primary,
  },
  secondaryText: {
    color: theme.colors.secondary,
  },
  foregroundText: {
    color: theme.colors.text,
  },
  mutedText: {
    color: theme.colors.textMuted,
  },
  successText: {
    color: theme.colors.success,
  },
  warningText: {
    color: "#f59e0b", // Amber color for warnings
  },
  dangerText: {
    color: theme.colors.error,
  },
  whiteText: {
    color: "white",
  },
  bold: {
    fontWeight: "700",
  },
  italic: {
    fontStyle: "italic",
  },
});
