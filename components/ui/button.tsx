import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View, useColorScheme } from "react-native";
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
  className?: string;
  textClassName?: string;
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
  className = "",
  textClassName = "",
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const isDark = useColorScheme() === "dark";
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

  // Generate variant-specific class names
  let buttonClasses = "flex-row justify-center items-center shadow-sm shadow-black/10 ";

  switch (variant) {
    case "default":
      buttonClasses += isDark ? "bg-[#2ac46e] border border-[#2ac46e] " : "bg-[#22c069] border border-[#22c069] ";
      break;
    case "destructive":
      buttonClasses += isDark ? "bg-[#9b1f1f] border border-[#9b1f1f] " : "bg-[#e92c2c] border border-[#e92c2c] ";
      break;
    case "outline":
      buttonClasses += isDark ? "bg-transparent border border-[#333333] " : "bg-transparent border border-[#dfe5df] ";
      break;
    case "secondary":
      buttonClasses += isDark ? "bg-[#1e231e] border border-[#1e231e] " : "bg-[#edf4ee] border border-[#edf4ee] ";
      break;
    case "ghost":
      buttonClasses += "bg-transparent border-0 ";
      break;
    case "link":
      buttonClasses += "bg-transparent border-0 p-0 ";
      break;
  }

  // Generate size-specific class names
  switch (size) {
    case "default":
      buttonClasses += "px-4 py-2 h-11 rounded-lg ";
      break;
    case "sm":
      buttonClasses += "px-3 py-1 h-9 rounded-md ";
      break;
    case "lg":
      buttonClasses += "px-8 py-2 h-12 rounded-lg ";
      break;
    case "icon":
      buttonClasses += "h-11 w-11 p-0 items-center justify-center rounded-lg ";
      break;
  }

  // Add disabled styles
  if (disabled) {
    buttonClasses += "opacity-50 ";
  }

  // Add full width style
  if (fullWidth) {
    buttonClasses += "w-full ";
  }

  // Add custom classes
  buttonClasses += className;

  // Text styles based on variant
  let textClasses = "text-center text-base font-medium ";
  switch (variant) {
    case "default":
    case "destructive":
      textClasses += "text-white ";
      break;
    case "outline":
    case "ghost":
      textClasses += isDark ? "text-[#2ac46e] " : "text-[#22c069] ";
      break;
    case "secondary":
      textClasses += isDark ? "text-[#2ac46e] " : "text-[#22c069] ";
      break;
    case "link":
      textClasses += isDark ? "text-[#2ac46e] underline " : "text-[#22c069] underline ";
      break;
  }

  // Add custom text classes
  textClasses += textClassName;

  // Get loader color based on variant
  const getLoaderColor = () => {
    if (variant === "outline" || variant === "ghost" || variant === "link" || variant === "secondary") {
      return isDark ? "#2ac46e" : "#22c069";
    }
    return "#ffffff";
  };

  const content = children || title;

  // Use regular TouchableOpacity if animations are disabled
  if (!animationsEnabled) {
    return (
      <TouchableOpacity className={buttonClasses} onPress={onPress} disabled={disabled || loading} activeOpacity={0.7}>
        <View className="flex-row items-center justify-center">
          {loading ? (
            <ActivityIndicator size="small" color={getLoaderColor()} />
          ) : (
            <>
              {leftIcon && <View className="mx-1.5">{leftIcon}</View>}
              {content && (typeof content === "string" ? <Text className={textClasses}>{content}</Text> : content)}
              {rightIcon && <View className="mx-1.5">{rightIcon}</View>}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <AnimatedTouchable
      className={buttonClasses}
      style={animatedStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View className="flex-row items-center justify-center">
        {loading ? (
          <ActivityIndicator size="small" color={getLoaderColor()} />
        ) : (
          <>
            {leftIcon && <View className="mx-1.5">{leftIcon}</View>}
            {content && (typeof content === "string" ? <Text className={textClasses}>{content}</Text> : content)}
            {rightIcon && <View className="mx-1.5">{rightIcon}</View>}
          </>
        )}
      </View>
    </AnimatedTouchable>
  );
}
