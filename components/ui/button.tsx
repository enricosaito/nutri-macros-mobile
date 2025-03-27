import React from "react";
import { Pressable, ActivityIndicator, ViewStyle, PressableProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Text } from "./text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Button variants
const variantStyles = {
  primary: "bg-primary-600 border border-primary-600",
  secondary: "bg-secondary-600 border border-secondary-600",
  outline: "bg-transparent border border-foreground",
  ghost: "bg-transparent",
};

// Button sizes
const sizeStyles = {
  sm: "py-1 px-3",
  md: "py-2 px-4",
  lg: "py-3 px-6",
};

// Text colors based on button variant
const textColors = {
  primary: "white",
  secondary: "white",
  outline: "foreground",
  ghost: "foreground",
};

interface ButtonProps extends PressableProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  style,
  leftIcon,
  rightIcon,
  className = "",
  onPress,
  ...props
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const disabledStyle = disabled || loading ? "opacity-50" : "";
  const widthStyle = fullWidth ? "w-full" : "";
  const baseStyle = "rounded-lg flex-row items-center justify-center";
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const textColor = textColors[variant] as any;

  return (
    <AnimatedPressable
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${disabledStyle} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "outline" || variant === "ghost" ? "#0891b2" : "white"}
          className="mr-2"
        />
      )}

      {!loading && leftIcon && <>{leftIcon}</>}

      <Text
        color={textColor}
        variant={size === "lg" ? "subtitle" : size === "sm" ? "small" : "body"}
        className={`${leftIcon ? "ml-2" : ""} ${rightIcon ? "mr-2" : ""}`}
      >
        {children}
      </Text>

      {!loading && rightIcon && <>{rightIcon}</>}
    </AnimatedPressable>
  );
}
