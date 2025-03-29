import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
  useColorScheme,
} from "react-native";
import { colors, darkColors, spacing, radius, typography } from "../../src/styles/globalStyles";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAnimationsEnabled } from "../../src/utils/animation";

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
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const scale = useSharedValue(1);
  const animationsEnabled = useAnimationsEnabled();

  const handlePressIn = () => {
    if (animationsEnabled) {
      scale.value = withTiming(0.98, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (animationsEnabled) {
      scale.value = withTiming(1, { duration: 100 });
    }
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
          backgroundColor: activeColors.primary,
          borderColor: activeColors.primary,
          borderWidth: 1,
        };
      case "destructive":
        return {
          backgroundColor: activeColors.error,
          borderColor: activeColors.error,
          borderWidth: 1,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: activeColors.border,
          borderWidth: 1,
        };
      case "secondary":
        return {
          backgroundColor: activeColors.secondary,
          borderColor: activeColors.secondary,
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
          paddingHorizontal: spacing[4],
          paddingVertical: spacing[2],
          height: 44,
          borderRadius: radius.lg,
        };
      case "sm":
        return {
          paddingHorizontal: spacing[3],
          paddingVertical: spacing[1],
          height: 36,
          borderRadius: radius.md,
        };
      case "lg":
        return {
          paddingHorizontal: spacing[8],
          paddingVertical: spacing[2],
          height: 48,
          borderRadius: radius.lg,
        };
      case "icon":
        return {
          height: 44,
          width: 44,
          paddingHorizontal: 0,
          paddingVertical: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: radius.lg,
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontSize: typography.fontSize.base,
      fontWeight: 500,
      textAlign: "center",
    };

    switch (variant) {
      case "default":
        return { ...baseStyle, color: "#ffffff" };
      case "destructive":
        return { ...baseStyle, color: "#ffffff" };
      case "outline":
        return { ...baseStyle, color: activeColors.primary };
      case "secondary":
        return { ...baseStyle, color: activeColors.primary };
      case "ghost":
        return { ...baseStyle, color: activeColors.primary };
      case "link":
        return {
          ...baseStyle,
          color: activeColors.primary,
          textDecorationLine: "underline",
        };
      default:
        return { ...baseStyle, color: "#ffffff" };
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
      return activeColors.primary;
    }
    return "#ffffff";
  };

  const content = children || title;

  // Use regular TouchableOpacity if animations are disabled
  if (!animationsEnabled) {
    return (
      <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
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
      </TouchableOpacity>
    );
  }

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
