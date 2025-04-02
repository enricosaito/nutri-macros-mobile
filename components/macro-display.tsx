// components/macro-display.tsx
import React, { useEffect } from "react";
import { View, useColorScheme } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeIn, SlideInRight } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useAnimationsEnabled } from "../src/utils/animation";

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
  className?: string;
}

export function MacroDisplay({ macros, calories, showPercentages = true, className = "" }: MacroDisplayProps) {
  const isDark = useColorScheme() === "dark";
  const animationsEnabled = useAnimationsEnabled();

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
    if (animationsEnabled) {
      proteinWidth.value = withTiming(proteinPercent, { duration: 800 });
      carbsWidth.value = withTiming(carbsPercent, { duration: 800 });
      fatWidth.value = withTiming(fatPercent, { duration: 800 });
    } else {
      proteinWidth.value = proteinPercent;
      carbsWidth.value = carbsPercent;
      fatWidth.value = fatPercent;
    }
  }, [macros, proteinPercent, carbsPercent, fatPercent, proteinWidth, carbsWidth, fatWidth, animationsEnabled]);

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

  // Use chart colors
  const proteinColor = isDark ? "#1fb7c1" : "#14a9b8"; // chart3
  const carbsColor = isDark ? "#2ac46e" : "#22c069"; // chart1
  const fatColor = isDark ? "#4d8df6" : "#1a66ff"; // chart5

  // Define the macro rows
  const macroRows = [
    {
      label: "Proteína",
      grams: macros.protein,
      calories: proteinCalories,
      percent: proteinPercent,
      color: proteinColor,
      icon: "target",
      delay: 0,
      key: "protein",
    },
    {
      label: "Carboidratos",
      grams: macros.carbs,
      calories: carbsCalories,
      percent: carbsPercent,
      color: carbsColor,
      icon: "circle",
      delay: 100,
      key: "carbs",
    },
    {
      label: "Gordura",
      grams: macros.fat,
      calories: fatCalories,
      percent: fatPercent,
      color: fatColor,
      icon: "droplet",
      delay: 200,
      key: "fat",
    },
  ];

  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Distribuição de Macronutrientes</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedContainer entering={animationsEnabled ? FadeIn.delay(300).duration(500) : undefined}>
          <Text variant="h2" color="primary" className="text-center mb-4">
            {calories} kcal
          </Text>

          {/* Progress bar */}
          <View
            className="flex-row overflow-hidden rounded-lg h-4 my-4"
            style={{ backgroundColor: isDark ? "#1c211c" : "#f1f5f2" }} // muted color
          >
            <AnimatedView style={[{ height: "100%" }, proteinAnimStyle, { backgroundColor: proteinColor }]} />
            <AnimatedView style={[{ height: "100%" }, carbsAnimStyle, { backgroundColor: carbsColor }]} />
            <AnimatedView style={[{ height: "100%" }, fatAnimStyle, { backgroundColor: fatColor }]} />
          </View>

          {/* Macros detail */}
          <View className="mt-4">
            {macroRows.map((row) => (
              <MacroRow
                key={row.key}
                label={row.label}
                grams={row.grams}
                calories={row.calories}
                percent={row.percent}
                showPercent={showPercentages}
                color={row.color}
                icon={row.icon}
                delay={row.delay}
              />
            ))}
          </View>
        </AnimatedContainer>
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
  icon: string;
  delay: number;
}

function MacroRow({ label, grams, calories, percent, showPercent, color, icon, delay }: MacroRowProps) {
  const animationsEnabled = useAnimationsEnabled();
  const AnimatedContainer = animationsEnabled ? Animated.View : View;

  return (
    <AnimatedContainer
      className="flex-row items-center mb-3"
      entering={animationsEnabled ? SlideInRight.delay(delay).springify() : undefined}
    >
      <View className="w-6 h-6 rounded-full items-center justify-center mr-2" style={{ backgroundColor: color }}>
        <Feather name={icon as any} size={12} color="white" />
      </View>
      <Text className="flex-1 text-base font-medium">{label}</Text>
      <View className="flex-row items-center">
        <Text className="text-base font-semibold mr-2">{grams}g</Text>
        <Text variant="caption" color="muted" className="mr-2">
          {calories} kcal
        </Text>
        {showPercent && (
          <Text variant="caption" color="muted" className="min-w-10 text-right">
            {Math.round(percent)}%
          </Text>
        )}
      </View>
    </AnimatedContainer>
  );
}
