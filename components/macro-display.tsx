// components/macro-display.tsx
import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { theme } from "../styles/theme";

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

  return (
    <Card style={style}>
      <CardHeader>
        <CardTitle>Distribuição de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Text variant="h3" style={styles.caloriesText}>
          {calories} kcal
        </Text>

        {/* Progress bar */}
        <View style={styles.progressBarContainer}>
          <AnimatedView style={[styles.progressBarProtein, proteinAnimStyle]} />
          <AnimatedView style={[styles.progressBarCarbs, carbsAnimStyle]} />
          <AnimatedView style={[styles.progressBarFat, fatAnimStyle]} />
        </View>

        {/* Macros detail */}
        <View style={styles.macrosContainer}>
          <MacroRow
            label="Proteína"
            grams={macros.protein}
            calories={proteinCalories}
            percent={proteinPercent}
            showPercent={showPercentages}
            color="#3b82f6" // Blue
          />

          <MacroRow
            label="Carboidratos"
            grams={macros.carbs}
            calories={carbsCalories}
            percent={carbsPercent}
            showPercent={showPercentages}
            color="#10b981" // Green
          />

          <MacroRow
            label="Gordura"
            grams={macros.fat}
            calories={fatCalories}
            percent={fatPercent}
            showPercent={showPercentages}
            color="#f59e0b" // Yellow
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
  return (
    <View style={styles.macroRow}>
      <View style={[styles.macroIndicator, { backgroundColor: color }]} />
      <Text style={styles.macroLabel}>{label}</Text>
      <View style={styles.macroValues}>
        <Text style={styles.macroGrams}>{grams}g</Text>
        <Text style={styles.macroCalories}>{calories} kcal</Text>
        {showPercent && <Text style={styles.macroPercent}>{Math.round(percent)}%</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caloriesText: {
    textAlign: "center",
    marginBottom: theme.spacing.md,
  },
  progressBarContainer: {
    height: 32,
    flexDirection: "row",
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    marginBottom: theme.spacing.md,
    backgroundColor: "#f3f4f6", // Light gray background
  },
  progressBarProtein: {
    backgroundColor: "#3b82f6", // Blue
    height: "100%",
  },
  progressBarCarbs: {
    backgroundColor: "#10b981", // Green
    height: "100%",
  },
  progressBarFat: {
    backgroundColor: "#f59e0b", // Yellow
    height: "100%",
  },
  macrosContainer: {
    marginTop: theme.spacing.md,
  },
  macroRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  macroIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: theme.spacing.sm,
  },
  macroLabel: {
    flex: 1,
    fontSize: theme.fontSize.md,
    fontWeight: "500",
  },
  macroValues: {
    flexDirection: "row",
    alignItems: "center",
  },
  macroGrams: {
    marginRight: theme.spacing.sm,
    fontSize: theme.fontSize.md,
  },
  macroCalories: {
    marginRight: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
  },
  macroPercent: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textMuted,
  },
});
