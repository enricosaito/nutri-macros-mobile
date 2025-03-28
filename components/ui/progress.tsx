import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";

interface ProgressProps {
  value: number;
  max?: number;
  style?: ViewStyle;
  indicatorStyle?: ViewStyle;
  color?: string;
}

export function Progress({ value = 0, max = 100, style, indicatorStyle, color, ...props }: ProgressProps) {
  const { theme } = useTheme();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: `${theme.colors.primary}20`,
          borderRadius: theme.radius.full,
          height: 8,
        },
        style,
      ]}
      {...props}
    >
      <View
        style={[
          styles.indicator,
          {
            width: `${percentage}%`,
            backgroundColor: color || theme.colors.primary,
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
