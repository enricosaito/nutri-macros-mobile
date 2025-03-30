// components/ui/progress.tsx
import React from "react";
import { View, StyleSheet, ViewStyle, useColorScheme } from "react-native";
import { colors, darkColors, radius } from "../../src/styles/globalStyles";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

interface ProgressProps {
  value: number;
  max?: number;
  style?: ViewStyle;
  indicatorStyle?: ViewStyle;
  color?: string;
  animated?: boolean;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export function Progress({
  value = 0,
  max = 100,
  style,
  indicatorStyle,
  color,
  animated = true,
  ...props
}: ProgressProps) {
  const isDark = useColorScheme() === "dark";
  const activeColors = isDark ? darkColors : colors;
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const width = useSharedValue(animated ? 0 : percentage);

  useEffect(() => {
    if (animated) {
      width.value = withTiming(percentage, { duration: 800 });
    } else {
      width.value = percentage;
    }
  }, [percentage, animated, width]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${activeColors.primary}20`,
          borderRadius: radius.full,
          height: 8,
        },
        style,
      ]}
      {...props}
    >
      <AnimatedView
        style={[
          styles.indicator,
          animatedStyle,
          {
            backgroundColor: color || activeColors.primary,
          },
          indicatorStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    width: "100%",
  },
  indicator: {
    height: "100%",
  },
});
