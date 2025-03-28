// components/macro-display.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useTheme } from "../src/context/ThemeContext";

const AnimatedView = Animated.createAnimatedComponent(View);

interface MacroData {
  protein: number;
  carbs: number;
  fat: number;
}

interface MacroDisplayProps {
  macros: MacroData;
  calories: number;
  showPercentages?: boolean;
  style?: ViewStyle;
}

export function MacroDisplay({ macros, calories, showPercentages = true, style }: MacroDisplayProps) {
  const { theme } = useTheme();

  // Animated values for each macro
  const proteinWidth = useSharedValue(0);
  const carbsWidth = useSharedValue(0);
  const fatWidth = useSharedValue(0);

  // Calculate total and percentages
  const totalGrams = macros.protein + macros.carbs + macros.fat;
  const proteinPercent = totalGrams > 0 ? (macros.protein / totalGrams) * 100 : 0;
  const carbsPercent = totalGrams > 0 ? (macros.carbs / totalGrams) * 100 : 0;
  const fatPercent = totalGrams > 0 ? (macros.fat / totalGrams) * 100 : 0;

  // Calculate calories from each macro
  const proteinCalories = macros.protein * 4;
  const carbsCalories = macros.carbs * 4;
  const fatCalories = macros.fat * 9;

  // Update animated values when macros change
  useEffect(() => {
    proteinWidth.value = withTiming(proteinPercent, { duration: 500 });
    carbsWidth.value = withTiming(carbsPercent, { duration: 500 });
    fatWidth.value = withTiming(fatPercent, { duration: 500 });
  }, [macros, proteinPercent, carbsPercent, fatPercent]);

  // Animated styles for progress bars
  const proteinAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${proteinWidth.value}%`,
    };
  });

  const carbsAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${carbsWidth.value}%`,
    };
  });

  const fatAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${fatWidth.value}%`,
    };
  });

  // Use our new chart colors from the theme
  const proteinColor = theme.colors.chart3;
  const carbsColor = theme.colors.chart1;
  const fatColor = theme.colors.chart5;

  return (
    <Card style={style}>
      <CardHeader>
        <CardTitle>Distribuição de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Text
          variant="h3"
          style={{
            textAlign: "center",
            marginBottom: theme.spacing[4],
            color: theme.colors.primary,
          }}
        >
          {calories} kcal
        </Text>

        {/* Progress bar */}
        <View style={[styles.progressBarContainer, { borderRadius: theme.radius.md }]}>
          <AnimatedView style={[styles.progressBarProtein, proteinAnimStyle, { backgroundColor: proteinColor }]} />
          <AnimatedView style={[styles.progressBarCarbs, carbsAnimStyle, { backgroundColor: carbsColor }]} />
          <AnimatedView style={[styles.progressBarFat, fatAnimStyle, { backgroundColor: fatColor }]} />
        </View>

        {/* Macros detail */}
        <View style={{ marginTop: theme.spacing[4] }}>
          <MacroRow
            label="Proteína"
            grams={macros.protein}
            calories={proteinCalories}
            percent={proteinPercent}
            showPercent={showPercentages}
            color={proteinColor}
          />

          <MacroRow
            label="Carboidratos"
            grams={macros.carbs}
            calories={carbsCalories}
            percent={carbsPercent}
            showPercent={showPercentages}
            color={carbsColor}
          />

          <MacroRow
            label="Gordura"
            grams={macros.fat}
            calories={fatCalories}
            percent={fatPercent}
            showPercent={showPercentages}
            color={fatColor}
          />
        </View>
      </CardContent>
    </Card>
  );
}

interface MacroRowProps {
  label: string;
  grams: number;
  calories: number;
  percent: number;
  showPercent: boolean;
  color: string;
}

function MacroRow({ label, grams, calories, percent, showPercent, color }: MacroRowProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.macroRow, { marginBottom: theme.spacing[3] }]}>
      <View style={[styles.macroIndicator, { backgroundColor: color, marginRight: theme.spacing[2] }]} />
      <Text style={[styles.macroLabel, { flex: 1, fontWeight: theme.typography.fontWeight.medium }]}>{label}</Text>
      <View style={styles.macroValues}>
        <Text style={[styles.macroGrams, { marginRight: theme.spacing[2] }]}>{grams}g</Text>
        <Text style={[styles.macroCalories, { marginRight: theme.spacing[2], color: theme.colors.mutedForeground }]}>
          {calories} kcal
        </Text>
        {showPercent && (
          <Text style={[styles.macroPercent, { color: theme.colors.mutedForeground }]}>{Math.round(percent)}%</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 32,
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "#f3f4f6", // Light gray background
  },
  progressBarProtein: {
    height: "100%",
  },
  progressBarCarbs: {
    height: "100%",
  },
  progressBarFat: {
    height: "100%",
  },
  macroRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  macroIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  macroLabel: {
    fontSize: 16,
  },
  macroValues: {
    flexDirection: "row",
    alignItems: "center",
  },
  macroGrams: {
    fontSize: 16,
  },
  macroCalories: {
    fontSize: 16,
  },
  macroPercent: {
    fontSize: 16,
  },
});
