import React from "react";
import { Pressable, PressableProps, ActivityIndicator, ViewStyle } from "react-native";
import { styled } from "nativewind";
import { Text } from "./text";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const StyledPressable = styled(Pressable);
const AnimatedPressable = Animated.createAnimatedComponent(StyledPressable);

interface ButtonProps extends PressableProps {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
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

  const variantStyles = {
    primary: "bg-primary-600 border border-primary-600",
    secondary: "bg-secondary-600 border border-secondary-600",
    outline: "bg-transparent border border-foreground",
    ghost: "bg-transparent",
  };

  const sizeStyles = {
    sm: "py-1 px-3",
    md: "py-2 px-4",
    lg: "py-3 px-6",
  };

  const textColors = {
    primary: "white",
    secondary: "white",
    outline: "foreground",
    ghost: "foreground",
  };

  const disabledStyle = disabled || loading ? "opacity-50" : "";
  const widthStyle = fullWidth ? "w-full" : "";
  const defaultButtonClasses = "rounded-lg flex-row items-center justify-center";
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const textColor = textColors[variant] as any;

  return (
    <AnimatedPressable
      className={`${defaultButtonClasses} ${variantStyle} ${sizeStyle} ${disabledStyle} ${widthStyle} ${className}`}
      disabled={disabled || loading}
      style={[animatedStyle, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "outline" || variant === "ghost" ? "#0891b2" : "white"}
          className="mr-2"
        />
      )}

      {!loading && leftIcon && <React.Fragment>{leftIcon}</React.Fragment>}

      <Text
        color={textColor}
        variant={size === "lg" ? "subtitle" : size === "sm" ? "small" : "body"}
        className={`${leftIcon ? "ml-2" : ""} ${rightIcon ? "mr-2" : ""}`}
      >
        {children}
      </Text>

      {!loading && rightIcon && <React.Fragment>{rightIcon}</React.Fragment>}
    </AnimatedPressable>
  );
}
