// components/ui/button.tsx
import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import { useTheme } from "../../src/context/ThemeContext";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
  title?: string;
  children?: React.ReactNode;
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

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  title,
  children,
  onPress,
  variant = "default",
  size = "default",
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "default":
        return {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
          borderWidth: 1,
        };
      case "destructive":
        return {
          backgroundColor: theme.colors.destructive,
          borderColor: theme.colors.destructive,
          borderWidth: 1,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.border,
          borderWidth: 1,
        };
      case "secondary":
        return {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
          borderWidth: 1,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };
      case "link":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        };
      default:
        return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case "default":
        return {
          paddingHorizontal: theme.spacing[4],
          paddingVertical: theme.spacing[2],
          height: 44, // Increased for better touch targets
          borderRadius: theme.radius.lg,
        };
      case "sm":
        return {
          paddingHorizontal: theme.spacing[3],
          paddingVertical: theme.spacing[1],
          height: 36,
          borderRadius: theme.radius.md,
        };
      case "lg":
        return {
          paddingHorizontal: theme.spacing[8],
          paddingVertical: theme.spacing[2],
          height: 48,
          borderRadius: theme.radius.lg,
        };
      case "icon":
        return {
          height: 44,
          width: 44,
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.radius.lg,
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: theme.typography.fontSize.base,
      fontWeight: "500" as const,
    };

    switch (variant) {
      case "default":
        return { ...baseStyle, color: theme.colors.primaryForeground };
      case "destructive":
        return { ...baseStyle, color: theme.colors.destructiveForeground };
      case "outline":
        return { ...baseStyle, color: theme.colors.primary };
      case "secondary":
        return { ...baseStyle, color: theme.colors.primary };
      case "ghost":
        return { ...baseStyle, color: theme.colors.primary };
      case "link":
        return {
          ...baseStyle,
          color: theme.colors.primary,
          textDecorationLine: "underline",
        };
      default:
        return { ...baseStyle, color: theme.colors.primaryForeground };
    }
  };

  const buttonStyles: ViewStyle = {
    ...styles.button,
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...(disabled && styles.disabled),
    ...(fullWidth && { width: "100%" }),
    ...(style || {}),
  };

  const finalTextStyle: TextStyle = {
    ...styles.text,
    ...getTextStyle(),
    ...(textStyle || {}),
  };

  const getLoaderColor = () => {
    if (variant === "outline" || variant === "ghost" || variant === "link" || variant === "secondary") {
      return theme.colors.primary;
    }
    return theme.colors.primaryForeground;
  };

  const content = children || title;

  return (
    <AnimatedTouchable
      style={[buttonStyles, animatedStyle]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="small" color={getLoaderColor()} />
        ) : (
          <>
            {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
            {content && (typeof content === "string" ? <Text style={finalTextStyle}>{content}</Text> : content)}
            {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
          </>
        )}
      </View>
    </AnimatedTouchable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginHorizontal: 6,
  },
  text: {
    textAlign: "center",
  },
});
