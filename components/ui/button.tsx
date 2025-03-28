import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import { theme } from "../../styles/theme";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const getButtonStyles = (): ViewStyle[] => {
    const buttonStyles: ViewStyle[] = [styles.button];

    // Add variant styles
    switch (variant) {
      case "primary":
        buttonStyles.push(styles.primaryButton);
        break;
      case "secondary":
        buttonStyles.push(styles.secondaryButton);
        break;
      case "outline":
        buttonStyles.push(styles.outlineButton);
        break;
      case "ghost":
        buttonStyles.push(styles.ghostButton);
        break;
    }

    // Add size styles
    switch (size) {
      case "sm":
        buttonStyles.push(styles.smallButton);
        break;
      case "md":
        buttonStyles.push(styles.mediumButton);
        break;
      case "lg":
        buttonStyles.push(styles.largeButton);
        break;
    }

    // Add disabled styles
    if (disabled || loading) {
      buttonStyles.push(styles.disabledButton);
    }

    // Add full width styles
    if (fullWidth) {
      buttonStyles.push(styles.fullWidthButton);
    }

    // Add custom styles
    if (style) {
      buttonStyles.push(style);
    }

    return buttonStyles;
  };

  const getTextStyles = (): TextStyle[] => {
    const textStyles: TextStyle[] = [styles.buttonText];

    // Add variant text styles
    switch (variant) {
      case "primary":
        textStyles.push(styles.primaryButtonText);
        break;
      case "secondary":
        textStyles.push(styles.secondaryButtonText);
        break;
      case "outline":
        textStyles.push(styles.outlineButtonText);
        break;
      case "ghost":
        textStyles.push(styles.ghostButtonText);
        break;
    }

    // Add size text styles
    switch (size) {
      case "sm":
        textStyles.push(styles.smallButtonText);
        break;
      case "md":
        textStyles.push(styles.mediumButtonText);
        break;
      case "lg":
        textStyles.push(styles.largeButtonText);
        break;
    }

    // Add disabled text styles
    if (disabled || loading) {
      textStyles.push(styles.disabledButtonText);
    }

    // Add custom text styles
    if (textStyle) {
      textStyles.push(textStyle);
    }

    return textStyles;
  };

  const getLoaderColor = () => {
    if (variant === "outline" || variant === "ghost") {
      return theme.colors.primary;
    }
    return "white";
  };

  return (
    <TouchableOpacity style={getButtonStyles()} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
      <View style={styles.buttonContent}>
        {loading && <ActivityIndicator size="small" color={getLoaderColor()} style={styles.loader} />}

        {!loading && leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <Text style={getTextStyles()}>{title}</Text>

        {!loading && rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: theme.colors.secondary,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.text,
  },
  ghostButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  smallButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
  },
  mediumButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  largeButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  disabledButton: {
    opacity: 0.5,
  },
  fullWidthButton: {
    width: "100%",
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
  },
  primaryButtonText: {
    color: "white",
  },
  secondaryButtonText: {
    color: theme.colors.text,
  },
  outlineButtonText: {
    color: theme.colors.text,
  },
  ghostButtonText: {
    color: theme.colors.primary,
  },
  smallButtonText: {
    fontSize: theme.fontSize.sm,
  },
  mediumButtonText: {
    fontSize: theme.fontSize.md,
  },
  largeButtonText: {
    fontSize: theme.fontSize.lg,
  },
  disabledButtonText: {
    // No specific styles needed, the button opacity handles this
  },
  loader: {
    marginRight: theme.spacing.sm,
  },
  leftIcon: {
    marginRight: theme.spacing.sm,
  },
  rightIcon: {
    marginLeft: theme.spacing.sm,
  },
});
