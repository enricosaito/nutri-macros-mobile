// components/ui/progress.tsx
import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useAnimationsEnabled } from "../../src/utils/animation";

interface ProgressProps {
  value: number;
  max?: number;
  color?: string;
  animated?: boolean;
  className?: string;
  indicatorClassName?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function Progress({
  value = 0,
  max = 100,
  color,
  animated = true,
  className = "",
  indicatorClassName = "",
}: ProgressProps) {
  const isDark = useColorScheme() === "dark";
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const animationsEnabled = useAnimationsEnabled();

  const width = useSharedValue(animated && animationsEnabled ? 0 : percentage);

  useEffect(() => {
    if (animated && animationsEnabled) {
      width.value = withTiming(percentage, { duration: 800 });
    } else {
      width.value = percentage;
    }
  }, [percentage, animated, animationsEnabled, width]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  const progressColor = color || (isDark ? "#2ac46e" : "#22c069");

  return (
    <View
      className={`overflow-hidden w-full h-2 rounded-full ${
        isDark ? "bg-[#2ac46e]/20" : "bg-[#22c069]/20"
      } ${className}`}
    >
      <AnimatedView
        style={[animatedStyle, { backgroundColor: progressColor }]}
        className={`h-full ${indicatorClassName}`}
      />
    </View>
  );
}
